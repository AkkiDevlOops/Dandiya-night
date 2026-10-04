// app/login/page.js
"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginPage() {
  // Pull the real-time login state of the user
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading authentication state...</p>;
  }

  if (session) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Welcome, {session.user.name}!</h1>
        <p>Logged in as: {session.user.email}</p>
        <img src={session.user.image} alt="Profile" style={{ borderRadius: "50%", width: "50px" }} />
        <br /><br />
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center" }}>
      <button 
        onClick={() => signIn("google")} 
        style={{ padding: "10px 20px", background: "#4285F4", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
      >
        Sign in with Google
      </button>
    </div>
  );
}
