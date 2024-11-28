import Category from "../models/Category.js";

const categoryService={
    create: async(data)=>{
        const newCategory=new Category(data);
        return newCategory;
    },
    save:async(category)=>{
        return await category.save();
    }

};
export default categoryService;