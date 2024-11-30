import categoryTypicalService from "../../services/categoryTypicalService.js";

const OK_STATUS=200;
const BAD_REQUEST_STATUS=400;
const INTERNAL_SERVER_ERROR_STATUS=500;

const getAllTypicalDetails=async (req, res) => {
    try{
        const categoryId=req.params.id;
        const categoryTypicalDetails=await categoryTypicalService.getAllByCategoryId(categoryId);
        return res.status(200).send(categoryTypicalDetails);
    }
    catch(e){
        return res.status(500).send({message:e.message});
    }
};

export {getAllTypicalDetails};