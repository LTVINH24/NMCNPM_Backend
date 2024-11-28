import productDetailsService from "../../services/productDetailsService.js";


const SUCCESS_STATUS = 200;
const BAD_REQUEST_STATUS = 400;
const SERVER_ERROR_STATUS = 500;


const populateProductDetails=(propertyValues=[])=>{
    const init={
        product_id:propertyValues[0].product_id,
    };
    return propertyValues.reduce((acc,propertyValue)=>{
        if(!acc[propertyValue.property_id.name]){
            acc[propertyValue.property_id.name]=propertyValue.value;
        }
        return acc;
    }
    ,init);
}

const getProductDetailsByProductId=async(req,res)=>{
    const {id}=req.params;
    try{
        
        const productDetails=populateProductDetails(await productDetailsService.getByProductDetailsId(id));
        res
        .status(SUCCESS_STATUS)
        .send(productDetails);
    }catch(err){
        res.status(SERVER_ERROR_STATUS)
            .send({message:err.message});
    }
};

export {getProductDetailsByProductId};