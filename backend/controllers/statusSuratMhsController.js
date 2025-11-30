import { getStatusSuratByUser } from "../models/statusSuratMhsModel.js";

export const statusSuratMhsController = (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const id_user = req.session.user.id_user;

  getStatusSuratByUser(id_user, (err, results) => {
    if (err) {
      console.error("DB ERROR:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json(results);
  });
};
