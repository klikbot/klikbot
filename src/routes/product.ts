import express from "express";
import productController from "../controllers/product.controller";

const { createProduct, getProduct, getAllProducts, updateProduct, deleteProduct } = productController;

const router = express.Router();

// POST /api/product
router.post("/:cellphone/product/", createProduct);

// GET /api/product/:productId
router.get("/:cellphone/product/:productId", getProduct);

// GET /api/product
router.get("/:cellphone/product/", getAllProducts);

// PUT /api/product/:productId
router.put("/:cellphone/product/:productId", updateProduct);

// DELETE /api/product/:productId
router.delete("/:cellphone/product/:productId", deleteProduct);

export default router;
