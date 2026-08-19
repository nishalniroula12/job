import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

import mainroutes from "./routes/Mainroutes.js";
import asynchandling from "./utlis/asynchandling.js";
import User from "./models/Users.js";

dotenv.config();

const app = express();

// ==========================================
// CORS
// ==========================================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ==========================================
// BODY PARSER
// ==========================================

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ==========================================
// COOKIE
// ==========================================

app.use(cookieParser());

// ==========================================
// ROUTES
// ==========================================

app.use("/api", mainroutes);

// ==========================================
// TEST ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Job Portal Backend is running",
  });
});

// ==========================================
// 404
// ==========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});

export default app;