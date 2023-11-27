const express=require("express")
const  {AuthMiddleware}=require("../middleware/auth.middleware")
const path=require("path")
const multer=require("multer")
const{articleList,getArticle,deleteArticle,updateArticle,insertArticle} = require("../controller/article.controller")
const router=express.Router()
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, callback) => {
        callback(null, 'image-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });
router.get("/:id",AuthMiddleware,articleList)
router.post("/",AuthMiddleware,upload.single("image"),insertArticle)
router.get("/article/:id",AuthMiddleware,getArticle)
router.put("/:id",AuthMiddleware,updateArticle)
router.delete("/:id",AuthMiddleware,deleteArticle)

module.exports=router