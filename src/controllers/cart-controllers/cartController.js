
import userServices from "../../services/userService.js"
const SUCCESS_STATUS = process.env.SUCCESS_STATUS;
const BAD_REQUEST_STATUS = process.env.BAD_REQUEST_STATUS;
const SERVER_ERROR_STATUS = process.env.SERVER_ERROR_STATUS;
const addToCart=async(req,res)=>{
 try{
    let userData = await userServices.getUserByID(req.body.userId)
    let cartData =userData.cartData
    if(!cartData[req.body.productId])
    {
        cartData[req.body.productId]=req.body.amount
    }
    else{
        cartData[req.body.productId]+=req.body.amount

    }
    await userServices.updateUserByID(req.body.userId,{cartData})
    res.status(SUCCESS_STATUS).json({success:true,cartData})
 }
 catch(error){
    res.status(SERVER_ERROR_STATUS).send({success:false,message:"Server error"})
    
 }
}
const removeFromCart=async(req,res)=>{
try{

    let userData = await userServices.getUserByID(req.body.userId)
    let cartData =userData.cartData
    if(cartData[req.body.productId]>0){
        cartData[req.body.productId]-=req.body.amount
        await userServices.updateUserByID(req.body.userId,{cartData})
        res.status(SUCCESS_STATUS).json({success:true,cartData})

    }
}
catch(error){
    res.status(SERVER_ERROR_STATUS).send({success:false,message:"Server error"})

}

}
const getCard=async(req,res)=>{
  try{
    let userData = await userServices.getUserByID(req.body.userId)
    let cartData =userData.cartData
    res.status(SUCCESS_STATUS).json({success:true,cartData})
  }
  catch(error){
    res.status(SERVER_ERROR_STATUS).send({success:false,message:"Server error"})
  }
}
export {addToCart,removeFromCart,getCard}