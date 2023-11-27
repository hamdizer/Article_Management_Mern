const userRoutes =require( "./routes/user.routes");
const articleRoutes =require( "./routes/articles.routes");
const authRoutes =require( "./routes/auth.routes");
const {uploadImage}=require("./controller/article.controller")
const cors=require("cors")
const express=require("express")
const {connectToDatabase} = require("./utils/db_utils");
const path=require("path")
const multer=require("multer")
require("dotenv").config()
const cookieParser=require("cookie-parser")
const bodyParser=require("body-parser")
const app=express()
app.use(bodyParser())
app.use(cookieParser())
app.use(cors({
    origin:['http://localhost:3000'],
    credentials:true
}))

app.use("/users",userRoutes)
app.use("/articles",articleRoutes)
app.use("/auth",authRoutes)
app.use('/uploads', express.static('uploads'));

app.listen(`${process.env.PORT}`,()=>{
    console.log(`Server is listening on port ${process.env.PORT}`)})

connectToDatabase(process.env.MONGO_URL,"Article_Management").then(()=>{
    console.log("Connected to database Successfully")
})
.catch(()=>{console.log("Connection problem")})