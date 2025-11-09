import { NextResponse } from "next/server";

// contoh data dummy
const dummyData = {
  pengajuan: 3,
  verifikasi: 1,
  selesai: 2,
  dataSurat: [
    {
      nama: "Muhammad Faiz Difa Suanda",
      nim: "3312411018",
      jurusan: "Teknik Informatika",
      jenis: "Surat Beasiswa",
      status: "Diproses",
    },
    {
      nama: "Muhammad Faiz Difa Suanda",
      nim: "3312411018",
      jurusan: "Teknik Informatika",
      jenis: "Surat Aktif Kuliah",
      status: "Diterima",
    },
    {
      nama: "Muhammad Faiz Difa Suanda",
      nim: "3312411018",
      jurusan: "Teknik Informatika",
      jenis: "Surat Rekomendasi",
      status: "Ditangguhkan",
    },
  ],
};

// handle GET request dari frontend
export async function GET() {
  try {
    return NextResponse.json(dummyData, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}
