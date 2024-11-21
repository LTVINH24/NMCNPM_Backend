import {createToken} from "../../utils/createAndVerifyToken.js";
import userServices from "../../services/userService.js";
import {hashPassword,comparePlainAndHashed} from "../../utils/hashAndCompare.js";

const SUCCESS_STATUS = process.env.SUCCESS_STATUS;
const BAD_REQUEST_STATUS = process.env.BAD_REQUEST_STATUS;
const SERVER_ERROR_STATUS = process.env.SERVER_ERROR_STATUS;

const TOKEN_NAME='token';

const isLoginDataMiss = (req) => {
    const { userName, email, password } = req.body;
    if ((!userName && !email) || !password) {
        return true;
    }
    return false;
}


const isRegisterDataMiss = (req) => {
    const { fullName, userName, email, password } = req.body;
    if (!fullName || !userName || !email || !password) {
        return true;
    }
    return false;
}

//controllers

const loginUser = async (req, res) => {
    try {
        if (isLoginDataMiss(req)) {

            return res.status(BAD_REQUEST_STATUS).send({
                status: "error",
                message: "Invalid data",
            });
        }
        const { userName, email, password } = req.body;
        const user = await userServices.getUserByEmailOrUserName(email, userName);
        if (!user) {
            return res.status(BAD_REQUEST_STATUS).send({
                status: "error",
                message: "The account doesn't exist",
            });
        }
        if (!(await comparePlainAndHashed(password,user.password))) {
            return res.status(BAD_REQUEST_STATUS).send({
                status: "error",
                message: "Wrong password",
            });
        }
        const token = createToken(user);
        return res.status(SUCCESS_STATUS)
            .cookie(TOKEN_NAME, token, {
                httpOnly: true,
                sameSite: 'Strict',
            })
            .send({
                status: "success",
                message: "login",
                data: {
                    fullName: user.fullName,
                    userName: user.userName,
                    email: user.email,
                    role: user.role,
                }
            });
    }
    catch (e) {
        return res.status(SERVER_ERROR_STATUS).send({
            status: "error",
            message: "server err",
        });
    }
}

const registerUser = async (req, res) => {
    try {
        const { fullName, userName, email, password } = req.body;
        if (isRegisterDataMiss(req)) {
            return res.status(BAD_REQUEST_STATUS).send({
                status: "error",
                message: "Please give essential data",
            });
        }

        if (await userServices.checkIfUserExists(email, userName)) {
            return res.status(BAD_REQUEST_STATUS).send({
                status: "error",
                message: "userName or email already exists",
            });
        }
        const hashedPassword = await hashPassword(password);
        const userData={
            fullName,
            userName,
            email,
            password: hashedPassword,
        };
        const user = await userServices.createUser(userData);
        await userServices.saveUser(user);
        return res.status(SUCCESS_STATUS).send({
            status: "success",
            message: "register success",
        });
    }
    catch (e) {
        return res.status(SERVER_ERROR_STATUS).send({
            status: "error",
            message: "server err",
        });
    }
}

const logoutUser = async (req, res) => {
    try{
        res.clearCookie(TOKEN_NAME);
        return res.status(SUCCESS_STATUS).send({
            status: "success",
            message: "logout successfully",
        });
    }
    catch(e){
        return res.status(SERVER_ERROR_STATUS).send({
            status: "error",
            message: "server err",
        });
    }
}

const getLoginStatus=async(req,res)=>{
    try{
        const user=req.user;
        if(!user){
            return res.status(BAD_REQUEST_STATUS).send({
                status: "error",
                message: "Invalid token",
            });
        }
        return res.status(SUCCESS_STATUS).send({
            status: "success",
            message: "login",
            user:user,
        });
    }
    catch(e){
        return res.status(SERVER_ERROR_STATUS).send({
            status: "error",
            message: "server err",
        });
    }
};

export {loginUser, registerUser,logoutUser,getLoginStatus};

