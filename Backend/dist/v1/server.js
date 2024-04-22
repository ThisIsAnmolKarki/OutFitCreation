"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import mongoose from "mongoose";
const index_1 = require("./config/index");
const index_2 = __importDefault(require("./routes/index"));
// import App from "./routes/index";
// === 1 - CREATE SERVER ===
const server = (0, express_1.default)();
// CONFIGURE HEADER INFORMATION
// Allow request from any source. In real production, this should be limited to allowed origins only
server.use((0, cors_1.default)());
server.disable("x-powered-by"); //Reduce fingerprinting
server.use((0, cookie_parser_1.default)());
server.use(express_1.default.urlencoded({ extended: false }));
server.use(express_1.default.json());
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("ok go for it!");
            server.use(index_2.default);
            server.listen(index_1.PORT, () => console.log(`Server running on http://localhost:${index_1.PORT}`));
        }
        catch (err) {
            console.error("Database connection failed", err);
            process.exit(1); // Exit process with error
        }
    });
}
startServer();
