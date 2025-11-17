import session from "express-session";
import dotenv from "dotenv";
dotenv.config();

export const sessionConfig = session({
  secret: process.env.SESSION_SECRET || "fastif-secret-key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 1000 * 60 * 30
  }
});
