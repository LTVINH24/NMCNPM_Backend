import orderService from "../../services/orderService.js"
import userService from "../../services/userService.js"
import cartService from "../../services/"
const SUCCESS_STATUS = process.env.SUCCESS_STATUS;
const BAD_REQUEST_STATUS = process.env.BAD_REQUEST_STATUS;
const SERVER_ERROR_STATUS = process.env.SERVER_ERROR_STATUS;

const isPlaceOrderValid = async (req)=>{
    const {userId,items,isItemsInCart} =req.body
    if(!userId||!items||items.length<0)
    {
        return false
    }
    const user = await userService.getUserByID(userId)
    if(!user)
    {
        return false
    }
    return true
}
 const placeOrder = async (req,res)=>{
    try{
        if(!await isPlaceOrderValid(req)){
            return res.status(BAD_REQUEST_STATUS).send({success:false,message:"Invalid request"})
        }
        const {userId,items,isItemsInCart } =req.body
        const invalidProductIds =await orderService.validateItems(items) 
        if(invalidProductIds!==true){
            return res.status(BAD_REQUEST_STATUS).send({success:false,message:"Products not exits",invalidProductIds})
        }
        if(isItemsInCart){

        }
        const order =await orderService.createOrder(userId,items)
        res.status(SUCCESS_STATUS).send({success:true,message:"Order successful"})
    }
    catch{
        return res.status(SERVER_ERROR_STATUS).send({success:false,message:"Server error"})
    }
 }
 export  {placeOrder}