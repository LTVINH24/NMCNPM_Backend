import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from "./src/config/mongoose.js";
import cors from 'cors';
import cookieParser from 'cookie-parser';

import userRouter from "./src/routes/userRoute.js";
import productRouter from "./src/routes/productRoute.js";
import adminProductRouter from "./src/routes/admin/productDetails.js"

const corsOptions = {
    origin: `${process.env.FRONTEND_BASE_URL}`,
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
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);


app.use("/admin/productDetails", adminProductRouter);

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server started on http://localhost:${process.env.PORT||5000}`);
});