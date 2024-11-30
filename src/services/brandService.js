import Brand from "../models/Brand.js";


const brandService={
    isExistByName:async(name)=>{
        return await Brand.exists({name});
    },
    create: async(data)=>{
        const newBrand=new Brand(data);
        return newBrand;
    },
    save:async(brand)=>{
        return await brand.save();
    }
};

export default brandService;