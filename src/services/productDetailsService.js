import productDetails from "../models/ProductDetails.js";

const productDetailsService={
    create:async(details)=>{
        const productDetailsRes=await productDetails.create(details);
        return productDetailsRes;
    },
    save:async(productDetails)=>{
        await productDetails.save();
    },
    getByProductId:async(id)=>{
        const productDetailsRes=await productDetails.findOne({productId:id}).lean()||{};
        return productDetailsRes;
    },  
    getAll:async()=>{
        const allProductDetails=await productDetails.find().lean();
        return allProductDetails;
    },
    deleteByProductId:async(id)=>{
        const productDetailsRes=await productDetails.findOneAndDelete({productId:id}).lean()||{};
        return productDetailsRes;
    },
    updateByProductId:async(id,details)=>{
        const productDetailsRes=await productDetails
        .findOneAndUpdate({productId:id},{...details},{new:true}).lean()||{};
        return productDetailsRes;
    }
};

export default productDetailsService;