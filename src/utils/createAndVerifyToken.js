import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;
const JWT_EXPIRATION = "30m";

const createToken = (obj) => {
    const token = jwt.sign({ obj, type: "BasicAuth" }, JWT_PRIVATE_KEY, { expiresIn: JWT_EXPIRATION });
    return token;
}

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_PRIVATE_KEY);
        return decoded;
    } catch (error) {
        return null;
    }
}

export {createToken,verifyToken};
