const express = require("express");
const {Login,Register,Logout,refreshToken}=require("../controller/auth.controller")
const  {AuthMiddleware}=require("../middleware/auth.middleware")

const router=express.Router()
router.post("/register",Register)
router.post("/login",Login)
router.post("/logout",AuthMiddleware,Logout)
router.post('/refresh-token',AuthMiddleware,refreshToken );



module.exports=router