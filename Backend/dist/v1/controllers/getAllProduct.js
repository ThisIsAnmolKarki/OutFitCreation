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
exports.getAllProduct = void 0;
const getCategoriesHeirarchy_1 = require("./getCategoriesHeirarchy");
// Import the PostgreSQL connection pool from database.ts
const connect_1 = __importDefault(require("../models/connect"));
let getProductCategory = (product_id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield connect_1.default.query(`SELECT category_id FROM product_categories WHERE PRODUCT_ID = ${product_id}`);
    let categoryIds = -1;
    response.rows.map(pro => {
        categoryIds = pro.category_id;
    });
    return categoryIds;
});
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract task details from the request body
    //(title, description, completed)
    let products = new Map();
    try {
        const response1 = yield connect_1.default.query('SELECT * FROM PRODUCTS JOIN PRODUCT_AVAILABILITY ON PRODUCT_KEY = PRODUCT_ID ORDER BY PRODUCT_KEY ASC;');
        for (let pro of response1.rows) {
            let product_category = -1;
            yield getProductCategory(pro.product_key).then(cate => { product_category = cate; });
            let gch = yield (0, getCategoriesHeirarchy_1.getCategoriesHeirarchy)(product_category);
            getProductCategory(1).then(catego => console.log(catego));
            if (products.has(pro.product_key)) {
                let getPro = products.get(pro.product_key);
                let i = 0;
                let flag = false;
                getPro === null || getPro === void 0 ? void 0 : getPro.M_C.map(mcd => {
                    if (pro.size_id == mcd.size) {
                        flag = true;
                        if (getPro) {
                            // console.log(getPro)
                            let mc = mcd;
                            mc.color.push({
                                color: pro.color_id,
                                stock: pro.product_stock
                            });
                        }
                    }
                    i++;
                });
                if (!flag && getPro) {
                    let color = {
                        color: pro.color_id,
                        stock: pro.product_stock
                    };
                    getPro.M_C.push({ size: pro.size_id, color: [color] });
                }
                products.set(pro.product_key, getPro);
            }
            else {
                products.set(pro.product_key, {
                    product_id: parseInt(pro.product_key),
                    product_name: pro.product_name,
                    discount: parseInt(pro.discount),
                    description: "yellow",
                    price: pro.product_price,
                    is_new: pro.is_new,
                    M_C: [{
                            size: pro.size_id,
                            color: [
                                {
                                    color: pro.color_id,
                                    stock: pro.product_stock
                                }
                            ]
                        }],
                    categories: gch
                });
            }
        }
        const valuesArray = Array.from(products.values());
        console.log(valuesArray);
        return res.status(200).json(valuesArray); //--------------------->
    }
    catch (error) {
        // Handle errors, log them, and return an internal server error response
        console.error(error);
        return res.status(500).json('Internal Server error');
    }
});
exports.getAllProduct = getAllProduct;
