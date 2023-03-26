import express from "express";
import saleController from "../controllers/sale.controller";

const { createSale, getSalesFromUser, updateSale, deleteSale, getAveragePrice, getAllSales} = saleController;

const router = express.Router();

// POST /api/user/sale
router.post("/sale", createSale);

// GET /api/user/:cellphone/sale
router.get("/:cellphone/sale", getSalesFromUser);

// PUT /api/user/:cellphone/sale/:id
router.put("/:cellphone/sale/:id", updateSale);

// DELETE /api/user/:cellphone/sale/:id
router.delete("/:cellphone/sale/:id", deleteSale);

router.get("/:cellphone/sale/averagePrice/:days", getAveragePrice);

router.get("/sale/allSales/:period", getAllSales);

export default router;