import { Router } from "express";
import { authUser } from "../middleware/jwt.auth";
import { createBrand, deleteBrand, getBrand, getBrands, updateBrand } from "../controllers/brand.controler";

const 
router = Router()

//create a product
router.post("/", authUser ,createBrand)

//get products 
router.get("/", getBrands)

//get a product 
router.get("/:id", getBrand)

// update a products
router.put("/:id", authUser, updateBrand)

// delete a product
router.delete("/:id", authUser, deleteBrand)

export default router 