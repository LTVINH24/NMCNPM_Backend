import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    quantity:{
        type:Number,
        required:true,
        default:1
    },
    createdAt: {type: Date,default: Date.now},
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;