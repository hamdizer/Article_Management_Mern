const {
    deleteDocument,
    getAllDocuments,
    getDocument,
    insertDocument,
    updateDocument,
}= require( "../utils/db_utils");
const UserData=require("../model/user.model")
const ArticleValidation=require("../validation/article.validation")
    const  Article =require( "../model/article.model")

 const articleList = async (req, res) => {
    const userId=req.params.id
    const articles = await getDocument(UserData,{_id:userId},"articles");
    res.status(200).send({ articles: articles?.articles });

};
 const insertArticle = async (req, res) => {
    const data={
        title:req.body.title,
        content:req.body.content,
        author:req.user.id,
        createdAt:req.body.createdAt,
        imageURL:`http://localhost:8000/uploads/${req.file.filename }`


    }
    try {
        const {error}=ArticleValidation.validate(req.body)
        if (error) {
            return res.status(400).send(error.details)
        }
        const newArticle = new Article(data);
        newArticle.save();
        const user=await getDocument(UserData,req.user._id,"articles")
        user.articles.push(newArticle._id)
        user.save()
        res.status(200).send({ message: `Article Successfully added ${newArticle}`});
    }


    catch (error) {
        res.status(400).send({ message: `Error Creating Article ${error}` });
    }
};

 const deleteArticle = async (req, res) => {
    const articleId = req.params.id;
    try {
        await deleteDocument(Article, articleId);
        res.status(200).send({message: `Article Number ${articleId} is Deleted`});
    }catch(err){
        res.status(500).send({message:"Internal Error",error:err})

        }
};
 const updateArticle= async (req, res) => {
    const {error}=ArticleValidation.validate(req.body)
    if (error) {
        return res.status(400).send(error.details)
    }
    const articleId = req.params.id;
    try {
        await updateDocument(Article, articleId, req.body);
        res.status(200).send({message: `Article Successfully updated `});
    }catch (err){
        res.status(500).send({message:"Internal Server Error",error:err})
    }
};
 const getArticle=async (req,res)=>{
    const id=req.params.id
     const filter=Object.assign({_id:id},{})
     try {
         const article = await getDocument(Article, filter)
         res.status(200).send({article: article});
     }
     catch (err){
        res.status(404).send({message:"Not Found"})
     }

}


module.exports={articleList,insertArticle,deleteArticle,updateArticle,getArticle}