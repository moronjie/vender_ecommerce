import { Router } from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/product.controller";
import { authUser } from "../middleware/jwt.auth";

const 
router = Router()

//create a product
router.post("/", authUser ,createProduct)

//get products 
router.get("/", getProducts)

//get a product 
router.get("/:id", getProduct)

// update a products
router.put("/:id", authUser, updateProduct)

// delete a product
router.delete("/:id", authUser, deleteProduct)

export default router 