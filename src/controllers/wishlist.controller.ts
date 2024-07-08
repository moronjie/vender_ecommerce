import { Request, Response, NextFunction } from "express";
import { WishList} from "../model/wishlist.model";
import { customError } from "../middleware/errorHandler";
import { AuthReq } from "../types";

//create wishlist controller 

export const createWishList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newWishList = new WishList(req.body)
        const wishlist = await newWishList.save()

        res.status(201).json({
            success: true,
            message: "WishList created successfully",
            data: wishlist
        })

    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}

//get wishlist controller 
export const getWishLists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const wishlist = await WishList.find().populate("user", "-password").populate("products")
        res.status(201).json({
            success: true,
            message: "wishlist fetched successfully",
            data: wishlist
        })
    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}

//get wishlist controller 
export const getWishList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const wishlist = await WishList.findById(req.params.id).populate("user", "-password").populate("products")

        res.status(201).json({
            success: true,
            message: "wishlist fetched successfully",
            data: wishlist
        })

    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}

// update wishlist controller 
export const updateWishList = async (req: AuthReq, res: Response, next: NextFunction) => {
    try {
        const wishlist = await WishList.findByIdAndUpdate(req.params.id, req.body, {new: true})

        res.status(201).json({
            success: true,
            message: "wishlist update successfully",
            data: wishlist
        })
    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}

// delete wishlist controller 
export const deleteWishList = async (req: AuthReq, res: Response, next: NextFunction) => {
    try {
        await WishList.findByIdAndDelete(req.params.id)
        res.status(201).json({
            success: true,
            message: "wishlist deleted successfully",
        })
    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}