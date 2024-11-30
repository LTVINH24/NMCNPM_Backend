import { addCategory } from "../../controllers/admin-controllers/categoryController.js";
import upload from "../../config/multer.js";
import express from "express";

const router=express.Router();

router.post('/add',upload.single("image"),addCategory);

export default router;