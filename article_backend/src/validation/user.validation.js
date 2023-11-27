const {Joi}=require( "express-validation")
 const RegisterValidation=Joi.object({
    firstName:Joi.string().required(),
    lastName:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().required(),
    passwordConfirm:Joi.string().required(),
    tel_number:Joi.number().required(),
    articles:Joi.array()



})
module.exports=RegisterValidation