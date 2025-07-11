/**
 * @fileoverview Chat system models for conversations and messages
 * Handles conversation management, message storage, and real-time chat features
 * 
 * @module models/Chat
 * @requires mongoose
 * @requires crypto
 * 
 * @author Golor Abraham AjiriOghene
 * @version 1.0.0
 */

import mongoose from 'mongoose';
import crypto from 'crypto';

// Encryption configuration
const ENCRYPTION_KEY = Buffer.from(process.env.CHAT_ENCRYPTION_KEY || crypto.randomBytes(32), 'hex'); // 32 bytes = 256 bits
const IV_LENGTH = 16; // AES block size in bytes
/**
 * Message Schema
 * @typedef {Object} Message
 * @property {ObjectId} sender - ID of the message sender
 * @property {ObjectId} recipient - ID of the message recipient
 * @property {string} content - Encrypted message content
 * @property {string} messageType - Type of message (text, file, image)
 * @property {Object} fileData - File information if message contains file
 * @property {Date} sentAt - When message was sent
 * @property {Date} deliveredAt - When message was delivered
 * @property {Date} seenAt - When message was seen
 * @property {boolean} isDeleted - Soft delete flag
 * @property {string} status - Message status (sent, delivered, seen)
 */
const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    content: {
        type: String,
        required: true
    },
    messageType: {
        type: String,
        enum: ['text', 'file', 'image'],
        default: 'text'
    },
    fileData: {
        filename: String,
        originalName: String,
        mimetype: String,
        size: Number,
        url: String
    },
    sentAt: {
        type: Date,
        default: Date.now,
        index: true
    },
    deliveredAt: {
        type: Date,
        default: null
    },
    seenAt: {
        type: Date,
        default: null
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['sent', 'delivered', 'seen'],
        default: 'sent',
        index: true
    }
}, {
    timestamps: true
});

/**
 * Conversation Schema
 * @typedef {Object} Conversation
 * @property {Array<ObjectId>} participants - Array of participant user IDs
 * @property {ObjectId} lastMessage - Reference to the last message
 * @property {Date} lastActivity - Last activity timestamp
 * @property {Array} unreadCounts - Unread message counts per participant
 * @property {boolean} isActive - Whether conversation is active
 * @property {Object} metadata - Additional conversation metadata
 */
const conversationSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    },
    lastActivity: {
        type: Date,
        default: Date.now,
        index: true
    },
    unreadCounts: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        count: {
            type: Number,
            default: 0
        }
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    metadata: {
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        conversationType: {
            type: String,
            enum: ['job_inquiry', 'interview', 'general'],
            default: 'general'
        },
        jobReference: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job'
        }
    }
}, {
    timestamps: true
});

// Indexes for efficient queries
conversationSchema.index({ participants: 1, lastActivity: -1 });
conversationSchema.index({ 'participants': 1, 'isActive': 1 });
messageSchema.index({ sender: 1, recipient: 1, sentAt: -1 });
messageSchema.index({ recipient: 1, status: 1 });

/**
 * Encryption helper functions
 */
const encryptMessage = (text) => {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
};

const decryptMessage = (encryptedText) => {
    try {
        const textParts = encryptedText.split(':');
        const iv = Buffer.from(textParts.shift(), 'hex');
        const encryptedData = textParts.join(':');
        const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
        let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch (error) {
        console.error('Decryption error:', error);
        return '[Message could not be decrypted]';
    }
};

/**
 * Pre-save middleware for message encryption
 */
messageSchema.pre('save', function(next) {
    if (this.isModified('content') && this.messageType === 'text') {
        this.content = encryptMessage(this.content);
    }
    next();
});

/**
 * Virtual for decrypted content
 */
messageSchema.virtual('decryptedContent').get(function() {
    if (this.messageType === 'text') {
        return decryptMessage(this.content);
    }
    return this.content;
});

/**
 * Method to mark message as delivered
 */
messageSchema.methods.markAsDelivered = async function() {
    if (this.status === 'sent') {
        this.deliveredAt = new Date();
        this.status = 'delivered';
        await this.save();
    }
    return this;
};

/**
 * Method to mark message as seen
 */
messageSchema.methods.markAsSeen = async function() {
    if (this.status !== 'seen') {
        this.seenAt = new Date();
        this.status = 'seen';
        await this.save();
    }
    return this;
};

/**
 * Method to get other participant in conversation
 */
conversationSchema.methods.getOtherParticipant = function(currentUserId) {
    return this.participants.find(id => !id.equals(currentUserId));
};

/**
 * Method to increment unread count for a user
 */
conversationSchema.methods.incrementUnreadCount = async function(userId) {
    const unreadEntry = this.unreadCounts.find(entry => 
        entry.userId.equals(userId)
    );
    
    if (unreadEntry) {
        unreadEntry.count += 1;
    } else {
        this.unreadCounts.push({ userId, count: 1 });
    }
    
    await this.save();
};

/**
 * Method to reset unread count for a user
 */
conversationSchema.methods.resetUnreadCount = async function(userId) {
    const unreadEntry = this.unreadCounts.find(entry => 
        entry.userId.equals(userId)
    );
    
    if (unreadEntry) {
        unreadEntry.count = 0;
        await this.save();
    }
};

/**
 * Method to get unread count for a user
 */
conversationSchema.methods.getUnreadCount = function(userId) {
    const unreadEntry = this.unreadCounts.find(entry => 
        entry.userId.equals(userId)
    );
    return unreadEntry ? unreadEntry.count : 0;
};

/**
 * Static method to find or create conversation
 */
conversationSchema.statics.findOrCreateConversation = async function(participant1, participant2) {
    let conversation = await this.findOne({
        participants: { $all: [participant1, participant2] },
        $expr: { $eq: [{ $size: "$participants" }, 2] }
    });

    if (!conversation) {
        conversation = new this({
            participants: [participant1, participant2],
            unreadCounts: [
                { userId: participant1, count: 0 },
                { userId: participant2, count: 0 }
            ],
            metadata: {
                createdBy: participant1
            }
        });
        await conversation.save();
    }

    return conversation;
};

// Create models
const Message = mongoose.model('Message', messageSchema);
const Conversation = mongoose.model('Conversation', conversationSchema);

export { Message, Conversation };