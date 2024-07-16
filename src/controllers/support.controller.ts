import { Request, Response, NextFunction } from "express";
import { Support, validateSupport } from "../model/support.model";
import { customError } from "../middleware/errorHandler";
import { AuthReq } from "../types";

//create support controller 

export const createSupport = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {error} = validateSupport(req.body)
        if (error) return customError(error.message, 400)

        const newSupport = new Support(req.body)
        const support = await newSupport.save()

        res.status(201).json({
            success: true,
            message: "Support created successfully",
            data: support
        })

    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}

//get support controller 
export const getSupports = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const support = await Support.find()
        res.status(201).json({
            success: true,
            message: "support fetched successfully",
            data: support
        })
    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}

//get support controller 
export const getSupport = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const support = await Support.findById(req.params.id)
        if(!support) return next(customError("support not found", 404))

        res.status(201).json({
            success: true,
            message: "support fetched successfully",
            data: support
        })

    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}

// update support controller 
export const updateSupport = async (req: AuthReq, res: Response, next: NextFunction) => {
    try {
        // const {error} = validateSupport(req.body)
        // if (error) return customError(error.message, 400)

        const support = await Support.findById(req.params.id)

        if(!support) return next(customError("support not found", 404))

        const updateSupport = await Support.findByIdAndUpdate(req.params.id, req.body, {new: true})

        res.status(201).json({
            success: true,
            message: "support update successfully",
            data: updateSupport
        })
    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}

// delete support controller 
export const deleteSupport = async (req: AuthReq, res: Response, next: NextFunction) => {
    try {
        const support = await Support.findById(req.params.id)

        if(!support) return next(customError("support not found", 404))

        await Support.findByIdAndDelete(req.params.id)
        res.status(201).json({
            success: true,
            message: "support deleted successfully",
        })
    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}