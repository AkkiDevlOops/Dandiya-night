import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose'; 


// 1. The Middleware Function
export async function POST(request) {
try {
    console.log("route reached");
   const cookieStore = await cookies()
   const token = cookieStore.get('profile1token')?.value;
   if (!token) {
    console.log("no token found")
    return Response.json(false);
  }
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    // 3. Verify and decode the token payload
    const { payload } = await jwtVerify(token, secret);

    // payload contains all the original data you signed it with!
    console.log('Decoded Token Data:', payload);
  // Use your token (e.g., verify JWT)
  return NextResponse.json(payload.insertedData1);
} catch (error) {
  console.log(error);
  return NextResponse.json({error:"an error occured"});
}
  };

