import Cart from '../models/Cart.js';

const cartService = {

    async createCart(userId,productId,quantity=1){
        const existingCart=await Cart.findOne({userId,productId})
        if(existingCart)
        {
            existingCart.quantity+=quantity
            await existingCart.save()
            await existingCart.populate('productId','name price')
            return existingCart
        }
        const newCart = new Cart({userId,productId,quantity})
        await newCart.save()
        await newCart.populate('productId','name price')
        return newCart
    },
    async deleteCart(userId,productId,quantity=1){
        const itemCart=await Cart.findOne({userId,productId})

        if(quantity>=itemCart.quantity)
        {
           await Cart.deleteOne({userId,productId})
           return;
        }
        itemCart.quantity-=quantity
        await itemCart.save()
        return itemCart
    },
    async getCartByUserId(userId){
        const cartItems= await Cart.find({userId}).populate('productId','name price')
        return cartItems
    }
}

export default cartService
