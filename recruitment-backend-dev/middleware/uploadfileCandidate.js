// uploadMiddleware.js
import multer from 'multer';

const storage = multer.memoryStorage();

const allowedFields = [
  { name: 'profile_image', maxCount: 1 },
  { name: 'resume_file', maxCount: 1 },
];

// Add dynamic credential file fields
for (let i = 0; i < 10; i++) {
  allowedFields.push({ name: `credentials[${i}].documentFile`, maxCount: 1 });
}

export const uploadCandidateFiles = multer({ storage }).fields(allowedFields);
