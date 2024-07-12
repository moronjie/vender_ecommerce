import { Router} from "express";
import { authUser } from "../middleware/jwt.auth";
import { createVendor, deleteVendor, getAllVendors, getSingleVendor, updateVendor } from "../controllers/vendor.controller";

const router = Router()

//create vendor
router.post("/", authUser, createVendor)

//get vendors 
router.get("/", getAllVendors)

//get single vendor
router.get("/:id", getSingleVendor)

//update vendor
router.put("/:id", authUser, updateVendor)

//delete vendor
router.delete("/:id", authUser, deleteVendor)

export default router 