import express from "express";
import { getAllProduct } from "../controllers/getAllProduct";

const router = express.Router();

router.post("/add",getAllProduct);

export default router;