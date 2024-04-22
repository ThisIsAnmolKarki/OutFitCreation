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
exports.getCategoryHeirarchy = exports.getCategoriesHeirarchy = void 0;
// Import the PostgreSQL connection pool from database.ts
const connect_1 = __importDefault(require("../models/connect"));
const findParent = (categories, categoryId) => {
    if (categoryId === null)
        return null;
    const category = categories.find(c => c.category_id === categoryId);
    if (!category)
        return null;
    return {
        id: category.category_id,
        name: category.category_name,
        parent: findParent(categories, category.parent_id) // Recursive call to find the parent's parent
    };
};
const getCategoriesHeirarchy = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract task details from the request body
    //(title, description, completed)
    try {
        const response = yield connect_1.default.query('SELECT * FROM categories');
        const categories = response.rows;
        // console.log(categories[0].category_id);
        let i = 0;
        return findParent(categories, id);
    }
    catch (ex) {
        console.log(ex);
        console.log("something went wrong on get categories heirarchy");
        return null;
    }
});
exports.getCategoriesHeirarchy = getCategoriesHeirarchy;
const getCategoryHeirarchy = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, exports.getCategoriesHeirarchy)(id);
});
exports.getCategoryHeirarchy = getCategoryHeirarchy;
