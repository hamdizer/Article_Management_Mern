const  {mongoose,   Schema, model } =require ("mongoose")


const UserSchema=new Schema({
    email:{type:String,required:true,unique:true},
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    tel_number:{type:Number,required:true,unique:true},
    password:{type:String,required:true},
    articles:[{type:mongoose.Schema.Types.ObjectId,ref:"Article"}]



})
const UserData=model('User',UserSchema)
module.exports=UserData