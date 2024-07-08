import { Router } from "express";
import { authUser } from "../middleware/jwt.auth";
import { createCategory, deleteCategory, getCategory, getCategorys, updateCategory } from "../controllers/category.controller";

const 
router = Router()

//create a product
router.post("/", authUser ,createCategory)

//get products 
router.get("/", getCategorys)

//get a product 
router.get("/:id", getCategory)

// update a products
router.put("/:id", authUser, updateCategory)

// delete a product
router.delete("/:id", authUser, deleteCategory)

export default router 