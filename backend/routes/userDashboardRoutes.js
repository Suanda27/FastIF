import express from "express";
import db from "../config/db.js";

const router = express.Router();

// Statistik Surat Mahasiswa
router.get('/stats/:id_user', (req, res) => {
    const userId = req.params.id_user;

    const query = `
        SELECT 
            SUM(CASE WHEN status = 'diproses' THEN 1 ELSE 0 END) AS diajukan,
            SUM(CASE WHEN status = 'diterima' THEN 1 ELSE 0 END) AS selesai,
            SUM(CASE WHEN status = 'ditolak' THEN 1 ELSE 0 END) AS ditolak
        FROM surat
        WHERE id_user = ?;
    `;

    db.query(query, [userId], (err, result) => {
        if (err) {
            console.error("❌ Error stats:", err);
            return res.status(500).json({
                success: false,
                message: "Gagal mengambil statistik surat"
            });
        }

        const data = result[0] || {};

        return res.json({
            success: true,
            data: {
                diajukan: data.diajukan || 0,
                selesai: data.selesai || 0,
                ditolak: data.ditolak || 0
            }
        });
    });
});

// Aktivitas Terbaru Mahasiswa
router.get('/aktivitas/:id_user', (req, res) => {
    const userId = req.params.id_user;

    const query = `
        SELECT 
            tanggal_pengajuan AS tanggal, 
            jenis_surat, 
            status
        FROM surat
        WHERE id_user = ?
        ORDER BY tanggal_pengajuan DESC
        LIMIT 10;
    `;

    db.query(query, [userId], (err, result) => {
        if (err) {
            console.error("❌ Error aktivitas:", err);
            return res.status(500).json({
                success: false,
                message: "Gagal mengambil aktivitas terakhir"
            });
        }

        return res.json({
            success: true,
            count: result.length,
            data: result
        });
    });
});


// Template Surat untuk ditampilkan
router.get('/templates', (req, res) => {
    db.query("SELECT * FROM template_surat", (err, result) => {
        if (err) {
            console.error("❌ Error templates:", err);
            return res.status(500).json({
                success: false,
                message: "Gagal mengambil template surat"
            });
        }

        return res.json({
            success: true,
            count: result.length,
            data: result
        });
    });
});

export default router;
