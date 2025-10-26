import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/async-handler.js";
import jwt from "jsonwebtoken"


export const varifyJWT = asyncHandler(async (req, res, next) => {
    try {
    
        let token = 
            req.cookies?.accessToken || 
            req.headers.authorization?.replace("Bearer ", "") ||
            req.headers["authorization"]?.replace("Bearer ", "");
        
        if (!token && req.headers.cookie) {
            const cookies = req.headers.cookie.split(';').reduce((acc, cookie) => {
                const [key, value] = cookie.trim().split('=');
                acc[key] = value;
                return acc;
            }, {});
            token = cookies.accessToken;
        }
        
        if(!token){
            throw new ApiError(401, "Unauthorised request")
        }
    
        const decoderToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET )
    
        const user = await User.findById(decoderToken?._id).select(
            "-password -refreshToken"
        )
    
        if(!user){
            throw new ApiError(401, "Invalid access token")
        }
    
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "invalid access token")
    }

})