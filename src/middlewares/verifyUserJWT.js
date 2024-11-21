import {verifyToken} from "../utils/createAndVerifyToken.js";

const SUCCESS_STATUS = process.env.SUCCESS_STATUS;
const BAD_REQUEST_STATUS = process.env.BAD_REQUEST_STATUS;
const SERVER_ERROR_STATUS = process.env.SERVER_ERROR_STATUS;

const TOKEN_NAME='token';

const verifyUserJWT = (req, res, next) => {
    try{
        const token=req.cookies[TOKEN_NAME];
        const decoded=verifyToken(token);
        if(!decoded){
            return res.status(BAD_REQUEST_STATUS).send({
                status: "error",
                message: "Unauthorized",
            });
        }
        req.user=decoded;
        next();
    }
    catch(e){
        return res.status(SERVER_ERROR_STATUS).send({
            status: "error",
            message: "Unauthorized",
        });
    }
};

export default verifyUserJWT;