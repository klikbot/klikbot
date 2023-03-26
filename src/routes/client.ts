import express from "express";
import clientController from "../controllers/client.controller";

const { createClient, getClient, getAllClients, updateClient, deleteClient, newClients, inactiveClients, volume, getAveragePrice } = clientController;

const router = express.Router();

// routes for clients CRUD
router.post("/:cellphone/client/", createClient);
router.get("/:cellphone/client/:id", getClient);
router.get("/:cellphone/client/", getAllClients);
router.put("/:cellphone/client/:id", updateClient);
router.delete("/:cellphone/client/:id", deleteClient);

// routes for clients reports
router.get("/:cellphone/client/newClients/:days", newClients);
router.get("/:cellphone/client/inactiveClients/:days", inactiveClients);
router.get("/:cellphone/client/volume/:top", volume);
router.get("/:cellphone/client/averagePrice/:days", getAveragePrice);

export default router;