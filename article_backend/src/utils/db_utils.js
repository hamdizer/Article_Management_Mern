const {connect}=require ( "mongoose");

 const connectToDatabase=async (url,database)=>{
     await connect(`${url}/${database}`);
}
 const insertDocument=async (model,document)=>{
   await  model.create(document);
}
 const updateDocument=async (model,id,data,populate)=>{
   await  populate?model.findOneAndUpdate( { _id: id },
       { $set:  data },{new:true}).populate():await model.findByIdAndUpdate( { _id: id },
       { $set:  data } ,{new:true})}
 const deleteDocument=async (model,id)=>{
     await model.findByIdAndDelete(id);
}
 const getDocument= async (model,filter,populate="") => {
    return populate? await model.findOne(filter).populate(populate): model.findOne(filter);
};
 const getAllDocuments=async (model,populate)=>{
   return   await populate? model.find().populate(populate): model.find();
}
module.exports={connectToDatabase,getDocument,getAllDocuments,deleteDocument,updateDocument,insertDocument}