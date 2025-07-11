import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';




export const uploads = (fileBuffer, originalName, customFolder = 'general') => {
  return new Promise((resolve, reject) => {
    try {
      const baseUploadPath = path.join(process.cwd(), 'uploads', customFolder); // full path

      // Create directory if it doesn't exist
      if (!fs.existsSync(baseUploadPath)) {
        fs.mkdirSync(baseUploadPath, { recursive: true });
      }

      // Generate unique filename
      const uniqueName = `${Date.now()}_${uuidv4()}_${originalName.replace(/\s+/g, '_')}`;
      const fullPath = path.join(baseUploadPath, uniqueName);

      // Save file
      fs.writeFile(fullPath, fileBuffer, (err) => {
        if (err) return reject(err);

        // Return relative path (e.g., /uploads/resumes/candidates/1718123_my_resume.pdf)
        const relativePath = `/uploads/${customFolder}/${uniqueName}`.replace(/\\/g, '/');
        resolve(relativePath);
      });
    } catch (error) {
      reject(error);
    }
  });
};



export const deleteFile = (relativePath) => {
  return new Promise((resolve, reject) => {
    try {
      // Normalize path: remove leading slashes and convert to absolute
      const sanitizedPath = relativePath.replace(/^\/+/, '');
      const absolutePath = path.join(process.cwd(), sanitizedPath);

      // Check if file exists
      if (fs.existsSync(absolutePath)) {
        // Delete the file
        fs.unlink(absolutePath, (err) => {
          if (err) return reject(err);
          resolve(true);
        });
      } else {
        resolve(false); // File not found — nothing to delete
      }
    } catch (error) {
      reject(error);
    }
  });
};
