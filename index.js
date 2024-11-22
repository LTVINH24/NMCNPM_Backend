import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from "./src/config/mongoose.js";
import userRouter from "./src/routes/userRoute.js";


const app = express();
app.use(express.json());
    
app.get("/", (req, res) => {
    return res.send("Hello World");
});
app.use("/api/users", userRouter);


app.listen(process.env.PORT || 5000, () => {
    console.log(`Server started on http://localhost:${process.env.PORT||5000}`);
});