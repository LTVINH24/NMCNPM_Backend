
import cartServices from "../../services/cartService.js"
import checkNumber from "../../utils/checkNumber.js";
const SUCCESS_STATUS = process.env.SUCCESS_STATUS;
const BAD_REQUEST_STATUS = process.env.BAD_REQUEST_STATUS;
const SERVER_ERROR_STATUS = process.env.SERVER_ERROR_STATUS;
const isCartItemsValid=(req)=>{
  const {userId,productId,quantity}=req.body;
  if(!userId||!productId||!quantity){
      return false;
  }
  if(!checkNumber.isPositiveInteger(quantity)){
      return false;
  }
  return true;
};
const addToCart=async(req,res)=>{
 try{
    if(!isCartItemsValid(req)){
      return res.status(BAD_REQUEST_STATUS).send({success:false,message:"Invalid request"})
    }
    const {userId,productId,quantity}=req.body
    const cart=await cartServices.createCart(userId,productId,quantity)
    res.status(SUCCESS_STATUS).json(cart)
 }
 catch(error){
    res.status(SERVER_ERROR_STATUS).send({success:false,message:"Server error"})
 }
}
const removeFromCart=async(req,res)=>{
try{
        if(isCartItemsValid(req)){
          return res.status(BAD_REQUEST_STATUS).send({success:false,message:"Invalid request"})
        }
        const {userId,productId,quantity}=req.body
        await cartServices.deleteCart(userId,productId,quantity)
        res.status(SUCCESS_STATUS).send({success:true})
}
catch(error){
    res.status(SERVER_ERROR_STATUS).send({success:false,message:"Server error"})
}
}
const getCard=async(req,res)=>{
  try{
   const userId=req.body.userId
   const cartData =await cartServices.getCartByUserId(userId)
   if(!cartData){
    return res.status(BAD_REQUEST_STATUS).send({success:false,message:"User not valid"})
   }
   res.status(SUCCESS_STATUS).json(cartData)
  }
  catch(error){
    res.status(SERVER_ERROR_STATUS).send({success:false,message:"Server error"})
  }
}
export {addToCart,removeFromCart,getCard}