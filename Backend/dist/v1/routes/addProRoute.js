"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateAddPro_1 = __importDefault(require("../middleware/validateAddPro"));
const addPro_1 = __importDefault(require("../controllers/addPro"));
const router = express_1.default.Router();
router.post("/add", validateAddPro_1.default, addPro_1.default);
exports.default = router;
