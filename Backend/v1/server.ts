import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// import mongoose from "mongoose";
import { PORT} from "./config/index";
import App from "./routes/index";
// import App from "./routes/index";

// === 1 - CREATE SERVER ===
const server = express();

// CONFIGURE HEADER INFORMATION
// Allow request from any source. In real production, this should be limited to allowed origins only
server.use(cors());
server.disable("x-powered-by"); //Reduce fingerprinting
server.use(cookieParser());
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

async function startServer() {
    try {
        console.log("ok go for it!");
        server.use(App);
        server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    } catch (err) {
        console.error("Database connection failed", err);
        process.exit(1); // Exit process with error
    }
}

startServer()

