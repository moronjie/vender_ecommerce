import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { customError } from "./errorHandler"
import { User, userInterface } from "../model/user.model"
import { AuthReq } from "../types"


export const auth = async (req: AuthReq, res: Response, next: NextFunction) => {
    if(!req.headers.authorization) return customError("you are not authorized", 401)

    const token = req.headers.authorization?.replace("Bearer ", "")
    if (!token) return customError("you are not authorized", 401)

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { _id: string }
        if (!decoded) return customError("you are not authorized", 401)
    
        req.user = await User.findById(decoded._id).select('-password') as userInterface
        if (!req.user) return customError("User not found", 404);
    
        next()
    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500));
    }

}