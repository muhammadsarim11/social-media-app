import { configDotenv } from 'dotenv';
import express from 'express'
import { ConnectDb } from './config/db.js';
import UserRoutes from './routes/user.routes.js'

import cookieParser from 'cookie-parser';
import { verifyTransporter } from '../utils/sendEmail.js';
configDotenv()



const app = express()

app.use(express.json())
app.use(cookieParser())



ConnectDb()
verifyTransporter()


app.use("/user",UserRoutes)


app.listen(4000,function(){
    console.log("running...");
})