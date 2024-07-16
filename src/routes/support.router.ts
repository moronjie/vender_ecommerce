import { Router } from "express";
import { authUser } from "../middleware/jwt.auth";
import { createSupport, deleteSupport, getSupport, getSupports, updateSupport } from "../controllers/support.controller";

const 
router = Router()

//create a product
router.post("/", authUser ,createSupport)

//get products 
router.get("/", getSupports)

//get a product 
router.get("/:id", getSupport)

// update a products
router.put("/:id", authUser, updateSupport)

// delete a product
router.delete("/:id", authUser, deleteSupport)

export default router 