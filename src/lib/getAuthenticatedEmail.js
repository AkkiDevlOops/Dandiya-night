import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function getAuthenticatedEmail() {
  try {
    const cookieStore = await cookies();

    const token =
      cookieStore.get("session")?.value;

    if (!token) {
      return null;
    }

    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET
    );

    const { payload } = await jwtVerify(
      token,
      secret
    );

    return payload.email?.toLowerCase() || null;
  } catch (error) {
    console.error(
      "AUTH ERROR:",
      error
    );

    return null;
  }
}