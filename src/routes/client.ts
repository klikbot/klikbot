import express from "express";
import clientController from "../controllers/client.controller";

const { createClient, getClient, getAllClients, updateClient, deleteClient } = clientController;

const router = express.Router();

router.post("/:cellphone/client/", createClient);
router.get("/:cellphone/client/:id", getClient);
router.get("/:cellphone/client/", getAllClients);
router.put("/:cellphone/client/:id", updateClient);
router.delete("/:cellphone/client/:id", deleteClient);

export default router;