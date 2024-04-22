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
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract task details from the request body
    //(title, description, completed)
    const { product_name, product_id, product_price, is_new, size, color, product_description, discount, product_stock } = req.body;
    try {
        // Execute a PostgreSQL query to select all tasks
        yield connect_1.default.query("INSERT INTO products (product_key, product_name, product_price, is_new) VALUES ($1,$2,$3,$4)", [product_id, product_name, product_price, is_new]);
        yield connect_1.default.query("INSERT INTO product_availability (product_id, size_id, color_id, product_stock,discount) VALUES ($1, $2, $3,$4,$5)", [product_id, size, color, product_stock, discount]);
        return res.status(201).json({
            // product Created successfully
            message: 'product created successfully',
            task: {
                product_id, product_name, product_price, is_new, size, color, product_stock, discount, product_description
            }
        });
    }
    catch (error) {
        // Handle errors, log them, and return an internal server error response
        console.error(error);
        return res.status(500).json('Internal Server error');
    }
});
exports.default = addProduct;
