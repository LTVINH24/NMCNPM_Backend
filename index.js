import dotenv from 'dotenv';
dotenv.config();
import express from 'express';


const app = express();
app.use(express.json());
    
app.get("/", (req, res) => {
    return res.send("Hello World");
});


app.listen(process.env.PORT || 5000, () => {
    console.log(`Server started on http://localhost:${process.env.PORT||5000}`);
});