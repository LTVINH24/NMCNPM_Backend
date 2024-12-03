import express from "express"
import verifyUserJWT from '../middlewares/verifyUserJWT.js';
import {placeOrder} from "../controllers/order-controllers/orderController.js"

const orderRoute =express.Router()
orderRoute.post("/placeOrder",verifyUserJWT,placeOrder)


export default orderRoute