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

