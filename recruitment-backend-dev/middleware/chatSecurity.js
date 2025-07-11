/**
 * @fileoverview Chat security middleware and content filtering
 * Handles XSS protection, profanity filtering, and message validation
 * 
 * @module middleware/chatSecurity
 * @requires validator
 * @requires dompurify
 * @requires jsdom
 * 
 * @author Golor Abraham AjiriOghene
 * @version 1.0.0
 */

import validator from 'validator';
import { JSDOM } from 'jsdom';
import createDOMPurify from 'dompurify';

// Initialize DOMPurify for server-side XSS protection
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

/**
 * Comprehensive list of banned words and patterns
 * Includes profanity, sexual content, and inappropriate terms
 */
const BANNED_WORDS = [
    // Profanity
    'shit', 'fuck', 'damn', 'hell', 'ass', 'bitch', 'bastard', 'crap',
    'piss', 'cock', 'dick', 'pussy', 'whore', 'slut', 'faggot', 'nigger',
    'retard', 'gay', 'lesbian', 'homo', 'queer', 'dyke', 'tranny',
    
    // Sexual content
    'sex', 'porn', 'nude', 'naked', 'masturbate', 'orgasm', 'penis',
    'vagina', 'breast', 'boob', 'tit', 'anal', 'oral', 'blow job',
    'hand job', 'finger', 'lick', 'suck', 'cum', 'sperm', 'horny',
    'sexy', 'erotic', 'kinky', 'fetish', 'bdsm', 'bondage',
    
    // Variations and leetspeak
    'sh1t', 'f*ck', 'f**k', 'sh*t', 'b1tch', 'd1ck', 'p*rn',
    'fck', 'sht', 'btch', 'cnt', 'dmn', 'hl',
    
    // Inappropriate recruitment terms
    'escort', 'massage', 'adult entertainment', 'strip', 'webcam',
    'sugar daddy', 'sugar baby', 'hookup', 'casual encounter'
];

/**
 * Suspicious patterns that might indicate inappropriate content
 */
const SUSPICIOUS_PATTERNS = [
    /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/, // Phone numbers in messages
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/, // Email addresses
    /https?:\/\/[^\s]+/, // URLs
    /\$\d+/, // Money amounts
    /\b(meet|coffee|drink|dinner)\s+(tonight|today|now)\b/i, // Immediate meetup requests
    /\b(private|personal|intimate|secret)\b/i, // Privacy-related terms
];

/**
 * Rate limiting configuration for chat messages
 */
const RATE_LIMITS = {
    MESSAGES_PER_MINUTE: 30,
    MESSAGES_PER_HOUR: 200,
    MAX_MESSAGE_LENGTH: 1000,
    MIN_MESSAGE_LENGTH: 1
};

/**
 * Store for rate limiting (in production, use Redis)
 */
const rateLimitStore = new Map();

/**
 * Clean rate limit store periodically
 */
setInterval(() => {
    const now = Date.now();
    for (const [key, data] of rateLimitStore.entries()) {
        if (now - data.lastReset > 3600000) { // 1 hour
            rateLimitStore.delete(key);
        }
    }
}, 300000); // Clean every 5 minutes

/**
 * XSS Protection - Sanitize message content
 * @param {string} content - Raw message content
 * @returns {string} Sanitized content
 */
const sanitizeContent = (content) => {
    if (!content || typeof content !== 'string') {
        return '';
    }

    // Basic HTML entity encoding
    content = validator.escape(content);
    
    // Additional DOMPurify sanitization
    content = DOMPurify.sanitize(content, {
        ALLOWED_TAGS: [], // No HTML tags allowed in chat
        ALLOWED_ATTR: []
    });

    // Remove any remaining HTML-like patterns
    content = content.replace(/<[^>]*>/g, '');
    
    // Normalize whitespace
    content = content.replace(/\s+/g, ' ').trim();

    return content;
};

/**
 * Profanity Filter - Check for banned words and inappropriate content
 * @param {string} content - Message content to check
 * @returns {Object} Filter result with isClean flag and violations
 */
const checkProfanity = (content) => {
    const violations = [];
    const lowerContent = content.toLowerCase();
    
    // Check banned words
    BANNED_WORDS.forEach(word => {
        const regex = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
        if (regex.test(lowerContent)) {
            violations.push({
                type: 'profanity',
                word: word,
                severity: 'high'
            });
        }
    });

    // Check suspicious patterns
    SUSPICIOUS_PATTERNS.forEach((pattern, index) => {
        if (pattern.test(content)) {
            violations.push({
                type: 'suspicious_pattern',
                pattern: index,
                severity: 'medium'
            });
        }
    });

    // Check for excessive caps (potential shouting)
    const capsRatio = (content.match(/[A-Z]/g) || []).length / content.length;
    if (capsRatio > 0.7 && content.length > 10) {
        violations.push({
            type: 'excessive_caps',
            severity: 'low'
        });
    }

    // Check for repeated characters (spam patterns)
    if (/(.)\1{4,}/.test(content)) {
        violations.push({
            type: 'spam_pattern',
            severity: 'medium'
        });
    }

    return {
        isClean: violations.length === 0,
        violations,
        severity: violations.length > 0 ? Math.max(...violations.map(v => {
            switch(v.severity) {
                case 'high': return 3;
                case 'medium': return 2;
                case 'low': return 1;
                default: return 0;
            }
        })) : 0
    };
};

/**
 * Rate Limiting - Check if user is sending messages too frequently
 * @param {string} userId - User ID
 * @returns {Object} Rate limit status
 */
const checkRateLimit = (userId) => {
    const now = Date.now();
    const userKey = `rate_limit_${userId}`;
    
    if (!rateLimitStore.has(userKey)) {
        rateLimitStore.set(userKey, {
            messagesThisMinute: 1,
            messagesThisHour: 1,
            lastMinuteReset: now,
            lastHourReset: now,
            lastReset: now
        });
        return { allowed: true, resetIn: 0 };
    }

    const userData = rateLimitStore.get(userKey);
    
    // Reset minute counter
    if (now - userData.lastMinuteReset > 60000) {
        userData.messagesThisMinute = 0;
        userData.lastMinuteReset = now;
    }
    
    // Reset hour counter
    if (now - userData.lastHourReset > 3600000) {
        userData.messagesThisHour = 0;
        userData.lastHourReset = now;
    }

    // Check limits
    if (userData.messagesThisMinute >= RATE_LIMITS.MESSAGES_PER_MINUTE) {
        return {
            allowed: false,
            reason: 'Too many messages per minute',
            resetIn: 60000 - (now - userData.lastMinuteReset)
        };
    }

    if (userData.messagesThisHour >= RATE_LIMITS.MESSAGES_PER_HOUR) {
        return {
            allowed: false,
            reason: 'Too many messages per hour',
            resetIn: 3600000 - (now - userData.lastHourReset)
        };
    }

    // Increment counters
    userData.messagesThisMinute++;
    userData.messagesThisHour++;
    
    return { allowed: true, resetIn: 0 };
};

/**
 * Message Length Validation
 * @param {string} content - Message content
 * @returns {Object} Validation result
 */
const validateMessageLength = (content) => {
    if (!content || content.length < RATE_LIMITS.MIN_MESSAGE_LENGTH) {
        return {
            valid: false,
            reason: 'Message too short'
        };
    }

    if (content.length > RATE_LIMITS.MAX_MESSAGE_LENGTH) {
        return {
            valid: false,
            reason: `Message too long. Maximum ${RATE_LIMITS.MAX_MESSAGE_LENGTH} characters allowed`
        };
    }

    return { valid: true };
};

/**
 * Main chat security middleware
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const chatSecurityMiddleware = async (req, res, next) => {
    try {
        const { content } = req.body;
        const userId = req.user._id.toString();

        // Validate message length
        const lengthValidation = validateMessageLength(content);
        if (!lengthValidation.valid) {
            return res.status(400).json({
                success: false,
                message: lengthValidation.reason
            });
        }

        // Check rate limits
        const rateLimit = checkRateLimit(userId);
        if (!rateLimit.allowed) {
            return res.status(429).json({
                success: false,
                message: rateLimit.reason,
                resetIn: rateLimit.resetIn
            });
        }

        // Sanitize content
        const sanitizedContent = sanitizeContent(content);
        
        // Check for profanity and inappropriate content
        const profanityCheck = checkProfanity(sanitizedContent);
        
        if (!profanityCheck.isClean) {
            // Log violation for monitoring
            console.log(`Content violation by user ${userId}:`, {
                violations: profanityCheck.violations,
                content: content.substring(0, 100) // Log first 100 chars only
            });

            // Block high severity violations
            if (profanityCheck.severity >= 3) {
                return res.status(400).json({
                    success: false,
                    message: 'Message contains inappropriate content and cannot be sent'
                });
            }

            // Warn for medium severity
            if (profanityCheck.severity >= 2) {
                req.contentWarning = {
                    level: 'medium',
                    violations: profanityCheck.violations
                };
            }
        }

        // Attach sanitized content to request
        req.body.content = sanitizedContent;
        req.body.originalContent = content;
        
        next();
    } catch (error) {
        console.error('Chat security middleware error:', error);
        res.status(500).json({
            success: false,
            message: 'Security check failed'
        });
    }
};

/**
 * Typing indicator security - Prevent spam
 * @param {string} userId - User ID
 * @returns {boolean} Whether typing indicator is allowed
 */
const checkTypingRateLimit = (userId) => {
    const typingKey = `typing_${userId}`;
    const now = Date.now();
    
    if (!rateLimitStore.has(typingKey)) {
        rateLimitStore.set(typingKey, { lastTyping: now });
        return true;
    }

    const lastTyping = rateLimitStore.get(typingKey).lastTyping;
    
    // Allow typing indicator every 2 seconds max
    if (now - lastTyping < 2000) {
        return false;
    }

    rateLimitStore.set(typingKey, { lastTyping: now });
    return true;
};

export {
    chatSecurityMiddleware,
    sanitizeContent,
    checkProfanity,
    checkRateLimit,
    validateMessageLength,
    checkTypingRateLimit,
    RATE_LIMITS
};