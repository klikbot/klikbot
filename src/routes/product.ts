import express from "express";
import productController from "../controllers/product.controller";

const { createProduct, getProduct, getAllProducts, getTotalRevenueFromProducts, getAllProductsFromUser, getTopSellingProduct, getLeastSoldProduct, updateProduct, deleteProduct } = productController;

const router = express.Router();

// POST /api/product
router.post("/:cellphone/product/", createProduct);

// GET /api/product/:productId
router.get("/:cellphone/product/:productId", getProduct);

// GET /api/product
router.get("/:cellphone/product/", getAllProducts);

//GET /api/user/:cellphone/product/getTotalRevenueFromProduct
router.get("/:cellphone/product/getTotalRevenueFromProducts", getTotalRevenueFromProducts);

// GET /api/user/:cellphone/product/getAllProductsFromUser
router.get("/:cellphone/product/getAllProductsFromUser", getAllProductsFromUser);

// GET /api/:cellphone/product/getTopSellingProducts
router.get("/:cellphone/product/getTopSellingProducts", getTopSellingProduct);

// GET /api/:cellphone/product/getLeastSoldProducts
router.get("/:cellphone/product/getLeastSoldProducts", getLeastSoldProduct);

// PUT /api/product/:productId
router.put("/:cellphone/product/:productId", updateProduct);

// DELETE /api/product/:productId
router.delete("/:cellphone/product/:productId", deleteProduct);


export default router;
