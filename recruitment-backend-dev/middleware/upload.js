import multer from "multer";

const storage = multer.memoryStorage(); // Store in memory to send to Cloudinary

const upload = multer({ storage });

export default upload;
