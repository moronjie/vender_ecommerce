import { Router } from "express";
import { forgotPassword, resetPassword, signIn, signUp } from "../controllers/auth.controller";
import { deleteUser, getASingleUser, getAllUsers, updateUser } from "../controllers/user.controller";
import { authUser } from "../middleware/jwt.auth";

const router = Router()

router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)

router.get('/', getAllUsers)
router.get('/:id', getASingleUser)

router.put('/:id', authUser, updateUser)
router.delete('/:id', authUser, deleteUser)

export default router