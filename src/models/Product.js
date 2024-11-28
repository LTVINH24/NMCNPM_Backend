import mongoose from "mongoose";

const productSchema= new mongoose.Schema({
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    name: {type: String, required: true},
    price: {type: Number, required: true},
    salePrice:{
        type:Number,
    },
    brand_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true,
    },
    totalStock:{type: Number,required:true},
    image:String,
    rating:{
        type:Number,
        default:0,
    },
    description: {type: String,default:"No description"},
    status:{type:String,default:"On stock"},
    createdAt:{type:Date,default:Date.now},
});

//exptected receit an arr
productSchema.query.byCategory = function(categories) {
    if (!categories || categories.length <= 0){
        return this.populate('category');
    }
    return this.populate({
        path: 'category',
        match:{
            name:{$in:categories}
        }
    });
};

productSchema.query.byBrand = function(brands) {
    if (!brands || brands.length <= 0){
        return this.populate('brand');
    }
    return this.populate({
        path: 'brand',
        match:{
            name:{$in:brands}
        }
    });
};

productSchema.query.byPrice=function(minPrice,maxPrice){
    if(!minPrice || !maxPrice) return this;
    return this.where({price:{$gte:minPrice,$lte:maxPrice}});
}

productSchema.index({name:'text',description:'text'});

const Product=mongoose.model('Product',productSchema);

export default Product;