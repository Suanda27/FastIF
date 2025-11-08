import { NextRequest, NextResponse } from "next/server";

const protectedPaths = ["/admin", "/mahasiswa"];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  console.log("🔍 Middleware jalan di:", req.nextUrl.pathname);


  async function checkSession() {
    try {
      const res = await fetch(`${req.nextUrl.origin}/api/check-session`, {
        headers: {
          cookie: req.headers.get("cookie") || "",
        },
      });

      if (!res.ok) return null;
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Middleware fetch error:", err);
      return null;
    }
  }

  // 1️⃣ Kalau sedang di /login
  if (path === "/login") {
    const session = await checkSession();
    if (session?.user) {
      const redirectUrl =
        session.user.role === "admin"
          ? "/admin/dashboard"
          : "/mahasiswa/DashboardMhs";
      return NextResponse.redirect(new URL(redirectUrl, req.url));
    }
    return NextResponse.next();
  }

  // 2️⃣ Kalau halaman butuh login
  const isProtected = protectedPaths.some((p) => path.startsWith(p));
  if (isProtected) {
    const session = await checkSession();
    if (!session?.user) {
      // Belum login → arahkan ke /login
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/admin/:path*", "/mahasiswa/:path*"],
};
