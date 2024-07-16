import { Request, Response, NextFunction } from "express";
import { Order, validateOrder } from "../model/order.model";
import { customError } from "../middleware/errorHandler";
import { AuthReq } from "../types";

//create order controller 

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {error} = validateOrder(req.body)
        if (error) return customError(error.message, 400)

        const newOrder = new Order(req.body)
        const order = await newOrder.save()

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            data: order
        })

    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}

//get order controller 
export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = await Order.find()
        res.status(201).json({
            success: true,
            message: "order fetched successfully",
            data: order
        })
    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}

//get order controller 
export const getOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = await Order.findById(req.params.id)
        if(!order) return next(customError("order not found", 404))

        res.status(201).json({
            success: true,
            message: "order fetched successfully",
            data: order
        })

    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}

// update order controller 
export const updateOrder = async (req: AuthReq, res: Response, next: NextFunction) => {
    try {
        // const {error} = validateOrder(req.body)
        // if (error) return customError(error.message, 400)

        const order = await Order.findById(req.params.id)

        if(!order) return next(customError("order not found", 404))

        const updateOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {new: true})

        res.status(201).json({
            success: true,
            message: "order update successfully",
            data: updateOrder
        })
    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}

// delete order controller 
export const deleteOrder = async (req: AuthReq, res: Response, next: NextFunction) => {
    try {
        const order = await Order.findById(req.params.id)

        if(!order) return next(customError("order not found", 404))

        await Order.findByIdAndDelete(req.params.id)
        res.status(201).json({
            success: true,
            message: "order deleted successfully",
        })
    } catch (err) {
        const error = err as Error
        next(customError(error.message, 500))
    }
}