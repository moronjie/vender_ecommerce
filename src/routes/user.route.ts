import { Router } from "express";
import { forgotPassword, resetPassword, signIn, signUp } from "../controllers/auth.controler";

const router = Router()

router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)

//get users 

export default router