import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from "./src/config/mongoose.js";
import userRouter from "./src/routes/userRoute.js";
import productRouter from "./src/routes/productRoute.js";
import cartRoute from "./src/routes/cartRoute.js"
import cors from 'cors';
import cookieParser from 'cookie-parser';

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.get("/", (req, res) => {
    return res.send("Hello World");
});
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/cart",cartRoute)

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server started on http://localhost:${process.env.PORT||5000}`);
});