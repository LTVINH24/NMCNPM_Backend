import productDetailsService from "../../services/productDetailsService.js";


const SUCCESS_STATUS = 200;
const BAD_REQUEST_STATUS = 400;
const SERVER_ERROR_STATUS = 500;


const getProductDetailsByProductId=async(req,res)=>{
    const {id}=req.params;
    try{
        const productDetails=await productDetailsService.getByProductId(id);
        res
        .status(SUCCESS_STATUS)
        .send(productDetails);
    }catch(err){
        res.status(SERVER_ERROR_STATUS)
            .send({message:err.message});
    }
};

export {getProductDetailsByProductId};