-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 26, 2025 at 08:29 AM
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
  `nama_orangtua` varchar(100) DEFAULT NULL,
  `nohp_orangtua` varchar(20) DEFAULT NULL,
  `kelas_perkuliahan` varchar(20) DEFAULT NULL,
  `nama_dosen_wali` varchar(100) DEFAULT NULL,
  `jenis_perizinan` varchar(50) DEFAULT NULL,
  `tanggal_mulai` date DEFAULT NULL,
  `tanggal_selesai` date DEFAULT NULL,
  `file_chat_dosen_wali` varchar(255) DEFAULT NULL,
  `file_chat_dosen_pengajar` varchar(255) DEFAULT NULL,
  `file_pendukung` varchar(255) DEFAULT NULL,
  `file_surat` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `form_surat_izin`
--

INSERT INTO `form_surat_izin` (`id_form_izin`, `id_surat`, `nama_orangtua`, `nohp_orangtua`, `kelas_perkuliahan`, `nama_dosen_wali`, `jenis_perizinan`, `tanggal_mulai`, `tanggal_selesai`, `file_chat_dosen_wali`, `file_chat_dosen_pengajar`, `file_pendukung`, `file_surat`, `created_at`) VALUES
(15, 42, 'Zam Zami', '082391189882', 'RPL', 'Dwi Eli', 'Izin Shift Kerja', '2025-12-08', '2025-12-09', '1764985389307-Foto.jpg', '1764985389308-KK.jpg', '1764985389321-KK.jpg', '1764985389281-CV_dan_Permohonan_Lamaran_Kerja_.pdf', '2025-12-06 08:43:09'),
(16, 49, 'tes', 'tes', 'tes', 'tes', 'Izin Sakit', '2025-12-01', '2025-12-16', '1765884143579-BPJS_Ketenagakerjaan.jpg', '1765884143582-KK.jpg', '1765884143584-CV_dan_Permohonan_Lamaran_Kerja_.pdf', '1765884143560-CV_dan_Permohonan_Lamaran_Kerja_.pdf', '2025-12-16 18:22:23'),
(17, 54, 'tes', 'tes', 'tes', 'tes', 'Izin Keperluan Keluarga', '2025-12-18', '2025-12-18', '1766043673058-Ijazah_page-0001.jpg', '1766043673063-Ijazah_page-0001.jpg', '1766043673067-ERD_UML_(1).jpg', '1766043673035-Tranksrip_Nilai_page-0001.jpg', '2025-12-18 14:41:13'),
(18, 55, 'tes', 'tes', 'tes', 'tes', 'Izin Sakit', '2026-01-06', '2025-12-27', '1766044062320-Use_Case.jpg', '1766044062321-ERD_UML_(1).jpg', '1766044062322-Use_Case_(1).jpg', '1766044062319-ERD_UML_(1).jpg', '2025-12-18 14:47:42'),
(19, 56, 'tes', 'tes', 'tes', 'tes', 'Izin Shift Kerja', '2025-12-30', '2026-01-08', '1766044311654-Use_Case.jpg', '1766044311655-Use_Case_(3).jpg', '1766044311655-ERD_UML_(1).jpg', '1766044311652-Use_Case.jpg', '2025-12-18 14:51:51');

-- --------------------------------------------------------

--
-- Table structure for table `pengajuan_surat`
--

CREATE TABLE `pengajuan_surat` (
  `id_pengajuan` int(11) NOT NULL,
  `id_surat` int(11) DEFAULT NULL,
  `keperluan` text DEFAULT NULL,
  `file_surat` varchar(255) DEFAULT NULL,
  `instansi_tujuan` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pengajuan_surat`
--

INSERT INTO `pengajuan_surat` (`id_pengajuan`, `id_surat`, `keperluan`, `file_surat`, `instansi_tujuan`, `created_at`) VALUES
(10, 43, 'Untuk Magang', '1764985433497-Surat_Pengalaman_M_Ilham_TAP.pdf', NULL, '2025-12-06 08:43:53'),
(11, 44, 'tes', '1765295222060-KK.pdf', NULL, '2025-12-09 22:47:02'),
(12, 45, 'tes', '1765295423882-KTP.pdf', NULL, '2025-12-09 22:50:23'),
(13, 46, 'tes', '1765295441272-SKCK.docx', NULL, '2025-12-09 22:50:41'),
(14, 47, 'tes', '1765738181401-KTP.pdf', NULL, '2025-12-15 01:49:41'),
(15, 48, 'tes', '1765738192372-KTP.pdf', NULL, '2025-12-15 01:49:52'),
(16, 50, 'tes1', '1765971393673-CV.docx', NULL, '2025-12-17 18:36:33'),
(17, 51, 'tes', '1765975419569-CV.docx', NULL, '2025-12-17 19:43:39'),
(18, 52, 'ini keperluan', '1766025852265-Ijazah.pdf', NULL, '2025-12-18 09:44:12'),
(19, 53, 'ini keperluan1', '1766028391001-skck.pdf', 'ini instasi tujuan', '2025-12-18 10:26:31'),
(20, 57, 'tes', '1766044325665-CamScanner_29-11-2025_05.31.pdf', 'tes', '2025-12-18 14:52:05'),
(21, 58, 'tes', '1766045949620-cv_(1).pdf', 'tes', '2025-12-18 15:19:09'),
(22, 59, 'tes', '1766054719148-1765296205901-CV_dan_Permohonan_Lamaran_Kerja_.docx', 'tes', '2025-12-18 17:45:19'),
(23, 60, 'tes', '1766054768640-1765296205901-CV_dan_Permohonan_Lamaran_Kerja_.docx', 'tes', '2025-12-18 17:46:08'),
(24, 61, 'tes tanggal', '1766391537842-Ijazah.pdf', 'tes tanggal', '2025-12-22 15:18:57'),
(25, 62, 'tes tanggal survey', '1766391587427-Ijazah.pdf', 'tes tanggal survey', '2025-12-22 15:19:47');

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
  `created_at` datetime DEFAULT current_timestamp(),
  `keperluan` text DEFAULT NULL,
  `file_surat` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `surat`
--

INSERT INTO `surat` (`id_surat`, `id_user`, `id_template`, `jenis_surat`, `tanggal_pengajuan`, `status`, `keterangan`, `created_at`, `keperluan`, `file_surat`) VALUES
(42, 4, 13, 'Surat Izin Kehadiran', '2025-12-06 08:43:09', 'ditolak', NULL, '2025-12-06 08:43:09', 'Izin Shift Kerja', '1764985389281-CV_dan_Permohonan_Lamaran_Kerja_.pdf'),
(43, 1, 12, 'Surat Survey', '2025-12-06 08:43:53', 'diterima', NULL, '2025-12-06 08:43:53', 'Untuk Magang', '1764985433497-Surat_Pengalaman_M_Ilham_TAP.pdf'),
(44, 4, 12, 'Surat Survey', '2025-12-09 22:47:02', 'diterima', NULL, '2025-12-09 22:47:02', 'tes', '1765295222060-KK.pdf'),
(45, 4, 12, 'Surat Survey', '2025-12-09 22:50:23', 'diterima', NULL, '2025-12-09 22:50:23', 'tes', '1765295423882-KTP.pdf'),
(46, 4, 12, 'Surat Survey', '2025-12-09 22:50:41', 'diterima', NULL, '2025-12-09 22:50:41', 'tes', '1765295441272-SKCK.docx'),
(47, 4, 12, 'Surat Survey', '2025-12-15 01:49:41', 'ditolak', NULL, '2025-12-15 01:49:41', 'tes', '1765738181401-KTP.pdf'),
(48, 4, 12, 'Surat Survey', '2025-12-15 01:49:52', 'diterima', NULL, '2025-12-15 01:49:52', 'tes', '1765738192372-KTP.pdf'),
(49, 6, 13, 'Surat Izin Kehadiran', '2025-12-16 18:22:23', 'ditolak', NULL, '2025-12-16 18:22:23', 'Izin Sakit', '1765884143560-CV_dan_Permohonan_Lamaran_Kerja_.pdf'),
(50, 4, 12, 'Surat Survey', '2025-12-17 18:36:33', 'diterima', NULL, '2025-12-17 18:36:33', 'tes1', '1765971393673-CV.docx'),
(51, 4, 12, 'Surat Survey', '2025-12-17 19:43:39', 'diterima', NULL, '2025-12-17 19:43:39', 'tes', '1765975419569-CV.docx'),
(52, 4, 12, 'Surat Survey', '2025-12-18 09:44:12', 'ditolak', 'tes tolak', '2025-12-18 09:44:12', 'ini keperluan', '1766025852265-Ijazah.pdf'),
(53, 4, 12, 'Surat Survey', '2025-12-18 10:26:31', 'diterima', 'tes acc\n', '2025-12-18 10:26:31', 'ini keperluan1', '1766028391001-skck.pdf'),
(54, 4, 13, 'Surat Izin Kehadiran', '2025-12-18 14:41:13', 'diterima', 'tes acc lagi', '2025-12-18 14:41:13', 'Izin Keperluan Keluarga', '1766043673035-Tranksrip_Nilai_page-0001.jpg'),
(55, 4, 13, 'Surat Izin Kehadiran', '2025-12-18 14:47:42', 'diproses', NULL, '2025-12-18 14:47:42', 'Izin Sakit', '1766044062319-ERD_UML_(1).jpg'),
(56, 4, 13, 'Surat Izin Kehadiran', '2025-12-18 14:51:51', 'diproses', NULL, '2025-12-18 14:51:51', 'Izin Shift Kerja', '1766044311652-Use_Case.jpg'),
(57, 4, 12, 'Surat Survey', '2025-12-18 14:52:05', 'diproses', NULL, '2025-12-18 14:52:05', 'tes', '1766044325665-CamScanner_29-11-2025_05.31.pdf'),
(58, 4, 12, 'Surat Survey', '2025-12-18 15:19:09', 'diproses', NULL, '2025-12-18 15:19:09', 'tes', '1766045949620-cv_(1).pdf'),
(59, 4, 12, 'Surat Survey', '2025-12-18 17:45:19', 'diproses', NULL, '2025-12-18 17:45:19', 'tes', '1766054719148-1765296205901-CV_dan_Permohonan_Lamaran_Kerja_.docx'),
(60, 6, 12, 'Surat Survey', '2025-12-18 17:46:08', 'diproses', NULL, '2025-12-18 17:46:08', 'tes', '1766054768640-1765296205901-CV_dan_Permohonan_Lamaran_Kerja_.docx'),
(61, 4, 12, 'Surat Survey', '2025-12-22 15:18:57', 'diproses', NULL, '2025-12-22 15:18:57', 'tes tanggal', '1766391537842-Ijazah.pdf'),
(62, 4, 12, 'Surat Survey', '2025-12-22 15:19:47', 'diproses', NULL, '2025-12-22 15:19:47', 'tes tanggal survey', '1766391587427-Ijazah.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `template_surat`
--

CREATE TABLE `template_surat` (
  `id_template` int(11) NOT NULL,
  `nama_template` varchar(100) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `file_template` varchar(255) DEFAULT NULL,
  `file_contoh` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `template_surat`
--

INSERT INTO `template_surat` (`id_template`, `nama_template`, `deskripsi`, `file_template`, `file_contoh`) VALUES
(12, 'Surat Survei', NULL, '1765296271877-CV_dan_Permohonan_Lamaran_Kerja_.docx', '1765296205901-CV_dan_Permohonan_Lamaran_Kerja_.docx'),
(13, 'Izin Perkuliahan', NULL, '1765296287792-CV_dan_Permohonan_Lamaran_Kerja_.docx', '1765296277717-CV_dan_Permohonan_Lamaran_Kerja_.docx'),
(15, 'Surat Izin Magang', NULL, NULL, '1765296294279-CV_dan_Permohonan_Lamaran_Kerja_.docx'),
(16, 'Surat Pengantar', NULL, NULL, '1765296301943-CV_dan_Permohonan_Lamaran_Kerja_.docx');

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
  `jurusan` varchar(100) DEFAULT 'Teknik Informatika',
  `prodi` varchar(100) DEFAULT NULL,
  `nip` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `nama`, `email`, `password`, `role`, `nim`, `jurusan`, `prodi`, `nip`) VALUES
(1, 'Budi Santoso', 'budi@student.ac.id', '$2b$10$LbODiWgRT0t2yadrRHqOGuks3HT16Ru/Horjbib0MxInCJd69uqL2', 'mahasiswa', '20221001', 'Rekayasa Perangkat Lunak', NULL, NULL),
(2, 'Dewi Kartika', 'dewi@student.ac.id', '$2b$10$2kiVCjmcrtUxjsudayRUdO1OuTp34pdk0iCvVfGI2Kg2.zKba4fN6', 'mahasiswa', '20221002', 'Sistem Informasi', NULL, NULL),
(3, 'Rizky Pratama', 'rizky@student.ac.id', '$2b$10$onZzkckog.AMc1WL9eAcT.uvVkhTNmlNnFtqMeQIRr7fCklMQrAme', 'mahasiswa', '20221003', 'Informatika', NULL, NULL),
(4, 'Mahasiswa', 'doni@student.ac.id', '$2b$10$Y.KARyX1kQ6LNMV.HHCT4eaQD9GyvLZUJvTXs48zwkWqEUffhUi8m', 'mahasiswa', '20221004', 'Terapan Teknologi Permainan', NULL, NULL),
(5, 'admin', 'admin@kampus.ac.id', '$2b$10$kquTtnU36yy0Yo27X2Zi4eLC6rDv2pvWElobK7Yrq56Wm3UY4FaKm', 'admin', NULL, NULL, NULL, '19870001'),
(6, 'putra', 'putra@gmail.com', '$2b$10$lOPJPLHtVhwklfETyj6fWuDr1avBH9OrWkGk3VeDf4Xw.EjwVnBUi', 'mahasiswa', '3312411002', 'Informatika', NULL, NULL),
(7, 'Martin', 'martin@gmail.com', '$2b$10$C05eRDpKBQfyCa.pJ6TnfOCmZkTFt8Ze1Cebd8nn6uAbyPWrZtYLW', 'mahasiswa', '3312411001', 'Teknik Informatika', 'Terapan Teknologi Rekayasa Multimedia', NULL),
(8, 'Rizki', 'rizki@gmail.com', '$2b$10$RuGDf9mARwyRYWyWujPvo.gmM.QgT.Zbncegozu.hnlvF8jXvc4..', 'mahasiswa', '33124110012', 'Teknik Informatika', 'Terapan Rekayasa Keamanan Siber', NULL);

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
(11, 43, 5, '2025-12-08 20:29:23', 'ACC', 'diterima'),
(12, 42, 5, '2025-12-15 00:06:10', NULL, 'ditolak'),
(13, 45, 5, '2025-12-15 00:06:12', NULL, 'diterima'),
(14, 46, 5, '2025-12-15 00:30:52', NULL, 'diterima'),
(15, 44, 5, '2025-12-15 00:54:02', NULL, 'diterima'),
(16, 48, 5, '2025-12-15 01:50:15', NULL, 'diterima'),
(17, 47, 5, '2025-12-15 01:56:22', NULL, 'ditolak'),
(18, 51, 5, '2025-12-17 19:50:52', 'acc1', 'diterima'),
(19, 50, 5, '2025-12-17 19:50:56', 'acc2', 'diterima'),
(20, 49, 5, '2025-12-17 19:51:01', 'tolak1', 'ditolak'),
(21, 53, 5, '2025-12-18 10:51:44', 'tes acc\n', 'diterima'),
(22, 54, 5, '2025-12-18 14:41:37', 'tes acc lagi', 'diterima'),
(23, 52, 5, '2025-12-18 14:41:43', 'tes tolak', 'ditolak');

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
  MODIFY `id_form_izin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `pengajuan_surat`
--
ALTER TABLE `pengajuan_surat`
  MODIFY `id_pengajuan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `surat`
--
ALTER TABLE `surat`
  MODIFY `id_surat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `template_surat`
--
ALTER TABLE `template_surat`
  MODIFY `id_template` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `verifikasi`
--
ALTER TABLE `verifikasi`
  MODIFY `id_verifikasi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

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
