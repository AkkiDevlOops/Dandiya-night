import  {cookies}  from "next/headers";
import likes from "../../../models/like";
import { NextResponse } from "next/server";
import connectDB from "../../../lib/db";
import { jwtVerify } from "jose";

export async function POST(request) {
    try {
        connectDB();
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;

       if(!token){
        return NextResponse.json({ error: 'Session cookie missing. Please log in.' }, { status: 401 });
       }

       const secret = new TextEncoder().encode(process.env.JWT_SECRET);

       const {payload} = await jwtVerify(token,secret);
    
     const meranaam = payload.userId;

    //  console.log(meranaam);
     const likedData = await likes.findOne({ whoLiked: meranaam });

    

    // console.log(newlikedData)
    return NextResponse.json({message: "fetching success"},
        {status:200},
            {data: likedData}
    );

    } catch (error) {
        console.log(error);
    }
    
}