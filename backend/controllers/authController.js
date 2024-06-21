import userModel from "../models/userModel.js";
import bcryptjs from "bcrypt"
import customError from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();


export const register = async (req, res, next) => {
    const {userName, email, password, userPfp} = req.body;
    function isMongoServerError(e) {
        return e && e.code == 11000;
    }
    try {

        if (!userName || !email || !password || userName == "" || email == "" || password == "") {
            return next(customError("All fields are required", 400));// 400 bad Request
        }

        const hashedPass = bcryptjs.hashSync(password, 10);
        const query = new userModel({
            userName,
            email,
            password: hashedPass,
            userPfp
        })
        await query.save();
        res.status(201).json("user created successfully");
    } catch (e) {
        if (isMongoServerError(e)) {
            next(customError("Email or Username already exists", 409))
        }
        else {
            next(e)
        }
    }
}


export const login = async (req, res, next) => {
    const {email, password} = req.body;

    try {
        if (!email || !password || email == "" || password == "") {
            return next(customError("All fields are required", 400));
        }
        const query = await userModel.findOne({email})
        if (query) {
            if (query?.password) {
                const isPassword = bcryptjs.compareSync(password, query.password);
                if (isPassword) {
                    const token = jwt.sign({id: query._id}, process.env.JWT_SEC_KEY, {expiresIn: "2d"})
                    const {password, ...rest} = query._doc
                    res.cookie("my_cookie", token, {httpOnly: true, sameSite: 'None', secure: true, partitioned: true}).status(200).json(rest)

                } else {
                    res.status(401).json({message: "Password is incorrect"})
                }
            }
        } else {
            return next(customError("User doesn't exist", 404))
        }
    } catch (e) {
        next(e);
    }

}



export const Oauth = async (req, res, next) => {

    try {
        const {displayName, photoURL, email} = req.body;
        if (!email || !displayName || !photoURL || email == "" || displayName == "" || photoURL == "") {
            return next(customError("All fields are required", 400));
        }
        const query = await userModel.findOne({email})
        if (!query) {
            const password = Math.floor(Math.random() * 10000).toString();
            const hashedPass = bcryptjs.hashSync(password, 10);

            const userName = displayName.trim().split(" ").join("").toLowerCase() + "_" + Math.floor(Math.random() * 10000).toString()


            const response = new userModel({
                userName,
                password: hashedPass,
                userPfp: photoURL,
                email
            })
            const userDoc = await response.save();
            const {password: pass, ...rest} = userDoc._doc;
            const token = jwt.sign({id: userDoc._id}, process.env.JWT_SEC_KEY, {expiresIn: "2d"})
            res.cookie("my_cookie", token, {httpOnly: true, sameSite: 'None', secure: true, partitioned: true}).status(201).json(rest);
        }
        else {
            const {password, ...rest} = query._doc;
            const token = jwt.sign({id: query._id}, process.env.JWT_SEC_KEY, {expiresIn: "2d"});
            res.cookie("my_cookie", token, {httpOnly: true, sameSite: 'None', secure: true, partitioned: true}).status(200).json(rest);
        }

    } catch (e) {

    }
}


