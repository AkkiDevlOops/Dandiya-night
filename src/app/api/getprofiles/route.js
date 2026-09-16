// app/api/users/males/route.js
import  connectDB  from '@/lib/db.js';
import  Profile  from '@/models/profile'; // 👈 Import your actual User/Profile model
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
      const cookieStore = await cookies();
      const tokenCookie = cookieStore.get("auth_token");
      const sessionUser = JSON.parse(tokenCookie.value);
      const sessionId = sessionUser.id; 

      console.log(sessionId)
    // 1. Ensure your app is actively connected to MongoDB
    await connectDB();

    const alreadyusername = await Profile.findOne({ id: sessionId });
    const gender = alreadyusername.gender;

    
    // 2. 🚀 Filter Query: Find all documents where gender is exactly "male"
    // (Case-insensitive regex matching ensures it catches "Male", "male", or "MALE")
    if(!gender == 'Male'){
         const femaleUsers = await Profile.find({
         gender: { $regex: /^female$/i } 
         });

         console.log("female user "+femaleUsers)

         return NextResponse.json({
      success: true,
      count: femaleUsers.length,
      users: femaleUsers
    });
    }

    if(gender == 'Male'){
    const maleUsers = await Profile.find({
      gender: { $regex: /^male$/i } 
    });
   
    console.log("male users"+maleUsers)

    // 3. Return the array list to the frontend
    return NextResponse.json({
      success: true,
      count: maleUsers.length,
      users: maleUsers
    }); }

  } catch (error) {
    console.error("Failed to fetch male users:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" }, 
      { status: 500 }
    );
  }
}
