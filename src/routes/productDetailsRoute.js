import {getProductDetailsByProductId} from "../controllers/shop-controllers/productDetailsController.js";
import express from "express";

const productDetailsRouter=express.Router();


productDetailsRouter.get("/get/:id",getProductDetailsByProductId);

export default productDetailsRouter;