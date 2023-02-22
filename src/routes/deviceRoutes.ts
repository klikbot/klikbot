import express from "express";
import deviceController from "../controllers/deviceController";

const { getAllDevices, getDeviceById, createDevice, deleteDevice } = deviceController;

const router = express.Router();

// GET /devices
router.get("/", getAllDevices);

// GET /devices/:id
router.get("/:id", getDeviceById);

// POST /devices
router.post("/", createDevice);

// PUT /devices/:id
// router.put("/:id", );

// DELETE /devices/:id
router.delete("/:id", deleteDevice);

export default router;
