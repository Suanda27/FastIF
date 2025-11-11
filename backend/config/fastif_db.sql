-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 10, 2025 at 05:27 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fastif_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `form_surat_izin`
--

CREATE TABLE `form_surat_izin` (
  `id_form_izin` int(11) NOT NULL,
  `id_surat` int(11) DEFAULT NULL,
  `nama_nohp_orangtua` varchar(20) DEFAULT NULL,
  `kelas_perkuliahan` varchar(20) DEFAULT NULL,
  `jenis_perizinan` varchar(50) DEFAULT NULL,
  `tanggal_mulai` date DEFAULT NULL,
  `tanggal_selesai` date DEFAULT NULL,
  `file_chat_dosen_wali` varchar(255) DEFAULT NULL,
  `file_chat_dosen_pengajar` varchar(255) DEFAULT NULL,
  `file_pendukung` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `form_surat_izin`
--

INSERT INTO `form_surat_izin` (`id_form_izin`, `id_surat`, `nama_nohp_orangtua`, `kelas_perkuliahan`, `jenis_perizinan`, `tanggal_mulai`, `tanggal_selesai`, `file_chat_dosen_wali`, `file_chat_dosen_pengajar`, `file_pendukung`, `created_at`) VALUES
(1, 1, '081234567890', 'IF-7A', 'Izin Kegiatan', '2025-11-12', '2025-11-13', 'chat_wali.jpg', 'chat_pengajar.jpg', 'poster_event.jpg', '2025-11-10 15:35:42'),
(2, 2, '081298765432', 'IF-7B', 'Izin Sakit', '2025-11-10', '2025-11-11', 'chat_wali_sakit.jpg', 'chat_pengajar_sakit.jpg', 'surat_dokter.pdf', '2025-11-10 15:35:42');

-- --------------------------------------------------------

--
-- Table structure for table `pengajuan_surat`
--

CREATE TABLE `pengajuan_surat` (
  `id_pengajuan` int(11) NOT NULL,
  `id_surat` int(11) DEFAULT NULL,
  `keperluan` text DEFAULT NULL,
  `file_surat` varchar(255) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pengajuan_surat`
--

INSERT INTO `pengajuan_surat` (`id_pengajuan`, `id_surat`, `keperluan`, `file_surat`, `deskripsi`, `created_at`) VALUES
(1, 1, 'Mengikuti lomba tingkat nasional', 'surat_kegiatan.pdf', 'Perlu surat izin kegiatan kampus', '2025-11-10 15:35:42'),
(2, 2, 'Sakit flu berat', 'izin_sakit.pdf', 'Tidak dapat hadir kelas selama 2 hari', '2025-11-10 15:35:42'),
(3, 3, 'Kegiatan magang perusahaan', 'pengajuan_magang.pdf', 'Diajukan untuk surat pengantar magang', '2025-11-10 15:35:42'),
(4, 1, 'Mengikuti lomba tingkat nasional', 'surat_kegiatan.pdf', 'Perlu surat izin kegiatan kampus', '2025-11-10 15:35:42'),
(5, 2, 'Sakit flu berat', 'izin_sakit.pdf', 'Tidak dapat hadir kelas selama 2 hari', '2025-11-10 15:35:42'),
(6, 3, 'Kegiatan magang perusahaan', 'pengajuan_magang.pdf', 'Diajukan untuk surat pengantar magang', '2025-11-10 15:35:42');

-- --------------------------------------------------------

--
-- Table structure for table `surat`
--

CREATE TABLE `surat` (
  `id_surat` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_template` int(11) DEFAULT NULL,
  `jenis_surat` varchar(50) DEFAULT NULL,
  `tanggal_pengajuan` datetime DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `keterangan` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `surat`
--

INSERT INTO `surat` (`id_surat`, `id_user`, `id_template`, `jenis_surat`, `tanggal_pengajuan`, `status`, `keterangan`, `created_at`) VALUES
(1, 1, 1, 'izin kegiatan', '2025-11-10 10:00:00', 'diproses', 'Menunggu verifikasi admin', '2025-11-10 15:35:42'),
(2, 2, 2, 'izin tidak hadir', '2025-11-10 09:30:00', 'ditolak', 'Berkas tidak lengkap', '2025-11-10 15:35:42'),
(3, 3, 3, 'magang', '2025-11-09 14:21:00', 'diterima', 'Verified by admin', '2025-11-10 15:35:42');

-- --------------------------------------------------------

--
-- Table structure for table `template_surat`
--

CREATE TABLE `template_surat` (
  `id_template` int(11) NOT NULL,
  `nama_template` varchar(100) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `file_template` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `template_surat`
--

INSERT INTO `template_surat` (`id_template`, `nama_template`, `deskripsi`, `file_template`) VALUES
(1, 'Surat Izin Kegiatan', 'Template untuk izin kegiatan luar kampus', 'izin_kegiatan.docx'),
(2, 'Surat Izin Tidak Hadir Kelas', 'Template izin tidak masuk kuliah', 'izin_tidak_hadir.docx'),
(3, 'Surat Magang', 'Permohonan kegiatan magang', 'surat_magang.docx');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `nama` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('mahasiswa','admin') DEFAULT 'mahasiswa',
  `nim` varchar(20) DEFAULT NULL,
  `jurusan` varchar(100) DEFAULT NULL,
  `nip` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `nama`, `email`, `password`, `role`, `nim`, `jurusan`, `nip`) VALUES
(1, 'Budi Santoso', 'budi@student.ac.id', 'budi123', 'mahasiswa', '20221001', 'Rekayasa Perangkat Lunak', NULL),
(2, 'Dewi Kartika', 'dewi@student.ac.id', 'dewi123', 'mahasiswa', '20221002', 'Sistem Informasi', NULL),
(3, 'Rizky Pratama', 'rizky@student.ac.id', 'rizki123', 'mahasiswa', '20221003', 'Informatika', NULL),
(4, 'Doni Saputra', 'doni@student.ac.id', 'doni123', 'mahasiswa', '20221004', 'Terapan Teknologi Permainan', NULL),
(5, 'admin', 'admin@kampus.ac.id', 'admin123', 'admin', NULL, NULL, '19870001');

-- --------------------------------------------------------

--
-- Table structure for table `verifikasi`
--

CREATE TABLE `verifikasi` (
  `id_verifikasi` int(11) NOT NULL,
  `id_surat` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `tanggal_verifikasi` datetime DEFAULT NULL,
  `catatan` text DEFAULT NULL,
  `status_verifikasi` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `verifikasi`
--

INSERT INTO `verifikasi` (`id_verifikasi`, `id_surat`, `id_user`, `tanggal_verifikasi`, `catatan`, `status_verifikasi`) VALUES
(1, 1, 5, '2025-11-10 11:00:00', 'Sedang ditinjau', 'pending'),
(2, 2, 5, '2025-11-10 10:00:00', 'File kurang lengkap', 'ditolak'),
(3, 3, 5, '2025-11-09 15:00:00', 'Semua dokumen lengkap', 'diterima');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `form_surat_izin`
--
ALTER TABLE `form_surat_izin`
  ADD PRIMARY KEY (`id_form_izin`),
  ADD KEY `fk_form_surat` (`id_surat`);

--
-- Indexes for table `pengajuan_surat`
--
ALTER TABLE `pengajuan_surat`
  ADD PRIMARY KEY (`id_pengajuan`),
  ADD KEY `fk_pengajuan_surat` (`id_surat`);

--
-- Indexes for table `surat`
--
ALTER TABLE `surat`
  ADD PRIMARY KEY (`id_surat`),
  ADD KEY `fk_surat_user` (`id_user`),
  ADD KEY `fk_surat_template` (`id_template`);

--
-- Indexes for table `template_surat`
--
ALTER TABLE `template_surat`
  ADD PRIMARY KEY (`id_template`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `unique_nim` (`nim`),
  ADD UNIQUE KEY `unique_nip` (`nip`);

--
-- Indexes for table `verifikasi`
--
ALTER TABLE `verifikasi`
  ADD PRIMARY KEY (`id_verifikasi`),
  ADD KEY `fk_verif_surat` (`id_surat`),
  ADD KEY `fk_verif_user` (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `form_surat_izin`
--
ALTER TABLE `form_surat_izin`
  MODIFY `id_form_izin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pengajuan_surat`
--
ALTER TABLE `pengajuan_surat`
  MODIFY `id_pengajuan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `surat`
--
ALTER TABLE `surat`
  MODIFY `id_surat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `template_surat`
--
ALTER TABLE `template_surat`
  MODIFY `id_template` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `verifikasi`
--
ALTER TABLE `verifikasi`
  MODIFY `id_verifikasi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `form_surat_izin`
--
ALTER TABLE `form_surat_izin`
  ADD CONSTRAINT `fk_form_surat` FOREIGN KEY (`id_surat`) REFERENCES `surat` (`id_surat`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pengajuan_surat`
--
ALTER TABLE `pengajuan_surat`
  ADD CONSTRAINT `fk_pengajuan_surat` FOREIGN KEY (`id_surat`) REFERENCES `surat` (`id_surat`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `surat`
--
ALTER TABLE `surat`
  ADD CONSTRAINT `fk_surat_template` FOREIGN KEY (`id_template`) REFERENCES `template_surat` (`id_template`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_surat_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `verifikasi`
--
ALTER TABLE `verifikasi`
  ADD CONSTRAINT `fk_verif_surat` FOREIGN KEY (`id_surat`) REFERENCES `surat` (`id_surat`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_verif_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
