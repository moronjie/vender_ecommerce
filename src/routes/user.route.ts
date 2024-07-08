import { Router } from "express";
import { forgotPassword, resetPassword, signIn, signUp } from "../controllers/auth.controller";
import { deleteUser, getASingleUser, getAllUsers, updateUser } from "../controllers/user.controller";
import { authUser } from "../middleware/jwt.auth";

const router = Router()

router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)

router.get('/users', getAllUsers)
router.get('/users/:_id', getASingleUser)

router.put('/users/:_id', authUser, updateUser)
router.delete('/users/:_id', authUser, deleteUser)

export default router