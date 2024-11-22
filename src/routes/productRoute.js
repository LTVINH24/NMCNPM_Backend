import { getAllFilteredProducts,searchProducts}
from "../controllers/shop-controllers/productController.js";
import express from "express";

const productRouter=express.Router();


productRouter.get("/all",getAllFilteredProducts);
productRouter.get("/search",searchProducts);

export default productRouter;