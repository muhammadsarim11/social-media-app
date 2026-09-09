import express from 'express'
import { changePassword, forgetPassword, getAccessToken, GetUserDetails, LoginUser, LogOut, RegisterUser } from '../controller/user.controller.js'


const router = express.Router()

router.post("/register",RegisterUser)
router.post("/login",LoginUser)

router.get("/me",GetUserDetails)

router.get("/refresh-token",getAccessToken)

router.get("/logout",LogOut)

router.post("/forgot-password",forgetPassword)

router.post("/verify-password/:resetToken",changePassword)


export default router