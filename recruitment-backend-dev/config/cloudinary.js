const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure cloudinary
cloudinary.config({
  cloud_name: 'YOUR_CLOUD_NAME',
  api_key: 'YOUR_API_KEY',
  api_secret: 'YOUR_API_SECRET'
});

// Setup multer storage to use Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'my_uploads', // Folder in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg', 'pdf']
  }
});

module.exports = { cloudinary, storage };
