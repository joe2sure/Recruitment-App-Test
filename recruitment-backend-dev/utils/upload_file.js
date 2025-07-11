import { v2 as cloudinary } from 'cloudinary';

const uploadFile = (fileBuffer, fileName, folder) => {

    const originalName = fileName.replace(/[\s-_]/g, '_');
    const newFileName = `${Date.now()}_` + originalName;

    // Cloudinary Config
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.API_KEY, 
        api_secret: process.env.API_SECRET 
    });

    // upload to cloudinary
    return new Promise((resolve, reject ) => {
        cloudinary.uploader.upload_stream( { resource_type: 'raw', folder: folder, public_id: newFileName }, 
        (err, result) => { 
            if(err) {
                return reject(err.message)
            }
            resolve(result.secure_url)
        }
    ).end(fileBuffer);

    })
}

export default uploadFile