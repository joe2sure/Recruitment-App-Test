/**
 * @fileoverview Chat route configurations.
 * Handles chat-related API endpoints for conversations and messages.
 * 
 * @module routes/api/chatRoute
 * @requires express
 * @requires ../controllers/chat
 * 
 * @author Golor Abraham AjiriOghene
 * @version 1.0.0
 */

import express from 'express';
import {
    getUserConversations,
    getConversationMessages,
    createOrGetConversation,
    sendMessage,
    markMessagesAsSeen,
    getUnreadCount,
    deleteConversation,
    deleteMessage,
    updateMessage,
    getMessageDetails
} from '../../controllers/chat_controller.js';

import {
     authenticateUser,
    isAdmin,
    isEmployer
} from '../../middleware/authMiddleware.js';

import {
    chatSecurityMiddleware
} from '../../middleware/chatSecurity.js';

const router = express.Router();

/**
 * Get all conversations for a user
 * @name GET /api/chat/conversations
 * @function
 * @memberof module:routes/api/chatRoute
 * @inner
 * @requires authentication
 * @returns {Object} 200 - List of user conversations
 * @throws {Error} 500 - Internal server error
 */
router.get('/conversations', authenticateUser, getUserConversations);

/**
 * Get messages for a specific conversation
 * @name GET /api/chat/conversations/:conversationId/messages
 * @function
 * @memberof module:routes/api/chatRoute
 * @inner
 * @requires authentication
 * @returns {Object} 200 - List of messages in the conversation
 * @throws {Error} 404 - Conversation not found
 * @throws {Error} 500 - Internal server error
 */
router.get('/conversations/:conversationId/messages', authenticateUser, getConversationMessages);

/**
 * Create or get existing conversation
 * @name POST /api/chat/conversations
 * @function
 * @memberof module:routes/api/chatRoute
 * @inner
 * @requires authentication
 * @param {string} participantId - ID of the participant to start a conversation with
 * @returns {Object} 201 - Conversation details
 * @throws {Error} 400 - Invalid participant ID
 * @throws {Error} 404 - Participant not found
 * @throws {Error} 500 - Internal server error
 */
router.post('/conversations', authenticateUser, isAdmin, isEmployer, createOrGetConversation);

/**
 * Send message (REST API endpoint - for non-realtime scenarios)
 * @name POST /api/chat/conversations/:conversationId/messages
 * @function
 * @memberof module:routes/api/chatRoute
 * @inner
 * @requires authentication
 * @param {string} content - Message content
 * @param {string} [messageType=text] - Type of message (text, file, image)
 * @param {Object} [fileData] - File information if message contains file
 * @returns {Object} 201 - Sent message details
 * @throws {Error} 404 - Conversation not found
 * @throws {Error} 500 - Internal server error
 */
router.post('/conversations/:conversationId/messages', authenticateUser, chatSecurityMiddleware, sendMessage);

/**
 * Mark messages as seen
 * @name POST /api/chat/conversations/:conversationId/mark-as-seen
 * @function
 * @memberof module:routes/api/chatRoute
 * @inner
 * @requires authentication
 * @returns {Object} 200 - Marked messages count
 * @throws {Error} 404 - Conversation not found
 * @throws {Error} 500 - Internal server error
 */
router.post('/conversations/:conversationId/mark-as-seen', authenticateUser, markMessagesAsSeen);

/**
 * Get unread message count
 * @name GET /api/chat/unread-count
 * @function
 * @memberof module:routes/api/chatRoute
 * @inner
 * @requires authentication
 * @returns {Object} 200 - Unread message count
 * @throws {Error} 500 - Internal server error
 */
router.get('/unread-count', authenticateUser, getUnreadCount);

/**
 * Delete conversation (soft delete)
 * @name DELETE /api/chat/conversations/:conversationId
 * @function
 * @memberof module:routes/api/chatRoute
 * @inner
 * @requires authentication
 * @returns {Object} 200 - Success message
 * @throws {Error} 404 - Conversation not found
 * @throws {Error} 500 - Internal server error
 */
router.delete('/conversations/:conversationId', deleteConversation);

/**
 * Delete message (soft delete)
 * @name DELETE /api/chat/messages/:messageId
 * @function
 * @memberof module:routes/api/chatRoute
 * @inner
 * @requires authentication
 * @returns {Object} 200 - Success message
 * @throws {Error} 404 - Message not found
 * @throws {Error} 500 - Internal server error
 */
router.delete('/messages/:messageId', deleteMessage);

/**
 * Update message content
 * @name PUT /api/chat/messages/:messageId
 * @function
 * @memberof module:routes/api/chatRoute
 * @inner
 * @requires authentication
 * @param {string} content - New message content
 * @returns {Object} 200 - Updated message details
 * @throws {Error} 404 - Message not found
 * @throws {Error} 500 - Internal server error
 */
router.put('/messages/:messageId', authenticateUser, updateMessage);

/**
 * Get message details
 * @name GET /api/chat/messages/:messageId
 * @function
 * @memberof module:routes/api/chatRoute
 * @inner
 * @requires authentication
 * @returns {Object} 200 - Message details
 * @throws {Error} 404 - Message not found
 * @throws {Error} 500 - Internal server error
 */
router.get('/messages/:messageId', authenticateUser, getMessageDetails);

export default router;