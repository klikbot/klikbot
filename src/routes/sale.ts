import express from "express";
import saleController from "../controllers/sale.controller";

const { createSale, getSalesFromUser, updateSale, deleteSale} = saleController;

const router = express.Router();

// POST /api/user/sale
router.post("/sale", createSale);

// GET /api/user/:cellphone/sale
router.get("/:cellphone/sale", getSalesFromUser);

// PUT /api/user/:cellphone/sale/:id
router.put("/:cellphone/sale/:id", updateSale);

// DELETE /api/user/:cellphone/sale/:id
router.delete("/:cellphone/sale/:id", deleteSale);

export default router;