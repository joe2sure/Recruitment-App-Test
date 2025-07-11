/**
 * @fileoverview WebSocket manager for real-time chat functionality
 * Handles socket connections, online status, typing indicators, and message delivery
 * 
 * @module socket/socketManager
 * @requires socket.io
 * @requires jsonwebtoken
 * 
 * @author Golor Abraham AjiriOghene
 * @version 1.0.0
 */

import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import User from '../model/User.js';
import { Message, Conversation } from '../model/Chat.js';
import { checkTypingRateLimit } from '../middleware/chatSecurity.js';

/**
 * Online users storage
 * In production, use Redis for scalability
 */
const onlineUsers = new Map();
const userSockets = new Map(); // userId -> socketId mapping
const typingUsers = new Map(); // conversationId -> Set of typing users

/**
 * Socket authentication middleware
 * @param {Object} socket - Socket.io socket instance
 * @param {Function} next - Next middleware function
 */
const authenticateSocket = async (socket, next) => {
    try {
        let token = socket.handshake.auth.token || socket.handshake.headers.authorization?.split(' ')[1];

         // If no token found, check cookies
        if (!token && socket.handshake.headers.cookie) {
            const cookies = socket.handshake.headers.cookie
                .split(';')
                .reduce((acc, cookie) => {
                    const [key, value] = cookie.trim().split('=');
                    acc[key] = value;
                    return acc;
                }, {});
            
            token = cookies.token || cookies.accessToken; // Adjust cookie name as needed
        }

        console.log("Token for soket is " + token);
        
        if (!token) {
            return next(new Error('Authentication failed: No token provided'));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');
        
        if (!user) {
            return next(new Error('Authentication failed: User not found'));
        }

        socket.userId = user._id.toString();
        socket.user = user;
        next();
    } catch (error) {
        console.error('Socket authentication error:', error);
        next(new Error('Authentication failed: Invalid token'));
    }
};

/**
 * Emit online status to user's contacts
 * @param {Object} socket - Socket instance
 * @param {Object} io - Socket.IO server instance
 */
const emitOnlineStatus = async (socket, io) => {
    try {
        // Get user's conversations to find contacts
        const conversations = await Conversation.find({
            participants: socket.userId,
            isActive: true
        }).populate('participants', 'first_Name last_Name fullName');

        const contacts = new Set();
        conversations.forEach(conv => {
            conv.participants.forEach(participant => {
                if (participant._id.toString() !== socket.userId) {
                    contacts.add(participant._id.toString());
                }
            });
        });

        // Emit status to each contact
        contacts.forEach(contactId => {
            const contactSocketId = userSockets.get(contactId);
            if (contactSocketId) {
                io.to(contactSocketId).emit('user_status_update', {
                    userId: socket.userId,
                    userName: socket.user.fullName,
                    status: onlineUsers.get(socket.userId)?.status || 'offline',
                    lastSeen: new Date()
                });
            }
        });
    } catch (error) {
        console.error('Error emitting online status:', error);
    }
};

/**
 * Mark messages as delivered
 * @param {string} conversationId - Conversation ID
 * @param {string} userId - User ID
 */
const markMessagesAsDelivered = async (conversationId, userId) => {
    try {
        await Message.updateMany(
            {
                recipient: userId,
                status: 'sent'
            },
            {
                $set: {
                    status: 'delivered',
                    deliveredAt: new Date()
                }
            }
        );
    } catch (error) {
        console.error('Error marking messages as delivered:', error);
    }
};

/**
 * Mark messages as seen
 * @param {string} conversationId - Conversation ID
 * @param {string} userId - User ID
 * @param {Object} io - Socket.IO server instance
 */
const markMessagesAsSeen = async (conversationId, userId, io) => {
    try {
        const conversation = await Conversation.findById(conversationId);
        if (!conversation) return;

        // Update messages to seen
        const result = await Message.updateMany(
            {
                recipient: userId,
                status: { $in: ['sent', 'delivered'] }
            },
            {
                $set: {
                    status: 'seen',
                    seenAt: new Date()
                }
            }
        );

        // Reset unread count
        await conversation.resetUnreadCount(userId);

        // Get the other participant
        const otherParticipant = conversation.getOtherParticipant(userId);
        const otherSocketId = userSockets.get(otherParticipant.toString());

        if (otherSocketId && result.modifiedCount > 0) {
            io.to(otherSocketId).emit('messages_seen', {
                conversationId,
                seenBy: userId,
                seenAt: new Date()
            });
        }
    } catch (error) {
        console.error('Error marking messages as seen:', error);
    }
};

/**
 * Clear typing indicator
 * @param {string} conversationId - Conversation ID
 * @param {string} userId - User ID
 * @param {Object} io - Socket.IO server instance
 */
const clearTypingIndicator = (conversationId, userId, io) => {
    if (typingUsers.has(conversationId)) {
        typingUsers.get(conversationId).delete(userId);
        
        if (typingUsers.get(conversationId).size === 0) {
            typingUsers.delete(conversationId);
        }
    }

    io.to(conversationId).emit('user_typing', {
        userId: userId,
        isTyping: false
    });
};

/**
 * Get online users for contacts
 * @param {string} userId - User ID
 * @returns {Array} Array of online contacts
 */
const getOnlineContacts = async (userId) => {
    try {
        const conversations = await Conversation.find({
            participants: userId,
            isActive: true
        }).populate('participants', 'first_Name last_Name fullName');

        const contacts = [];
        conversations.forEach(conv => {
            conv.participants.forEach(participant => {
                if (participant._id.toString() !== userId) {
                    const contactId = participant._id.toString();
                    const onlineInfo = onlineUsers.get(contactId);
                    contacts.push({
                        userId: contactId,
                        userName: participant.fullName,
                        status: onlineInfo?.status || 'offline',
                        lastSeen: onlineInfo?.lastSeen || participant.lastLogin
                    });
                }
            });
        });

        return contacts;
    } catch (error) {
        console.error('Error getting online contacts:', error);
        return [];
    }
};

/**
 * Initialize Socket.IO server
 * @param {Object} server - HTTP server instance
 * @returns {Object} Socket.IO server instance
 */
const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: ['http://localhost:3000'],
            credentials: true
        },
        pingTimeout: 60000,
        pingInterval: 25000
    });

    // Authentication middleware
    io.use(authenticateSocket);

    io.on('connection', (socket) => {
        console.log(`User ${socket.user.fullName} connected: ${socket.id}`);
        
        // Add user to online users
        onlineUsers.set(socket.userId, {
            socketId: socket.id,
            user: socket.user,
            lastSeen: new Date(),
            status: 'online'
        });
        
        userSockets.set(socket.userId, socket.id);

        // Join user to their personal room
        socket.join(socket.userId);

        // Emit online status to all contacts
        emitOnlineStatus(socket, io);

        // Send online contacts to newly connected user
        socket.emit('online_users', getOnlineContacts(socket.userId));

        // Handle joining conversation rooms
        socket.on('join_conversation', async (conversationId) => {
            try {
                const conversation = await Conversation.findById(conversationId);
                
                if (!conversation || !conversation.participants.includes(socket.userId)) {
                    socket.emit('error', { message: 'Unauthorized access to conversation' });
                    return;
                }

                socket.join(conversationId);
                console.log(`User ${socket.userId} joined conversation ${conversationId}`);
                
                // Mark messages as delivered
                await markMessagesAsDelivered(conversationId, socket.userId);
                
            } catch (error) {
                console.error('Join conversation error:', error);
                socket.emit('error', { message: 'Failed to join conversation' });
            }
        });

        // Handle leaving conversation rooms
        socket.on('leave_conversation', (conversationId) => {
            socket.leave(conversationId);
            clearTypingIndicator(conversationId, socket.userId, io);
            console.log(`User ${socket.userId} left conversation ${conversationId}`);
        });

        // Handle new messages
        socket.on('send_message', async (data) => {
            try {
                const { conversationId, content, messageType = 'text', fileData } = data;
                
                // Validate conversation access
                const conversation = await Conversation.findById(conversationId);
                if (!conversation || !conversation.participants.includes(socket.userId)) {
                    socket.emit('error', { message: 'Unauthorized access to conversation' });
                    return;
                }

                const recipient = conversation.getOtherParticipant(socket.userId);
                
                // Create new message
                const message = new Message({
                    sender: socket.userId,
                    recipient: recipient,
                    content: content,
                    messageType: messageType,
                    fileData: fileData
                });

                await message.save();

                // Update conversation
                conversation.lastMessage = message._id;
                conversation.lastActivity = new Date();
                await conversation.incrementUnreadCount(recipient);

                // Populate message for sending
                await message.populate([
                    { path: 'sender', select: 'first_Name last_Name fullName' },
                    { path: 'recipient', select: 'first_Name last_Name fullName' }
                ]);

                // Emit to conversation room
                io.to(conversationId).emit('new_message', {
                    message: {
                        _id: message._id,
                        sender: message.sender,
                        recipient: message.recipient,
                        content: message.decryptedContent,
                        messageType: message.messageType,
                        fileData: message.fileData,
                        sentAt: message.sentAt,
                        status: message.status
                    },
                    conversationId
                });

                // Send notification to recipient if online
                const recipientSocketId = userSockets.get(recipient.toString());
                if (recipientSocketId) {
                    io.to(recipientSocketId).emit('message_notification', {
                        from: socket.user.fullName,
                        conversationId,
                        preview: content.substring(0, 50)
                    });
                }

                // Clear typing indicator
                clearTypingIndicator(conversationId, socket.userId, io);

            } catch (error) {
                console.error('Send message error:', error);
                socket.emit('error', { message: 'Failed to send message' });
            }
        });

        // Handle typing indicators
        socket.on('typing_start', (data) => {
            const { conversationId } = data;
            
            if (!checkTypingRateLimit(socket.userId)) {
                return; // Rate limited
            }

            if (!typingUsers.has(conversationId)) {
                typingUsers.set(conversationId, new Set());
            }
            
            typingUsers.get(conversationId).add(socket.userId);
            
            socket.to(conversationId).emit('user_typing', {
                userId: socket.userId,
                userName: socket.user.fullName,
                isTyping: true
            });
        });

        socket.on('typing_stop', (data) => {
            const { conversationId } = data;
            clearTypingIndicator(conversationId, socket.userId, io);
        });

        // Handle message status updates
        socket.on('mark_messages_seen', async (data) => {
            try {
                const { conversationId } = data;
                await markMessagesAsSeen(conversationId, socket.userId, io);
            } catch (error) {
                console.error('Mark messages seen error:', error);
            }
        });

        // Handle status updates
        socket.on('update_status', (status) => {
            if (['online', 'away', 'busy'].includes(status)) {
                const userInfo = onlineUsers.get(socket.userId);
                if (userInfo) {
                    userInfo.status = status;
                    userInfo.lastSeen = new Date();
                    emitOnlineStatus(socket, io);
                }
            }
        });

        // Handle getting online contacts
        socket.on('get_online_contacts', async () => {
            try {
                const contacts = await getOnlineContacts(socket.userId);
                socket.emit('online_contacts', contacts);
            } catch (error) {
                console.error('Error getting online contacts:', error);
                socket.emit('error', { message: 'Failed to get online contacts' });
            }
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log(`User ${socket.user.fullName} disconnected: ${socket.id}`);
            
            // Update user status to offline
            const userInfo = onlineUsers.get(socket.userId);
            if (userInfo) {
                userInfo.status = 'offline';
                userInfo.lastSeen = new Date();
                
                // Emit offline status to contacts
                emitOnlineStatus(socket, io);
            }

            // Clear typing indicators
            typingUsers.forEach((users, conversationId) => {
                if (users.has(socket.userId)) {
                    clearTypingIndicator(conversationId, socket.userId, io);
                }
            });

            // Remove from online users
            onlineUsers.delete(socket.userId);
            userSockets.delete(socket.userId);
        });

        // Handle errors
        socket.on('error', (error) => {
            console.error(`Socket error for user ${socket.userId}:`, error);
        });
    });

    // Cleanup inactive connections periodically
    setInterval(() => {
        const now = Date.now();
        onlineUsers.forEach((userInfo, userId) => {
            if (now - userInfo.lastSeen.getTime() > 300000) { // 5 minutes
                onlineUsers.delete(userId);
                userSockets.delete(userId);
            }
        });
    }, 60000); // Check every minute

    return io;
};

/**
 * Get user online status
 * @param {string} userId - User ID
 * @returns {Object} User online status
 */
const getUserOnlineStatus = (userId) => {
    const userInfo = onlineUsers.get(userId);
    return {
        isOnline: !!userInfo,
        status: userInfo?.status || 'offline',
        lastSeen: userInfo?.lastSeen || null
    };
};

/**
 * Send message notification to user
 * @param {string} userId - User ID
 * @param {Object} notification - Notification data
 * @param {Object} io - Socket.IO server instance
 */
const sendNotificationToUser = (userId, notification, io) => {
    const socketId = userSockets.get(userId);
    if (socketId) {
        io.to(socketId).emit('notification', notification);
    }
};

export {
    initializeSocket,
    getUserOnlineStatus,
    sendNotificationToUser,
    onlineUsers,
    userSockets
};