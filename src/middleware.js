// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // 1. Fetch the cookie named 'auth_token' from the incoming browser request
  const tokenCookie = request.cookies.get('auth_token');
  const tokenValue = tokenCookie?.value;
 

  if(!tokenValue){
    console.log(`[Middleware] ouldnt find token and Blocked unauthorized `);
    
    // Redirect them to the login page immediately
    return NextResponse.redirect(new URL('/LoginRegister', request.url));
  }

   const authdata = JSON.parse(tokenValue);
  
  // 🪵 Add this test log:
  console.log("🚀 MIDDLEWARE IS RUNNING! Checking path:", request.nextUrl.pathname);

  // 1. Define all your protected routes in a simple list
const protectedRoutes = [
  '/completeProfile',
  '/profile',
  '/dashboard',
  '/settings',
  '/admin'
];


  // 2. Grab the current URL path the user is trying to visit
  const { pathname } = request.nextUrl;


// 2. Automatically check if the current pathname starts with any item in the list
const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));



  


  // 3. Define your protected page routes (Add any paths you want to lock down)


  // 4. 🔒 SECURITY GATE: If the page is protected and the cookie is missing
  if (isProtectedRoute && !tokenValue) {
    console.log(`[Middleware] Blocked unauthorized access to: ${pathname}`);
    
    // Redirect them to the login page immediately
    return NextResponse.redirect(new URL('/LoginRegister', request.url));
  }

  // 5. 🔀 REVERSE GATE (Optional but helpful): 
  // If they are already logged in, don't let them go back to the login page
  if (pathname === '/login' && tokenValue) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If the cookie is present and valid, allow the request to proceed to the page layout safely
  return NextResponse.next();
}

// 6. Config Matcher: Tells Next.js EXACTLY which pages this middleware gatekeeper should watch
export const config = {
  matcher: [
    '/dashboard/:path*', // Watches /dashboard and any sub-folders like /dashboard/settings
    '/profile/:path*',   // Watches /profile
    '/completeProfile'             // Watches /login
  ],
};
