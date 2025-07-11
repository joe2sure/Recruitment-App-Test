import express from "express";
import path from "path";
import { fileURLToPath } from 'url';  // Add this import
import { dirname } from 'path';      // Add this import


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);  // Now we have __dirname in ES modules

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.get("/verification-success", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "verified.html"));
});
router.get("/verified/:userId/:token", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "reset-password.html"));
});

router.get("/test(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "test.html"));
});

router.get("/redirect(.html)?", (req, res) => {
  res.redirect(301, "/test.html");
});

export default router;
