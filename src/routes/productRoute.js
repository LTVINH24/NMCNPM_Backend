import { getAllFilteredProducts,searchProducts,getRelatedProducts}
from "../controllers/shop-controllers/productController.js";
import express from "express";

const productRouter=express.Router();


productRouter.get("/all",getAllFilteredProducts);
productRouter.get("/search",searchProducts);
productRouter.get("/related/:productId",getRelatedProducts);

export default productRouter;