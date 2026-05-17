import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import { errorHandler, notFound } from "./middleware/error.js";
import authRoutes from "./routes/authRoutes.js";
import campaignRoutes from "./routes/campaignRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

// Resolving __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_URL || "*",
    })
);
app.use(express.json());
app.use(morgan("dev"));

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/upload", uploadRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const bootstrap = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

bootstrap();
