// app/api/auth/me/route.js
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const cookieStore = await cookies();
    // 1. Grab the token from your secure cookie
    const token = cookieStore.get("auth_token");
    // console.log(token.value);
    // const data = token.json();
    // const value = data.value;

    if (!token) {
      return NextResponse.json(
        { authenticated: false, message: 'No session token found' }, 
        { status: 401 }
      );
    }

    // 2. Add your token verification logic here (e.g., jwt.verify or jose decrypt)
    // For this example, we assume the token is valid:
    const userData = { id: "123", name: "Alex", email: "alex@example.com" };

    // 3. Return the user data to the frontend
    // return NextResponse.json({ authenticated: true, user: token.value });
     return NextResponse.json(token?.value );

  } catch (error) {
    return NextResponse.json(
      { authenticated: false, message: 'Invalid or expired token' }, 
      { status: 401 }
    );
  }
}
