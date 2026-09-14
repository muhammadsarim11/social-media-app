import express from 'express'
import { AuthProtect } from '../middlewares/auth.middleware.js'
import upload from '../middlewares/multer.middleware.js'
import { createPost } from '../controller/post.controller.js'




const router = express.Router()


router.post('/create',  AuthProtect, upload.single('image'), createPost);




export default router