import { NextRequest, NextResponse } from "next/server";

const protectedPaths = ["/admin", "/mahasiswa"];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  console.log("🔍 Middleware jalan di:", req.nextUrl.pathname);

  async function checkSession() {
    try {
      const res = await fetch(`${req.nextUrl.origin}/api/check-session`, {
        headers: { cookie: req.headers.get("cookie") || "" },
        cache: "no-store", // ✅ jangan cache session lama
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data;
    } catch {
      return null;
    }
  }

  const session = await checkSession();

  // 🔹 Kalau buka /login tapi sudah login → arahkan ke dashboard sesuai role
  if (path === "/login") {
    if (session?.user) {
      const redirectUrl =
        session.user.role === "admin"
          ? "/admin/dashboard"
          : "/mahasiswa/DashboardMhs";
      return NextResponse.redirect(new URL(redirectUrl, req.url));
    }
    return NextResponse.next();
  }

  // 🔹 Kalau belum login dan mau akses /admin atau /mahasiswa → arahkan ke login
  const isProtected = protectedPaths.some((p) => path.startsWith(p));
  if (isProtected && !session?.user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/admin/:path*", "/mahasiswa/:path*"],
};
