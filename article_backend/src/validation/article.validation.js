const {Joi}=require( "express-validation")
 const ArticleValidation=Joi.object({
    title:Joi.string().required(),
    content:Joi.string().required(),
    author:Joi.string(),
    createdAt:Joi.date().iso().required(),



})
module.exports= ArticleValidation