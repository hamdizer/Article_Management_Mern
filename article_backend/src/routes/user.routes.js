const express = require("express");
const {userList,getUser,deleteUser,updateUser,insertUser,isUserExist,getUserById}=require("../controller/user.controller")
const {AuthMiddleware} = require("../middleware/auth.middleware");
const router=express.Router()
router.get("/",userList)
router.post("/",insertUser)
router.get("/:id",AuthMiddleware,getUserById)
router.put("/:id",AuthMiddleware,updateUser)
router.delete("/:id",AuthMiddleware,deleteUser)
router.get("/user/:email",AuthMiddleware, getUser);
router.get("/exists/:email",isUserExist)


module.exports=router