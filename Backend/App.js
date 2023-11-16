import express from"express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {config }from "dotenv";
import morgan from "morgan";
import courseRoutes from './routes/course.routes.js'
import paymentRoutes from './routes/payment.routes.js'
import userRoutes from "./routes/user.routes.js"
import errorMiddleware from "./middlewares/error.middleware.js";
config();

const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    credentials:true
}));

app.use(cookieParser());

app.use(morgan("dev"));

app.use("/ping",(req,res)=>{
    res.send('/pong');
})



app.use("/api/v1/user",userRoutes)
app.use("/api/v1/courses",courseRoutes)
app.use("/api/v1/payment",paymentRoutes)
    

// pta na dekkh rha ruk
// code kaha kaha ha
app.all('/',(req,res)=>{
    res.status(400).send("OOPS!! ")
})

app.use(errorMiddleware);
export default app;