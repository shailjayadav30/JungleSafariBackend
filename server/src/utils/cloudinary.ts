import { v2 as cloudinary } from 'cloudinary';
import { UploadApiResponse } from "cloudinary"

export interface CloudinaryUploadResult {
  secure_url?: string;
  url?: string;
}


    
    cloudinary.config({ 
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET ,
    });

    
    // Upload an image
export  const uploadImageoncloudinary = async(file:Express.Multer.File):Promise<UploadApiResponse>=>{
    if(!File || !file.buffer)   throw new Error("File or buffer missing")
        return  new Promise((resolve,reject)=>{
    const stream =cloudinary.uploader
       .upload_stream(
        {resource_type:'auto'},
        (error,result)=>{
            if(error || !result){
                return reject(error || new Error('Upload failed'))
            }
            resolve(result)
        }
       )
      stream.end(file.buffer)
    })
}