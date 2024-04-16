import express from "express";
import verify_add_product from "../middleware/validateAddPro";
import addProduct from "../controllers/addPro";
import getProductsFeature from "../controllers/getProFeatures";

const router = express.Router();

router.get("/get", getProductsFeature);

export default router;