import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary (replace with your credentials)
cloudinary.config({
  cloud_name: 'YOUR_CLOUD_NAME',
  api_key: 'YOUR_API_KEY',
  api_secret: 'YOUR_API_SECRET'
});

/**
 * Uploads a file buffer to Cloudinary.
 * @param fileBuffer The buffer containing the file data.
 * @returns A Promise that resolves with the secure URL of the uploaded file.
 */
export const uploadBufferToCloudinary = async (fileBuffer: Buffer): Promise<string> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({
      resource_type: 'auto' // Automatically detect resource type (image, video, raw)
      // You can add other Cloudinary upload options here, e.g.:
      // folder: 'your_folder_name', // Upload to a specific folder
      // public_id: 'your_custom_public_id', // Set a custom public ID
    }, (error, result) => {
      if (error) {
        console.error('Cloudinary upload error:', error);
        return reject(error);
      }
      if (!result) {
           return reject(new Error('Cloudinary upload result is null or undefined'));
      }
      resolve(result.secure_url);
    }).end(fileBuffer); // Pass the buffer to the upload stream
  });
};
