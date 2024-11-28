import ProductProperties from "../models/ProductProperties.js";
import ProductPropertyValues from "../models/ProductPropertyValues.js";


const productDetailsService={

    createProductPropertyValue:async(product_id,property_id,value)=>{
        const productPropertyValue=new ProductPropertyValues(product_id,property_id,value);
        return productPropertyValue;
    },

    saveProductPropertyValue:async(productPropertyValue)=>{
        const savedProductPropertyValue=await productPropertyValue.save();
        return savedProductPropertyValue;
    },

    createProductPropertyOfCategory:async(category_id,name,description)=>{
        const productProperty=new ProductProperties(category_id,name,description);
        return productProperty;
    },

    saveProductPropertyOfCategory:async(productProperty)=>{
        const savedProductProperty=await productProperty.save();
        return savedProductProperty;
    },

    getPropertiesByCategory:async(category_id)=>{
        const properties=await ProductProperties
        .find({category_id})
        .lean();
        return properties;
    },
    getByProductDetailsId:async(id)=>{
        const productDeails=await ProductPropertyValues
        .find({product_id:id})
        .populate('property_id')
        .lean();
        return productDeails;
    },
};

export default productDetailsService;