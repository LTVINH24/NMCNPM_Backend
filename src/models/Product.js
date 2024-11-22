import mongoose, { Schema } from "mongoose";

const productSchema= new mongoose.Schema({
    type: {type: String, required: true},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    salePrice:{
        type:Number,
    },
    brand: {type: String, required: true},
    rating: {type: Number},
    totalStock:{type: Number,required:true},
    image:String,
    rating:{
        type:Number,
        default:0,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
});
//exptected receit an arr
productSchema.query.byType=function(types){
    if(!types || types.length<=0) return this;
    return this.where({type:{$in:types}});
}
productSchema.query.byBrand=function(brands){
    if(!brands || brands.length<=0) return this;
    return this.where({brand:{$in:brands}});
}

productSchema.index({name:'text',brand:'text',type:'text'});
const Product=mongoose.model('Product',productSchema);
export default Product;