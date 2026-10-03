import crypto from "crypto";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import connectDB from "@/lib/db";
import dbToken from "@/models/tokens";
import { sendOtpEmail } from "@/lib/sendOtpEmail";
import { userlog } from "@/models/Registration";

export async function POST(request) {
  try {
    // Read email from request body
    const data = await request.json();
    const  email  = data.identifier;
    const number = data.number;
    console.log(number + email);
    

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 }
      );
    }

    // Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectDB();

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 1000000).toString();

    // OTP expires in 5 minutes
    const otpExpiresAt = new Date(
      Date.now() + 5 * 60 * 1000
    );

    console.log("EMAIL VALUE:", normalizedEmail);
    console.log("OTP GENERATED:", otp);

    const payload = {
  email: normalizedEmail,
};

const sessionToken = jwt.sign(
  payload, 
  process.env.JWT_SECRET, 
  { expiresIn: '11d' } // 🚀 Valid for exactly 11 days
);

    /*
     * --------------------------------------------------
     * SAVE OTP TO MONGODB
     * --------------------------------------------------
     *
     * You need to associate this OTP with the correct
     * registration/token document.
     *
     * For now this section is commented because I don't
     * yet know how your Registration document is linked
     * to the user's email/currentToken.
     */

    // Example:
    //
    const alreadyemail = await userlog.findOne({
        $or: [
    { email: normalizedEmail },
    { mobileNumber: number }
  ]
    });

    
    if(!alreadyemail){
       await connectDB();

  const newUser = new userlog({
    email: normalizedEmail,
    mobileNumber: number,
     tokenDetails: {
      currentToken: sessionToken,
      isFirstPhaseCompleted: false,
      isPhotoUploaded: false,
      isProfileFullyUpdated: false,
      isLoggedIn: false,
      tempOtp: otp,
      otpExpiresAt: otpExpiresAt,
    }
  });

  // Saving the parent document inserts everything into MongoDB automatically
  const savedUser = await newUser.save();
  console.log(savedUser);

   await sendOtpEmail(normalizedEmail, otp);

    console.log("OTP EMAIL SENT:", normalizedEmail);

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
    });
    }
    
    // if (!tokenDoc) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message: "User/token not found",
    //     },
    //     { status: 404 }
    //   );
    // }
    //
   
    /*
     * --------------------------------------------------
     * SEND OTP EMAIL
     * --------------------------------------------------
     */
    const fetchedToken = alreadyemail.tokenDetails;

console.log("OLD TOKEN DETAILS:", fetchedToken);

    
      alreadyemail.tokenDetails.tempOtp = otp;
      alreadyemail.tokenDetails.otpExpiresAt = otpExpiresAt;
      alreadyemail.tokenDetails.updatedAt = new Date();

      alreadyemail.markModified("tokenDetails");

  // 3. Save the changes permanently back to MongoDB
  await alreadyemail.save();

    await sendOtpEmail(normalizedEmail, otp);

    console.log("OTP EMAIL SENT:", normalizedEmail);

    const response =  NextResponse.json({
      success: true,
      message: "OTP sent successfully",
    });

   

  return response;

    
  } catch (error) {
    console.error("SEND OTP ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send OTP",
      },
      { status: 500 }
    );
  }
}

// // app/api/auth/login/route.js
// import { NextResponse } from 'next/server';
// import connectDB from '@/lib/db';
// import User from '@/models/user';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import dbToken from '../../../../models/tokens.js';



// export async function POST(request) {



//   try {
//     await connectDB();
//     const data = await request.json();
//     const { enrollmentNo, password,email } = data.current;
//     console.log(enrollmentNo,password,email);
   

    

//     if (!enrollmentNo || !password) {
//       return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
//     }
//     console.log("enrollmentNo check kia");

//     // 1. Find user and verify password
//     const user = await User.findOne({ enrollmentNo: enrollmentNo });
//       console.log("user check kia");
//     if (!user) {
//       console.log("user check kr liya")
//       return NextResponse.json({ error: 'Invalid credentials, User not found in database' }, { status: 401 });
      
//     }

   
//     console.log("password pr aaya ");
//     const isPasswordMatch = await bcrypt.compare(password, user.password);
//     if (!isPasswordMatch) {
//       return NextResponse.json({ error: 'password not correct' }, { status: 401 });
//     }
//     console.log("password check kia");

//     console.log(user);

//     const checktoken = await dbToken.findOne({
//            useId : user._id
//         });

//         console.log(checktoken);

        
//               const token2 = jwt.sign(
//                   { userId: user._id ,
//                   name : user.name,
//                   insertedData1:true} ,// Data encoded inside the token
//                   process.env.JWT_SECRET,                  // Secret key
//                   { expiresIn: '11d' }                      // Token lifespan (e.g., 7 days)
//                 );
        
            
        


//     // 2. Generate the JWT Token payload
//     const token = jwt.sign(
//       { userId: user._id ,
//       name : user.name,
//       loggedIn:true} ,// Data encoded inside the token
//       process.env.JWT_SECRET,                  // Secret key
//       { expiresIn: '11d' }                      // Token lifespan (e.g., 7 days)
//     );

    

   
//     // 3. Create the response object
//     const response = NextResponse.json(
//       { message: 'Login successful', user: { id: user._id, name: user.name , profilecompleted: checktoken?.setUpprofile } },
//       { status: 200 },
//     );

//     // 4. Securely set the JWT inside an HttpOnly Cookie
//     response.cookies.set({
//       name: 'auth_token',
//       value:token, // Store user info + token
//       httpOnly: true,                         // Prevents frontend JavaScript from stealing the token
//       secure: process.env.NODE_ENV === 'production', // Requires HTTPS in production
//       sameSite: 'strict',                     // Protection against CSRF attacks
//       maxAge: 60 * 60 * 24 * 11,               // 7 days in seconds
//       path: '/',
//     });

//      response.cookies.set({
//               name: 'profile3token',
//               value:token2, // Store user info + token
//               httpOnly: true,                         // Prevents frontend JavaScript from stealing the token
//               secure: process.env.NODE_ENV === 'production', // Requires HTTPS in production
//               sameSite: 'strict',                     // Protection against CSRF attacks
//               maxAge: 60 * 60 * 24 * 11,               // 7 days in seconds
//               path: '/',
//             });


//     return response;

//   } catch (error) {
//     console.error('Login Error:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// };
