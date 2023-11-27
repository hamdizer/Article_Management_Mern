const  {mongoose,   Schema, model } =require ("mongoose")


const articleSchema=new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    imageURL: {
        type: String,
    },



})
const ArticleData=model('Article',articleSchema)
module.exports=ArticleData;