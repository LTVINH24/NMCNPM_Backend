
import cartServices from "../../services/cartService.js"
const SUCCESS_STATUS = process.env.SUCCESS_STATUS;
const BAD_REQUEST_STATUS = process.env.BAD_REQUEST_STATUS;
const SERVER_ERROR_STATUS = process.env.SERVER_ERROR_STATUS;
const addToCart=async(req,res)=>{
 try{
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
   res.status(SUCCESS_STATUS).json(cartData)
  }
  catch(error){
    res.status(SERVER_ERROR_STATUS).send({success:false,message:"Server error"})
  }
}
export {addToCart,removeFromCart,getCard}