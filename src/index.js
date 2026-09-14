import { configDotenv } from 'dotenv';
import express from 'express'
import { ConnectDb } from './config/db.js';
import UserRoutes from './routes/user.routes.js'
import PostRoutes from '../src/routes/post.routes.js'
import cookieParser from 'cookie-parser';
configDotenv()





const app = express()


app.use(cookieParser())
app.use(express.json());
app.use('/uploads', express.static('uploads'));

ConnectDb()



app.use("/user",UserRoutes)

app.use("/post",PostRoutes)
app.listen(4000,function(){
    console.log("running...");
})