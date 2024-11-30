import deleteImageFromDisk from "../../utils/deleteImageFromDisk.js";
import uploadImageToCloud from "../../utils/uploadImageToCloud.js";
import categoryService from "../../services/categoryService.js";
const OK_STATUS=200;
const BAD_REQUEST_STATUS=400;
const INTERNAL_SERVER_ERROR_STATUS=500;


const addCategory = async (req, res) => {
    try{
        const {name, description} = req.body;
        if(await categoryService.isExistByName(name)){
            return res.status(BAD_REQUEST_STATUS).send({
                message:"Category name already exists"});
        }
        const TMP_DIR_PATH="./tmp";
        const filePath=TMP_DIR_PATH+"/"+req.file?.filename;
        const image=await uploadImageToCloud(filePath);
        deleteImageFromDisk(filePath);
        const category=await categoryService.create({name, description, image});
        await categoryService.save(category);
        return res.status(OK_STATUS).send({
                message:"Category created successfully",
                category,
            }
        );
    }   
    catch(e){
        return res.status(INTERNAL_SERVER_ERROR_STATUS).send({message:'Internal server error'});
    }
    
};

const deleteBrand = async (req, res) => {
    try{
        const brandId=req.params.id;
        const brand=await brandService.getBrandById(brandId);
        if(brand){
            await brandService.deleteByBrandId(brandId);
            return res.status(OK_STATUS).send({message:"Brand deleted successfully"});
        }
        return res.status(BAD_REQUEST_STATUS).send({message:"Brand not found"});
    }
    catch(e){
        return res.status(INTERNAL_SERVER_ERROR_STATUS).send({message:e.message});
    }
    
};

const updateBrand = async (req, res) => {
    try{
        const brandId=req.params.id;
        const brand=await brandService.getBrandById(brandId);
        if(brand){
            const {name, description} = req.body;
            const TMP_DIR_PATH="./tmp";
            const filePath=TMP_DIR_PATH+"/"+req.file.filename;
            const image=await uploadImageToCloud(filePath);
            deleteImageFromDisk(filePath);
            brand.name=name;
            brand.description=description;
            brand.image=image;
            await brandService.save(brand);
            return res.status(OK_STATUS).send({
                    message:"Brand updated successfully",
                    brand,
                }
            );
        }
        return res.status(BAD_REQUEST_STATUS).send({message:"Brand not found"});
    }
    catch(e){
        return res.status(INTERNAL_SERVER_ERROR_STATUS).send({message:e.message});
    }
    
};


export {addCategory};