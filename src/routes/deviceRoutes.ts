import express from "express";
import deviceController from "../controllers/deviceController";

const { createDevice, getAllDevices, getDeviceById, updateDevice, deleteDevice } = deviceController;

const router = express.Router();

// POST /api/devices
router.post("/", createDevice);

// GET /api/devices
router.get("/", getAllDevices);

// GET /api/devices/:id
router.get("/:id", getDeviceById);

// PUT /api/devices/:id
router.put("/:id", updateDevice);

// DELETE /api/devices/:id
router.delete("/:id", deleteDevice);

export default router;
