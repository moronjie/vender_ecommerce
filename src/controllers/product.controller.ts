import { Request, Response, NextFunction } from "express";
import { Products, validateProduct } from "../model/products.model";
import { customError } from "../middleware/errorHandler";
import { AuthReq } from "../types";

//create product controller 

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {error} = validateProduct(req.body)
        if (error) return customError(error.message, 400)

        const newProduct = new Products(req.body)
        const product = await newProduct.save()

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product
        })

    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}

//get products controller 
export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await Products.find()
        .populate("vendor")
        .populate("category")
        .populate("brand")
        // .populate("reviews")

        res.status(201).json({
            success: true,
            message: "products fetched successfully",
            data: products
        })
    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}

//get product controller 
export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await Products.findById(req.params.id)
        .populate("vendor")
        .populate("category")
        .populate("subcategory")
        .populate("brand")
        // .populate("reviews")

        if(!product) return next(customError("product not found", 404))

        res.status(201).json({
            success: true,
            message: "product fetched successfully",
            data: product
        })

    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}

// update product controller 
export const updateProduct = async (req: AuthReq, res: Response, next: NextFunction) => {
    try {
        // const {error} = validateProduct(req.body)
        // if (error) return customError(error.message, 400)

        const product = await Products.findById(req.params.id).populate('vendor');

        if(!product) return next(customError("product not found", 404))

        // const userId = product?.vendor?.user.toString();    
        // if(req.user && req.user._id.toString() !== userId) return next(customError("you are not authorized to update this product", 401))

        const updateProduct = await Products.findByIdAndUpdate(req.params.id, req.body, {new: true})

        res.status(201).json({
            success: true,
            message: "product update successfully",
            data: updateProduct
        })
    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}

// delete product controller 
export const deleteProduct = async (req: AuthReq, res: Response, next: NextFunction) => {
    try {
        await Products.findByIdAndDelete(req.params.id)
        res.status(201).json({
            success: true,
            message: "product deleted successfully",
        })
    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}