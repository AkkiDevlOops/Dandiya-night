import  {cookies}  from "next/headers";
import likes from "../../../models/like";
import { NextResponse } from "next/server";
import connectDB from "../../../lib/db";

export async function POST(request) {
    try {
        connectDB();
        const cookieStore = await cookies();
        const userData = cookieStore.get("auth_token")
        console.log(userData);
        const auth = JSON.parse(userData.value);
        console.log(auth);
    
     const meranaam = auth._id;

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