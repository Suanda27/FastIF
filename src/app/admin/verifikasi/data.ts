export type Status = "diproses" | "diterima" | "ditolak" | "Diproses" | "Diterima" | "Ditolak" | "Ditangguhkan";

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

