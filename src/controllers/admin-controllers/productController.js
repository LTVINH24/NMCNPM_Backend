import productService from "../../services/productService.js";
import uploadImageToCloud from "../../utils/uploadImageToCloud.js";
import deleteImageFromDisk from "../../utils/deleteImageFromDisk.js";
import productDetailsService from "../../services/productDetailsService.js";
const SUCCESS_STATUS = 200;
const BAD_REQUEST_STATUS = 400;
const SERVER_ERROR_STATUS = 500;
const populateProductDetail=(productDetail)=>{
    const populatedProductDetails={
        product_id:productDetail.product_id,
        property_id:productDetail.property_id._id,  
        name:productDetail.property_id.name,
        value:productDetail.value,
    };
    return populatedProductDetails;
};

const getAllProducts=async(req,res)=>{
    try{
        const allProductDetails=await productService.getAllProducts();
        res
        .status(SUCCESS_STATUS)
        .send({
            message:"All products fetched successfully",
            products:allProductDetails,
        });
    }catch(err){
        res.status(SERVER_ERROR_STATUS)
            .send({message:err.message});
    }
};

const getProductById=async(req,res)=>{
    const {id}=req.params;
    try{
        const product=await productService.getProductById(id);
        res
        .status(SUCCESS_STATUS)
        .send(product);
    }catch(err){
        res.status(SERVER_ERROR_STATUS)
            .send({message:err.message});
    }
};


const addProduct=async(req,res)=>{
    
    try{
        const product=JSON.parse(req.body.product);
        const TMP_DIR_PATH="./tmp";
        const filePath=TMP_DIR_PATH+"/"+req.file.filename;
        const image=await uploadImageToCloud(filePath);
        deleteImageFromDisk(filePath);
        const productRes=await productService.create({...product,image});
        const savedProduct=await productService.save(productRes);
        const savedproductDetails=await productDetailsService.saveProductDetailsForProduct(product.productDetails.map((detail)=>({...detail,product_id:savedProduct._id})));
        res
        .status(SUCCESS_STATUS)
        .send(savedProduct);
    }catch(err){
        res.status(SERVER_ERROR_STATUS)
            .send({message:err.message});
    }
};


const deleteProductById=async(req,res)=>{
    const {id}=req.params;
    try{
        if(!await productService.isProductExist(id)){
            res.status(BAD_REQUEST_STATUS)
            .send({message:"Product does not exist"});
            return;
        }
        await productService.deleteByProductId(id);
        res
        .status(SUCCESS_STATUS)
        .send({
            '_id':id,
            message:"Product deleted successfully",
        });
    }catch(err){
        res.status(SERVER_ERROR_STATUS)
            .send({message:err.message});
    }
};

const getNewImageUrl=async(req)=>{
    if(!req.file){
        const product=await productService.getProductById(req.params.id);
        return product.image;
    }
    const TMP_DIR_PATH="./tmp";
    const filePath=TMP_DIR_PATH+"/"+req.file.filename;
    const imageUrl=await uploadImageToCloud(filePath);
    deleteImageFromDisk(filePath);
    return imageUrl;
};

const updateByProductId=async(req,res)=>{
    const {id}=req.params;
    const product=JSON.parse(req.body.product);
    try{
        if(!await productService.isProductExist(id)){
            res.status(BAD_REQUEST_STATUS)
            .send({message:"Product does not exist"});
            return;
        }
        const image=await getNewImageUrl(req);
        const updatedProduct=await productService.updateByProductId(id,{...product,image});
        const updatedProductDetails=await productDetailsService.updateByProductId(id,product.productDetails);
        res
        .status(SUCCESS_STATUS)
        .send({
            message:"Product updated successfully",
            product:updatedProduct,
            productDetails:updatedProductDetails.map((detail)=>populateProductDetail(detail)),
        });
    }catch(err){
        res.status(SERVER_ERROR_STATUS)
            .send({message:err.message});
    }
};

export {getAllProducts,getProductById,addProduct,deleteProductById,updateByProductId};