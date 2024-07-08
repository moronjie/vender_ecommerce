import { Router } from "express";
import { authUser } from "../middleware/jwt.auth";
import { createWishList, deleteWishList, getWishList, getWishLists, updateWishList } from "../controllers/wishlist.controller";

const 
router = Router()

//create a product
router.post("/", authUser ,createWishList)

//get products 
router.get("/", getWishLists)

//get a product 
router.get("/:id", getWishList)

// update a products
router.put("/:id", authUser, updateWishList)

// delete a product
router.delete("/:id", authUser, deleteWishList)

export default router 