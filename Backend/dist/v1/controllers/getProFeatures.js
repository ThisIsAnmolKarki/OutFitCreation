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
// Import the PostgreSQL connection pool from database.ts
const connect_1 = __importDefault(require("../models/connect"));
const getProductsFeature = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract task details from the request body
    //(title, description, completed)
    try {
        const response1 = yield connect_1.default.query('SELECT * FROM COLOR;');
        let col = response1.rows;
        const response2 = yield connect_1.default.query("SELECT * FROM SIZE;");
        let size = response2.rows;
        let csc_data = {
            color: col,
            size: size
        };
        console.log(csc_data);
        return res.status(200).json(csc_data);
    }
    catch (err) {
        console.log("problem in getProductsFeatures");
        return res.status(400).json("cannot select product features");
    }
});
exports.default = getProductsFeature;
