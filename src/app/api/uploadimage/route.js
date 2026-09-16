import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';
import User from '@/models/user'
import Profile from '@/models/profile';

import connectDB from '@/lib/db';




export async function POST(request) {
  try {
    connectDB();
    cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

    // 2. Parse the incoming multi-part form data
    const formData = await request.formData();
    const file = formData.get('image'); // Looks for the input named 'image'
    const id = formData.get('userId');
    const stringid = id.toString();
    console.log(stringid);

    

    if (!file) {
      return NextResponse.json({ error: 'No image file provided' }, { status: 400 });
    }

    // 3. Convert the file into a temporary buffer for Cloudinary
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 4. Upload directly to your Cloudinary project environment
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'user_uploads', // 📂 Automatically creates this folder in Cloudinary
          resource_type: 'auto',  // Handles images, vectors, gifs, etc.
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    // const user = await  User.findOne()

     const updatedUser = await Profile.findOneAndUpdate(
      { id: stringid }, // 👈 Just write the key-value pair directly!
      { $push: { images: uploadResult.secure_url } },
      { returnDocument: 'after',
        runValidators: true
       }
     
    );

    console.log(updatedUser);

   
    // 5. Return the permanent, queryable secure URL back to the frontend
    return NextResponse.json({ 
      success: true, 
      imageUrl: uploadResult.secure_url // 🔗 Save this URL string in MongoDB later!
    });

  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    return NextResponse.json({ error: 'Failed to upload image to cloud' }, { status: 500 });
  }
}
