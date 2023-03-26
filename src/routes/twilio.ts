import express from "express";
import twilioController from "../controllers/twilio.controller";

const { webhook } = twilioController;

const router = express.Router();

// POST /api/webhook
router.post("/", webhook);

export default router;