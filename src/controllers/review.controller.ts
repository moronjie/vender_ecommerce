import { Request, Response, NextFunction } from "express";
import { Review, validateReview } from "../model/review.model";
import { customError } from "../middleware/errorHandler";
import { AuthReq } from "../types";

//create review controller 

export const createReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {error} = validateReview(req.body)
        if (error) return customError(error.message, 400)

        const newReview = new Review(req.body)
        const review = await newReview.save()

        res.status(201).json({
            success: true,
            message: "Review created successfully",
            data: review
        })

    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}

//get review controller 
export const getReviews = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const review = await Review.find()
        res.status(201).json({
            success: true,
            message: "review fetched successfully",
            data: review
        })
    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}

//get review controller 
export const getReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const review = await Review.findById(req.params.id)

        res.status(201).json({
            success: true,
            message: "review fetched successfully",
            data: review
        })

    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}

// update review controller 
export const updateReview = async (req: AuthReq, res: Response, next: NextFunction) => {
    try {
        const {error} = validateReview(req.body)
        if (error) return customError(error.message, 400)

        const review = await Review.findByIdAndUpdate(req.params.id, req.body, {new: true})

        res.status(201).json({
            success: true,
            message: "review update successfully",
            data: review
        })
    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}

// delete review controller 
export const deleteReview = async (req: AuthReq, res: Response, next: NextFunction) => {
    try {
        await Review.findByIdAndDelete(req.params.id)
        res.status(201).json({
            success: true,
            message: "review deleted successfully",
        })
    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}