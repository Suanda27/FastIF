export type Status = "Diterima" | "Ditangguhkan" | "Diproses";

export type SuratRow = {
  id: string;
  nama: string;
  nim: string;
  jurusan: string;
  jenis: string;
  status: Status;
  keterangan?: string;
  files?: string[];
};

export const DUMMY: SuratRow[] = [
  {
    id: "1",
    nama: "Muhammad Ilham Tri Adi Putra",
    nim: "3312411018",
    jurusan: "Teknik Informatika",
    jenis: "Surat Pengantar",
    status: "Diterima",
    keterangan: "Surat pengantar untuk magang di PT. Batam Tech.",
    files: ["SuratPengantar.pdf"],
  },
  {
    id: "2",
    nama: "Muhammad Ilham Tri Adi Putra",
    nim: "3312411018",
    jurusan: "Teknik Informatika",
    jenis: "Surat Pengantar",
    status: "Ditangguhkan",
    keterangan: "Revisi tanda tangan dan tanggal.",
    files: ["SuratPengantar_Revisi.pdf"],
  },
  {
    id: "3",
    nama: "Muhammad Ilham Tri Adi Putra",
    nim: "3312411018",
    jurusan: "Teknik Informatika",
    jenis: "Surat Pengantar",
    status: "Diproses",
    keterangan: "Menunggu verifikasi dari dosen pembimbing.",
    files: ["SuratPengantar_V2.pdf"],
  },
];
