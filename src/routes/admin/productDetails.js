import 
{getProductDetailsByProductId,addProductDetails,
updateProductDetailsByProductId,deleteProductDetailsByProductId}
from "../../controllers/admin-controllers/productDetailsController.js";

import express from "express";


const adminProductDetailsRouter=express.Router();

adminProductDetailsRouter.get("/:id",getProductDetailsByProductId);
adminProductDetailsRouter.post("/",addProductDetails);
adminProductDetailsRouter.put("/:id",updateProductDetailsByProductId);
adminProductDetailsRouter.delete("/:id",deleteProductDetailsByProductId);

export default adminProductDetailsRouter;