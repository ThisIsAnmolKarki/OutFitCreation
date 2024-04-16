import express from "express";
import verify_add_product from "../middleware/validateAddPro";
import addProduct from "../controllers/addPro";

const router = express.Router();

router.post("/add",verify_add_product, addProduct);

export default router;