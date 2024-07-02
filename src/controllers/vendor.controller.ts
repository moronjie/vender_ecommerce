import { Request, Response, NextFunction } from "express";
import { customError } from "../middleware/errorHandler";

//create controller 
export const createVendor = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        
    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}

//get all controller 
export const getAllVendors = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        
    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}

//get one controller 
export const getSingleVendor = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        
    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}

//update controller 
export const updateVendor = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        
    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}

//delete controller 
export const deleteVendor = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        
    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}