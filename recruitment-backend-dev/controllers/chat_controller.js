/**
 * @fileoverview Chat controllers for handling chat-related API endpoints
 * Handles conversation management, message retrieval, and chat operations
 * 
 * @module controllers/chat
 * @requires ../model/Chat
 * @requires ../model/User
 * 
 * @author Golor Abraham AjiriOghene
 * @version 1.0.0
 */

import { Message, Conversation } from '../model/Chat.js';
import User from '../model/User.js';
import { getUserOnlineStatus } from '../socket/socketManager.js';

/**
 * Get all conversations for a user
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export const getUserConversations = async (req, res) => {
    try {
        const userId = req.user._id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const conversations = await Conversation.find({
            participants: userId,
            isActive: true
        })
        .populate([
            {
                path: 'participants',
                select: 'first_Name last_Name fullName email role',
                match: { _id: { $ne: userId } }
            },
            {
                path: 'lastMessage',
                select: 'content messageType sentAt status sender'
            }
        ])
        .sort({ lastActivity: -1 })
        .skip(skip)
        .limit(limit);

        // Format conversations with additional info
        const formattedConversations = await Promise.all(
            conversations.map(async (conv) => {
                const otherParticipant = conv.participants[0];
                const unreadCount = conv.getUnreadCount(userId);
                const onlineStatus = getUserOnlineStatus(otherParticipant._id.toString());

                let lastMessageContent = '';
                if (conv.lastMessage) {
                    if (conv.lastMessage.messageType === 'text') {
                        const message = await Message.findById(conv.lastMessage._id);
                        lastMessageContent = message ? message.decryptedContent : '';
                    } else {
                        lastMessageContent = `📎 ${conv.lastMessage.messageType}`;
                    }
                }

                return {
                    _id: conv._id,
                    participant: {
                        _id: otherParticipant._id,
                        name: otherParticipant.fullName,
                        email: otherParticipant.email,
                        role: otherParticipant.role,
                        isOnline: onlineStatus.isOnline,
                        status: onlineStatus.status,
                        lastSeen: onlineStatus.lastSeen
                    },
                    lastMessage: {
                        content: lastMessageContent,
                        sentAt: conv.lastMessage?.sentAt,
                        senderId: conv.lastMessage?.sender,
                        status: conv.lastMessage?.status
                    },
                    unreadCount,
                    lastActivity: conv.lastActivity,
                    metadata: conv.metadata
                };
            })
        );

        const totalConversations = await Conversation.countDocuments({
            participants: userId,
            isActive: true
        });

        res.status(200).json({
            success: true,
            data: {
                conversations: formattedConversations,
                pagination: {
                    currentPage: page,
                    totalPages: Math.ceil(totalConversations / limit),
                    totalConversations,
                    hasNextPage: page < Math.ceil(totalConversations / limit),
                    hasPreviousPage: page > 1
                }
            }
        });

    } catch (error) {
        console.error('Get conversations error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve conversations'
        });
    }
};

/**
 * Get messages for a specific conversation
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export const getConversationMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const userId = req.user._id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const skip = (page - 1) * limit;

        // Verify user has access to conversation
        const conversation = await Conversation.findOne({
            _id: conversationId,
            participants: userId
        });

        if (!conversation) {
            return res.status(404).json({
                success: false,
                message: 'Conversation not found or access denied'
            });
        }

        // Get messages
        const messages = await Message.find({
            $or: [
                { sender: userId, recipient: conversation.getOtherParticipant(userId) },
                { sender: conversation.getOtherParticipant(userId), recipient: userId }
            ],
            isDeleted: false
        })
        .populate([
            { path: 'sender', select: 'first_Name last_Name fullName' },
            { path: 'recipient', select: 'first_Name last_Name fullName' }
        ])
        .sort({ sentAt: -1 })
        .skip(skip)
        .limit(limit);

        // Decrypt messages and format response
        const formattedMessages = messages.map(message => ({
            _id: message._id,
            sender: message.sender,
            recipient: message.recipient,
            content: message.decryptedContent,
            messageType: message.messageType,
            fileData: message.fileData,
            sentAt: message.sentAt,
            deliveredAt: message.deliveredAt,
            seenAt: message.seenAt,
            status: message.status
        })).reverse(); // Reverse to show oldest first

        const totalMessages = await Message.countDocuments({
            $or: [
                { sender: userId, recipient: conversation.getOtherParticipant(userId) },
                { sender: conversation.getOtherParticipant(userId), recipient: userId }
            ],
            isDeleted: false
        });

        res.status(200).json({
            success: true,
            data: {
                messages: formattedMessages,
                conversation: {
                    _id: conversation._id,
                    participants: conversation.participants,
                    lastActivity: conversation.lastActivity
                },
                pagination: {
                    currentPage: page,
                    totalPages: Math.ceil(totalMessages / limit),
                    totalMessages,
                    hasNextPage: page < Math.ceil(totalMessages / limit),
                    hasPreviousPage: page > 1
                }
            }
        });

    } catch (error) {
        console.error('Get messages error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve messages'
        });
    }
};

/**
 * Create or get existing conversation
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export const createOrGetConversation = async (req, res) => {
    try {
        const { participantId } = req.body;
        
        console.log(`request user is ${req.user}`);
        const userId = req.user._id;
        

        if (!participantId) {
            return res.status(400).json({
                success: false,
                message: 'Participant ID is required'
            });
        }

        if (participantId === userId.toString()) {
            return res.status(400).json({
                success: false,
                message: 'Cannot create conversation with yourself'
            });
        }

        // Check if participant exists
        const participant = await User.findById(participantId);
        if (!participant) {
            return res.status(404).json({
                success: false,
                message: 'Participant not found'
            });
        }

        // Find or create conversation
        const conversation = await Conversation.findOrCreateConversation(userId, participantId);

        // Populate participant info
        await conversation.populate([
            {
                path: 'participants',
                select: 'first_Name last_Name fullName email role',
                match: { _id: { $ne: userId } }
            }
        ]);

        const otherParticipant = conversation.participants[0];
        const onlineStatus = getUserOnlineStatus(participantId);

        res.status(201).json({
            success: true,
            data: {
                conversation: {
                    _id: conversation._id,
                    participant: {
                        _id: otherParticipant._id,
                        name: otherParticipant.fullName,
                        email: otherParticipant.email,
                        role: otherParticipant.role,
                        isOnline: onlineStatus.isOnline,
                        status: onlineStatus.status,
                        lastSeen: onlineStatus.lastSeen
                    },
                    lastActivity: conversation.lastActivity,
                    unreadCount: conversation.getUnreadCount(userId),
                    metadata: conversation.metadata
                }
            }
        });

    } catch (error) {
        console.error('Create conversation error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create conversation'
        });
    }
};

/**
 * Send message (REST API endpoint - for non-realtime scenarios)
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export const sendMessage = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const { content, messageType = 'text', fileData } = req.body;
        const userId = req.user._id;

        // Verify conversation access
        const conversation = await Conversation.findOne({
            _id: conversationId,
            participants: userId
        });

        if (!conversation) {
            return res.status(404).json({
                success: false,
                message: 'Conversation not found or access denied'
            });
        }

        const recipient = conversation.getOtherParticipant(userId);

        // Create message
        const message = new Message({
            sender: userId,
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

        // Populate message
        await message.populate([
            { path: 'sender', select: 'first_Name last_Name fullName' },
            { path: 'recipient', select: 'first_Name last_Name fullName' }
        ]);

        res.status(201).json({
            success: true,
            data: {
                message: {
                    _id: message._id,
                    sender: message.sender,
                    recipient: message.recipient,
                    content: message.decryptedContent,
                    messageType: message.messageType,
                    fileData: message.fileData,
                    sentAt: message.sentAt,
                    status: message.status
                }
            }
        });

    } catch (error) {
        console.error('Send message error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send message'
        });
    }
};

/**
 * Mark messages as seen
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export const markMessagesAsSeen = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const userId = req.user._id;

        // Verify conversation access
        const conversation = await Conversation.findOne({
            _id: conversationId,
            participants: userId
        });

        if (!conversation) {
            return res.status(404).json({
                success: false,
                message: 'Conversation not found or access denied'
            });
        }

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

        res.status(200).json({
            success: true,
            data: {
                markedCount: result.modifiedCount,
                seenAt: new Date()
            }
        });

    } catch (error) {
        console.error('Mark messages seen error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to mark messages as seen'
        });
    }
};

/**
 * Get unread message count
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export const getUnreadCount = async (req, res) => {
    try {
        const userId = req.user._id;

        const conversations = await Conversation.find({
            participants: userId,
            isActive: true
        });

        let totalUnread = 0;
        const conversationUnreads = conversations.map(conv => {
            const count = conv.getUnreadCount(userId);
            totalUnread += count;
            return {
                conversationId: conv._id,
                unreadCount: count
            };
        });

        res.status(200).json({
            success: true,
            data: {
                totalUnread,
                conversations: conversationUnreads
            }
        });

    } catch (error) {
        console.error('Get unread count error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get unread count'
        });
    }
};

/**
 * Delete conversation (soft delete)
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export const deleteConversation = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const userId = req.user._id;

        const conversation = await Conversation.findOne({
            _id: conversationId,
            participants: userId
        });

        if (!conversation) {
            return res.status(404).json({
                success: false,
                message: 'Conversation not found or access denied'
            });
        }

        // Soft delete - mark as inactive
        conversation.isActive = false;
        await conversation.save();

        res.status(200).json({
            success: true,
            message: 'Conversation deleted successfully'
        });

    } catch (error) {
        console.error('Delete conversation error:', error);
                res.status(500).json({
            success: false,
            message: 'Failed to delete conversation'
        });
    }
};

/**
 * Delete message (soft delete)
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export const deleteMessage = async (req, res) => {
    try {
        const { messageId } = req.params;
        const userId = req.user._id;

        const message = await Message.findById(messageId);

        if (!message) {
            return res.status(404).json({
                success: false,
                message: 'Message not found'
            });
        }

        if (!message.sender.equals(userId)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied: You are not the sender of this message'
            });
        }

        // Soft delete - mark as deleted
        message.isDeleted = true;
        await message.save();

        res.status(200).json({
            success: true,
            message: 'Message deleted successfully'
        });

    } catch (error) {
        console.error('Delete message error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete message'
        });
    }
};

/**
 * Update message content
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export const updateMessage = async (req, res) => {
    try {
        const { messageId } = req.params;
        const { content } = req.body;
        const userId = req.user._id;

        const message = await Message.findById(messageId);

        if (!message) {
            return res.status(404).json({
                success: false,
                message: 'Message not found'
            });
        }

        if (!message.sender.equals(userId)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied: You are not the sender of this message'
            });
        }

        // Update message content
        message.content = content;
        await message.save();

        res.status(200).json({
            success: true,
            data: {
                message: {
                    _id: message._id,
                    content: message.decryptedContent,
                    sentAt: message.sentAt,
                    status: message.status
                }
            }
        });

    } catch (error) {
        console.error('Update message error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update message'
        });
    }
};

/**
 * Get message details
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export const getMessageDetails = async (req, res) => {
    try {
        const { messageId } = req.params;
        const userId = req.user._id;

        const message = await Message.findById(messageId)
            .populate([
                { path: 'sender', select: 'first_Name last_Name fullName' },
                { path: 'recipient', select: 'first_Name last_Name fullName' }
            ]);

        if (!message) {
            return res.status(404).json({
                success: false,
                message: 'Message not found'
            });
        }

        if (!message.sender.equals(userId) && !message.recipient.equals(userId)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied: You are not a participant in this message'
            });
        }

        res.status(200).json({
            success: true,
            data: {
                message: {
                    _id: message._id,
                    sender: message.sender,
                    recipient: message.recipient,
                    content: message.decryptedContent,
                    messageType: message.messageType,
                    fileData: message.fileData,
                    sentAt: message.sentAt,
                    deliveredAt: message.deliveredAt,
                    seenAt: message.seenAt,
                    status: message.status
                }
            }
        });

    } catch (error) {
        console.error('Get message details error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get message details'
        });
    }
};