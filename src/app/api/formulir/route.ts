// app/api/formulir/route.ts
import { NextResponse } from "next/server";

const BACKEND_URL = "http://localhost:8001/api/formulir";

// ✅ Ambil data formulir dari backend Express
export async function GET() {
  try {
    const res = await fetch(BACKEND_URL);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data" },
      { status: 500 }
    );
  }
}

// ✅ Upload file (POST)
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const res = await fetch(BACKEND_URL, {
      method: "POST",
      body: formData, // kirim langsung ke backend Express
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal upload file" },
      { status: 500 }
    );
  }
}


// ✅ Hapus file (DELETE)
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const res = await fetch(BACKEND_URL, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal menghapus file" },
      { status: 500 }
    );
  }
}
