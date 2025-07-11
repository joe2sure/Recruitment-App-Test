/**
 * @fileoverview Express server configuration and initialization.
 * Handles middleware setup, route registration, and server startup.
 * 
 * @module server
 * @author Golor Abraham AjiriOghene, Waliu Idowu, Nwachukwuchinedu,  Quadir Olaoluwa
 * @version 1.1.0
 */

import dotenv from "dotenv";
dotenv.config(); // ✅ Load env vars early

// ✅ Debugging: Log important env values (optional)


import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import morgan from "morgan";
import http from 'http';
import authhh from "./route/auth.js"
// Configuration imports
import { cleanupTokens } from './jobs/tokenCleanup.js';
import { startautomessage } from "./controllers/automessage.js";
import connectDB from "./config/db.js";
import passport from 'passport';
// Middleware impopassportrts
import { logger } from "./middleware/logEvent.js";
import errorHandler from "./middleware/erroHandle.js";
import credentials from "./middleware/credentials.js";
import { sanitizeAllInputs } from "./middleware/sanitize.js";
// Route imports
import rootRoutes from "./route/root.js";
import authRoutes from "./route/api/auth.js";
import adminRoutes from "./route/api/admin.js";
import jobPostRoutes from "./route/api/jobPostRoute.js";
import atsConfigRoutes from "./route/api/atsConfigRoute.js";
import candidateRoutes from './route/api/candidateRoute.js';
import employerRoutes from "./route/api/employerRoute.js";
import atsFilterRoutes from "./route/api/atsFilterAndMatchCandidateRoute.js";
import paymentRoutes from './route/payment.js';
import chatRoutes from './route/api/chatRoute.js'; // Import chat routes


// WebSocket manager
import { initializeSocket } from './socket/socketManager.js';

// Express app initialization
const app = express();
const PORT = process.env.PORT || 3500;

// ✅ ESM __dirname configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * CORS Configuration
 * @type {Object}
 */
const corsOptions = {
    origin: ['http://localhost:3000',
        'null', // For file:// protocol
        'file://' // For local files
    ],
    credentials: true,
    optionsSuccessStatus: 200
};
// Utility: Generate Tokens

/**
 * Middleware Setup
 */
const setupMiddleware = () => {
    app.use(logger);
    app.use(morgan("dev"));
    app.use(passport.initialize());
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));;
    app.use(cookieParser());
    app.use(credentials);
    app.use(sanitizeAllInputs);
};

/**
 * Static File Configuration
 */
const setupStaticFiles = () => {
    app.use("/", express.static(path.join(__dirname, "public")));
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
    app.use(express.static(path.join(__dirname, 'views')));
};

/**
 * API Routes Configuration
 */
const setupRoutes = () => {
    app.use("/", rootRoutes);
    app.use("/api/auth", authRoutes);
    app.use("/auth", authhh)
    app.use("/api/admin", adminRoutes);
    app.use("/api/jobs", jobPostRoutes);
    app.use("/api/ats", atsConfigRoutes);
    app.use("/api/employers", employerRoutes);
    app.use("/api/candidates", candidateRoutes);
    app.use("/api/ats-filter", atsFilterRoutes);
    app.use("/api/payment", paymentRoutes); // ✅ From Incoming version
    app.use("/api/chat", chatRoutes);

    // ✅ Serve index.html on /index
    app.get('/index', (req, res) => {
        res.sendFile(path.join(__dirname, 'views', 'index.html'));
    });
    // app.use("/api/payment", paymentRoutes); // From Incoming version
    app.post("/login", (req, res) => {
        const { username } = req.body;
        const user = User.find(u => u.username === username && u.password === password);
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        refreshTokens.push(refreshToken);

        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: false, // set to true in production with HTTPS
            sameSite: "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({ accessToken });
    });

    //   
    // Example Route
    app.get("/red(.html)?", (req, res, next) => {
        console.log("e");
        next();
    }, (req, res) => {
        res.send("it is okay");
    });

    // ✅ Supabase Test Route
    app.get('/tst', async (req, res) => {
        const { data, error } = await supabase
            .from('training_modules')
            .select('*')
            .limit(1);

        if (error) {
            console.error('Supabase error:', error.message);
            return res.status(500).send('Error connecting to Supabase');
        }

        res.send(`Sample data: ${JSON.stringify(data)}`);
    });
};

/**
 * Schedule Cleanup Jobs
 */
const setupCleanupJobs = () => {
    setInterval(cleanupTokens, 60 * 60 * 1000); // Every hour
    cleanupTokens(); // Initial cleanup
};

// const automessaged = ()=>{
//    setInterval(startautomessage,  5000); 
//    startautomessage();
// }
/**
 * Server Initialization
 */
const startServer = async () => {
    try {
        // ✅ Connect to MongoDB
        await connectDB();

        // ✅ Setup application
        setupMiddleware();
        setupStaticFiles();
        setupRoutes();
        setupCleanupJobs();
        // automessaged()
        // ✅ Global Error Handler
        app.use(errorHandler);

        // Create HTTP server
        const httpServer = http.createServer(app);

        // Initialize WebSocket server
        const io = initializeSocket(httpServer);

        // ✅ Start server after DB connection
        console.log("Connected to MongoDB");
        httpServer.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`Environment: ${process.env.NODE_ENV}`);
        });

    } catch (error) {
        console.error('Server initialization failed:', error);
        process.exit(1);
    }
};

// Start the server
startServer().catch(console.error);

export default app;