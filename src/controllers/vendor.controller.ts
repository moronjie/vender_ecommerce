import { Request, Response, NextFunction } from "express";
import { customError } from "../middleware/errorHandler";
import { Vendor, validateVendor } from "../model/vendor.model";
import { AuthReq } from "../types";

//create controller 
export const createVendor = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const {error} = validateVendor(req.body)
        if (error) return next(customError(error.message, 400))

        const newVendor = new Vendor(req.body)
        const vendor = await newVendor.save()

        res.status(201).json({
            success: true,
            message: "vendor created successfully",
            data: vendor
        })
    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}

//get all controller 
export const getAllVendors = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const vendors = await Vendor.find().populate("user", "-password")
        res.status(200).json({
            success: true,
            message: "successfully",
            data: vendors
        })
    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}

//get one controller 
export const getSingleVendor = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const vendor = await Vendor.findById(req.params.id).populate("user", "-password")

        if(!vendor) return next(customError("vendor not found", 404))

        res.status(200).json({
            success: true,
            message: "successfully",
            data: vendor 
        })
    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}

//update controller 
export const updateVendor = async (req: AuthReq, res: Response, next: NextFunction) =>{
    try {
        const vendor = await Vendor.findById(req.params.id).populate("user")

        if(req.user && req.user._id.toString() !== vendor?.user._id.toString()) return next(customError("you are not authorized to update this user", 401))

        const updateVendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, {new: true})

        res.status(200).json({
            success: true,
            message: "successfully",
            data: updateVendor
        })

    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}

//delete controller 
export const deleteVendor = async (req: AuthReq, res: Response, next: NextFunction) =>{
    try {
        const vendor = await Vendor.findById(req.params.id).populate("user")

        if(req.user && req.user._id.toString() !== vendor?.user._id.toString()) return next(customError("you are not authorized to update this user", 401))

        await Vendor.findByIdAndDelete(req.params.id)

        res.status(200).json({
            success: true,
            message: "successfully",
        })
    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}