import { Request, Response, NextFunction } from "express";
import { Brand, validateBrand } from "../model/brand.model";
import { customError } from "../middleware/errorHandler";
import { AuthReq } from "../types";

//create brand controller 

export const createBrand = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {error} = validateBrand(req.body)
        if (error) return customError(error.message, 400)

        const newBrand = new Brand(req.body)
        const brand = await newBrand.save()

        res.status(201).json({
            success: true,
            message: "Brand created successfully",
            data: brand
        })

    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}

//get brand controller 
export const getBrands = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const brand = await Brand.find()
        res.status(201).json({
            success: true,
            message: "brand fetched successfully",
            data: brand
        })
    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}

//get brand controller 
export const getBrand = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const brand = await Brand.findById(req.params.id)

        res.status(201).json({
            success: true,
            message: "brand fetched successfully",
            data: brand
        })

    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}

// update brand controller 
export const updateBrand = async (req: AuthReq, res: Response, next: NextFunction) => {
    try {
        const {error} = validateBrand(req.body)
        if (error) return customError(error.message, 400)

        const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {new: true})

        res.status(201).json({
            success: true,
            message: "brand update successfully",
            data: brand
        })
    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}

// delete brand controller 
export const deleteBrand = async (req: AuthReq, res: Response, next: NextFunction) => {
    try {
        await Brand.findByIdAndDelete(req.params.id)
        res.status(201).json({
            success: true,
            message: "brand deleted successfully",
        })
    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}