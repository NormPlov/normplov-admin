import { serialize } from "cookie";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Handle login
export async function POST(req: NextRequest) {
    // Parse the request body to get the email and password
    const body = await req.json();
    const { email, password } = body;

    console.log("Email: ", email);
    console.log("Password: ", password);

    // Make a POST request to the API
    const response = await fetch(
        `https://normplov-api.shinoshike.studio/api/v1/auth/login`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        }
    );

    // Parse the response once
    const data = await response.json();
    console.log("Data from API: ", data);

    // If the request fails, return an error message to the client-side
    if (!response.ok) {
        return NextResponse.json(
            {
                message: "Failed to login",
                error: data.message || "An unknown error occurred",
            },
            {
                status: response.status,
            }
        );
    }

    // Extract roles and ensure the user has the "ADMIN" role
    const roles = data?.payload?.roles || [];
    if (!roles.includes("ADMIN")) {
        return NextResponse.json(
            {
                message: "Unauthorized: Admin access only.",
            },
            {
                status: 403,
            }
        );
    }

    // Extract tokens and other payload data
    // const accessToken = data?.payload?.access_token || null;
    const refreshToken = data?.payload?.refresh_token || null;

    // Serialize the refresh token and set it as a cookie
    const cookieName = process.env.COOKIE_REFRESH_TOKEN || "refresh";
    const serialized = serialize(cookieName, refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Only set secure cookies in production
        path: "/",
        sameSite: "lax", // "strict" or "none" can also be used depending on your needs
    });

    // Return the access token and user data to the client-side
    // with the serialized refresh token as a cookie
    return NextResponse.json(
        {
            accessToken: data?.payload?.access_token,
            payload: data?.payload,
        },
        {
            status: response.status,
            headers: {
                "Set-Cookie": serialized,
            },
        }
    );
}
