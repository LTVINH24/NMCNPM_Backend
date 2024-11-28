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
    getProducts: async ({ brands, categories, sortField='price', sortOrder=1,minPrice=0,maxPrice=Number.MAX_VALUE }) => {
        const products = await Product.find()
            .byCategory(categories)
            .byBrand(brands)
            .byPrice(minPrice,maxPrice)
            .sort({ [sortField]: sortOrder })
            .exec();
        return products.filter(product=>product.category!==null&&product.brand!==null);
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

    // getRelatedProducts:async(product)=>{
    //     const products=await Product.find({type:product.type,_id:{$ne:product._id}});
    //     return products;
    // },

    getProductsBySearch: async (searchTerm,
        { brands, categories, sortField='price', sortOrder=1,minPrice=0,maxPrice=Number.MAX_VALUE }) => {
            const products = await Product.aggregate([
                {
                    $lookup:{
                        from:'brands',
                        localField:'brand_id',
                        foreignField:'_id',
                        as:'brand'
                    }
                },
                {$unwind:'$brand'},
                {
                    $lookup:{
                        from:'categories',
                        localField:'category_id',
                        foreignField:'_id',
                        as:'category'
                    }
                },
                {$unwind:'$category'},
                {
                    $match:{
                        $and: [
                            {
                                $or:[
                                    { 'category.name': { $regex: searchTerm, $options: 'i' } },
                                    { 'brand.name': { $regex: searchTerm, $options: 'i' } },
                                    { name: { $regex: searchTerm, $options: 'i' } },
                                    { description:{ $regex: searchTerm, $options: 'i' }}
                                ]
                            },
                            categories.length > 0 ? { 'category.name': { $in: categories } } : {},
                            brands.length > 0 ? { 'brand.name': { $in: brands } } : {},
                            {
                                price:{$gte:Number(minPrice),$lte:Number(maxPrice)}
                            }
                        ]
                    }
                },
                {
                    $sort: { [sortField]: parseInt(sortOrder) }
                }
            ]);
        return products;
    },
    
    getTopProducts: async (top) => {
        const products = await Product.find().sort({ rating: -1 }).limit(top);
        return products;
    },
};

export default productService;