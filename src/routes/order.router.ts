import { Router } from "express";
import { authUser } from "../middleware/jwt.auth";
import { createOrder, deleteOrder, getOrder, getOrders, updateOrder } from "../controllers/order.controller";

const 
router = Router()

//create a product
router.post("/", authUser ,createOrder)

//get products 
router.get("/", getOrders)

//get a product 
router.get("/:id", getOrder)

// update a products
router.put("/:id", authUser, updateOrder)

// delete a product
router.delete("/:id", authUser, deleteOrder)

export default router 