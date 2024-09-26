import { Request, Response, NextFunction } from "express"
import { User, validateUserSignUp } from "../model/user.model"
import { customError } from "../middleware/errorHandler"
import { AuthReq } from "../types"
import mongoose from "mongoose"

// get a single user 
export const getASingleUser = async (req: AuthReq, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).send('Invalid user ID');
        }

        const user = await User.findById(userId).select('-password')

        if (!user) return next(customError("user not found", 404))
            
        res.status(200).json({
            success: true,
            message: "user retrieved successfully",
            data: user
        })
    } catch (err) {

        console.error('Error retrieving user:', err);

        const error = err as Error
        next(customError(error.message, 500))
    }
}

// get all users 
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allUser = await User.find().select('-password')
        res.status(200).json({
            success: true,
            message: "users retrieved successfully",
            data: allUser
        })
    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}

// update a user
export const updateUser = async (req: AuthReq, res: Response, next: NextFunction) => {
    try {

        if(req.user?._id.toString() && req.user._id.toString() !== req.params.id) return next(customError("you are not authorized to update this user", 401))

        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password')
        res.status(200).json({
            success: true,
            message: "user updated successfully",
            data: user
        })
    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}

// delete a user 
export const deleteUser = async (req: AuthReq, res: Response, next: NextFunction) => {
    try {
        if(req.user?._id.toString() && req.user._id.toString() !== req.params.id) return next(customError("you are not authorized to update this user", 401))
        
        await User.findByIdAndDelete(req.params.id)

        res.status(200).json({
            success: true,
            message: "user deleted successfully"
        })
        
    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}
