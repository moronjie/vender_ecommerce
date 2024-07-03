import { Router} from "express";
import { authUser } from "../middleware/jwt.auth";
import { createVendor, deleteVendor, getAllVendors, updateVendor } from "../controllers/vendor.controller";
import { getASingleUser } from "../controllers/user.controler";

const router = Router()

//create vendor
router.post("/", authUser, createVendor)

//get vendors 
router.get("/", getAllVendors)

//get single vendor
router.get("/:id", getASingleUser)

//update vendor
router.put("/:id", authUser, updateVendor)

//delete vendor
router.delete("/:id", authUser, deleteVendor)

export default router 