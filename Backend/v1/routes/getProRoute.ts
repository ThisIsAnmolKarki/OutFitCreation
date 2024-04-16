import express from "express";
import { getAllProduct } from "../controllers/getAllProduct";

const router = express.Router();

router.get("/get",getAllProduct);

export default router;