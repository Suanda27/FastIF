import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cookie = req.headers.get("cookie") || "";

    const res = await fetch("http://localhost:8001/api/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cookie,
      },
      credentials: "include",
    });

    if (!res.ok) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const data = await res.json();
    return NextResponse.json({ user: data.user });
  } catch (error) {
    console.error("Error check-session:", error);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
