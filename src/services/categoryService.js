import Category from "../models/Category.js";

const categoryService={
    isExistByName:async(name)=>{
        return await Category.exists({name});
    },
    create: async(data)=>{
        const newCategory=new Category(data);
        return newCategory;
    },
    save:async(category)=>{
        return await category.save();
    }

};
export default categoryService;