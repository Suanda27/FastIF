export type Status = "diproses" | "diterima" | "ditolak" | "Diproses" | "Diterima" | "Ditolak";

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
    status: "Diproses",
    keterangan: "Surat pengantar untuk praktikum industri.",
    files: ["SuratPengantar.pdf", "Lampiran.pdf"],
  },
  {
    id: "2",
    nama: "Siti Aisyah",
    nim: "3312412020",
    jurusan: "Teknik Informatika",
    jenis: "Surat Survey",
    status: "Diproses",
    keterangan:
      "Permohonan survey ke PT. Logistik Cepat Indonesia untuk data lapangan.",
    files: ["SuratSurvey.docx"],
  },
  {
    id: "3",
    nama: "Rudi Hartono",
    nim: "3312413011",
    jurusan: "Teknik Informatika",
    jenis: "Surat Izin Kehadiran",
    status: "Diproses",
    keterangan: "Izin tidak hadir karena acara keluarga.",
    files: ["SuratIzin.pdf", "BuktiDokumen.pdf"],
  },
];
