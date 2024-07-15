import { Request, Response, NextFunction } from "express";
import { Category, validateCategory } from "../model/category.model";
import { customError } from "../middleware/errorHandler";
import { AuthReq } from "../types";

//create category controller 

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {error} = validateCategory(req.body)
        if (error) return customError(error.message, 400)

        const newCategory = new Category(req.body)
        const category = await newCategory.save()

        res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: category
        })

    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}

//get category controller 
export const getCategorys = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await Category.find()
        res.status(201).json({
            success: true,
            message: "category fetched successfully",
            data: category
        })
    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}

//get category controller 
export const getCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await Category.findById(req.params.id)

        if(!category) return next(customError("category not found", 404))

        res.status(201).json({
            success: true,
            message: "category fetched successfully",
            data: category
        })

    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}

// update category controller 
export const updateCategory = async (req: AuthReq, res: Response, next: NextFunction) => {
    try {
        // const {error} = validateCategory(req.body)
        // if (error) return customError(error.message, 400)
        const category = await Category.findById(req.params.id)

        if(!category) return next(customError("category not found", 404))

        const UpdatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true})

        res.status(201).json({
            success: true,
            message: "category update successfully",
            data: UpdatedCategory
        })
    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}

// delete category controller 
export const deleteCategory = async (req: AuthReq, res: Response, next: NextFunction) => {
    try {
        const category = await Category.findById(req.params.id)

        if(!category) return next(customError("category not found", 404))
            
        await Category.findByIdAndDelete(req.params.id)
        res.status(201).json({
            success: true,
            message: "category deleted successfully",
        })
    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}