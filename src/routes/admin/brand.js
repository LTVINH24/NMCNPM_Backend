import { addBrand } from "../../controllers/admin-controllers/brandController.js";
import upload from "../../config/multer.js";
import express from "express";

const router=express.Router();

router.post('/add',upload.single("image"),addBrand);

export default router;