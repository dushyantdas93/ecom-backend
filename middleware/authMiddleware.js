import JWT from "jsonwebtoken"
import userModel from "../models/userModels.js"


// protected route token based

export const     = async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        next()
    } catch (error) {
        console.log(error)
    }
}