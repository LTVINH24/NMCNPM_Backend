import Order from "../models/Order.js"
import Product from "../models/Product.js"

import productService from "./productService.js"
const calculateTotalAmount = async(items)=>{
    const prodcutIds =items.map(item=>item.productId)
    const products =await Product.find({'_id':{$in:prodcutIds}})
    let totalAmount =0
    items.forEach(item=>{

        const product = products.find(p=>p._id.toString()===item.productId.toString())
        if(product){
            const price =product.price
            const salePrice =product.salePrice
            const quantity =item.quantity
            if(salePrice){
                totalAmount += salePrice*quantity
            }
            else{
                totalAmount+=price*quantity
            }
        }
    }
    )
    return totalAmount
}
const orderService={
    async validateItems(items){
        const productIds = items.map(item => item.productId)
        const products = await Product.find({'_id':{$in:productIds}})
        if(products.length!=items.length){
            const inValidProducts = items.filter(item =>!products.some(product => product._id.toString()===item.productId.toString()))
            return inValidProducts
        }
        return true
    },
    async createOrder(userId,items){
        const total = await calculateTotalAmount(items)
        const order = new Order({userId:userId,items:items,total:total})
        await order.save()
        return order
    }
}
export default orderService