import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Import modular routes
import authRoutes from "./modules/auth/auth.routes.js";
import hotelRoutes from "./modules/hotel/hotel.routes.js";
import userRoutes from "./modules/user/user.routes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/hotel", hotelRoutes);
app.use("/api/user", userRoutes); 

// DB + Server
const startServer = async () => {
  await connectDB();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();