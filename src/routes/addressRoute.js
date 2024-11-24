import express from "express";
import addressController from "../controllers/addressController.js";

const addressRouter = express.Router();

addressRouter.get("/", addressController.getAddresses);
addressRouter.get("/:id", addressController.getAddressById);
addressRouter.post("/", addressController.createAddress);
addressRouter.put("/:id", addressController.updateAddress);
addressRouter.delete("/:id", addressController.deleteAddress);

export default router;