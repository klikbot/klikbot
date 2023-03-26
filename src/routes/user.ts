import express from "express";
import userController from "../controllers/user.controller";

const { createUser, getUser, getAllUsers, updateUser, deleteUser } = userController;

const router = express.Router();

// POST /api/user
router.post("/", createUser);

// GET /api/user/:cellphone
router.get("/:cellphone", getUser);

// GET /api/user
router.get("/", getAllUsers);

// PUT /api/user/:cellphone
router.put("/:cellphone", updateUser);

// DELETE /api/user/:cellphone
router.delete("/:cellphone", deleteUser);

export default router;