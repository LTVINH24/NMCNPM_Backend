import Product from "../models/Product.js";


const productService = {
    getAllProducts:async()=>{
        const products=await Product.find().lean();
        return products;
    },
    create: async (productProps) => {
        const productRes =await Product.create(productProps);
        return productRes;
    },
    save: async (product) => {
        const savedProduct=await product.save();
        return savedProduct;
    },
    isProductExist: async (productId) => {
        const product = await Product.findById(productId);
        return product !== null;
    },
    getProducts: async ({ brands, types, sortField='price', sortOrder=1,minPrice=0,maxPrice=Number.MAX_VALUE }) => {
        const products = await Product.find()
            .byType(types)
            .byBrand(brands)
            .byPrice(minPrice,maxPrice)
            .sort({ [sortField]: sortOrder })
            .exec();
        return products;
    },
    
    getProductById: async (productId) => {
        const product = await Product.findById(productId);
        return product;
    },

    updateByProductId: async (productId, productProps) => {
        const product = await Product.findByIdAndUpdate(productId, productProps, { new: true });
        return product;
    },

    deleteByProductId: async (productId) => {
        await Product.findByIdAndDelete(productId);
    },

    getRelatedProducts:async(product)=>{
        const products=await Product.find({type:product.type,_id:{$ne:product._id}});
        return products;
    },

    getProductsBySearch: async (searchTerm,
        { brands, types, sortField='price', sortOrder=1,minPrice=0,maxPrice=Number.MAX_VALUE }) => {
        const products = await Product.find({
            $or: [
                { type: { $regex: searchTerm, $options: 'i' } },
                { brand: { $regex: searchTerm, $options: 'i' } },
                { name: { $regex: searchTerm, $options: 'i' } },
                {description:{ $regex: searchTerm, $options: 'i' }},
            ]
        })
        .byType(types)
        .byBrand(brands)
        .byPrice(minPrice,maxPrice)
        .sort({ [sortField]: sortOrder })
        .exec();
        return products;
    },
    
    getTopProducts: async (top) => {
        const products = await Product.find().sort({ rating: -1 }).limit(top);
        return products;
    },
};

export default productService;