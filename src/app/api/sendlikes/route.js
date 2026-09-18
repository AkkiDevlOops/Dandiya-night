import { cookies } from "next/headers";
import likes from "@/models/like";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";

export async function POST(request) {
    try {
        connectDB();
        const cookieStore = await cookies();
        const userData = cookieStore.get("auth_token")
        const auth = JSON.parse(userData?.value)
    const data = await request.json();
    const GotLiked = data.someoneGotLiked;
     const meranaam = auth._id;

     const likedData = await likes.findOne({ whoLiked: meranaam });
     
     if(likedData){
        console.log(likedData);
     
       const updatedliked = likedData.updateOne(
            {whoLiked:meranaam},
             { $push: {  likedWhom: GotLiked } }, // Adds 'developer' to the tags array
             { new: true } 
        );
        console.log(updatedliked);
        return;

        return NextResponse({message:"liked added success"},
            {status:200},
            {data: likedData}
        );
     }
    
     const newlikedData = await likes.create({
      whoLiked : meranaam,
     whoLikedname: auth.name,

    likedWhom: [GotLiked]
    });

    console.log(newlikedData)
    return NextResponse.json({message: "fetching success"},
        {status:200},
            {data: likedData}
    );

    } catch (error) {
        console.log(error);
    }
    
}