const {
    deleteDocument,
    getAllDocuments,
    getDocument,
    insertDocument,
    updateDocument,
} =require("../utils/db_utils");
const UserData =require("../model/user.model");
const  RegisterValidation =require( "../validation/user.validation");
const bcryptjs =require("bcryptjs")
 const userList = async (req, res) => {
    try {
        const users = await getAllDocuments(UserData, "articles");
        return res.status(200).send({"users": users})
    }catch (err){
        res.status(500).send({message:"Internal Server Error"})
    }
    }

 const insertUser = async (req, res) => {
    const data={
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        tel_number:req.body.tel_number,
        password:await bcryptjs.hash(req.body.password,10),
        passwordConfirm:req.body.passwordConfirm,

    }
    try {
        const {error}=RegisterValidation.validate(req.body)
        if (error) {
            return res.status(400).send(error.details)
        }
        const newUser = new UserData(data);
        newUser.save();
        res.status(200).send({ message: `User Successfully added ${newUser}` });
    }


    catch (error) {
        res.status(400).send({ message: `Error Creating User ${error}` });
    }
};

 const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        await deleteDocument(UserData, userId);
        res.status(200).send({message: `User Number ${userId} is Deleted`});
    }catch(err){
        res.status(500).send({message:"Internal Server Error"})
    }
};
 const updateUser = async (req, res) => {
    const {error}=RegisterValidation.validate(req.body)
    if (error) {
        return res.status(400).send(error.details)
    }
    const userId = req.params.id;
    try {
        await updateDocument(UserData, req.body, userId);
        res.status(200).send({message: `User Successfully updated `});
    }catch (err){
        res.status(500).send({message:"Internal Server Error"})
    }
};
 const getUser=async (req,res)=>{
     const email=req.params.email;
     const filter=Object.assign({email:email},{})
     try {
         const user = await getDocument(UserData, filter, "")
         res.status(200).send({user: user});
     }catch (err){
         res.status(500).send({message:"Internal Server Error"})
     }

}
 const getUserById=async (req,res)=>{
     const filter=Object.assign({_id:req.params.id},{})
     try {
         const user = await getDocument(UserData, filter, "articles")
         res.status(200).send({user: user});
     }catch (err){
         res.status(404).send({message:"Internal Server Error"})
     }

}
 const isUserExist = async (req, res) => {
    const email = req.params.email;
    try {
        const users = await getAllDocuments(UserData);
        const emails = users.map(user => user["email"])
        if (emails.includes(email))
            res.status(200).send(true)
        else
            res.status(200).send(false)
    }catch (err){
        res.status(500).send({message:"Internal Server Error"})
    }
};
module.exports={isUserExist,getUserById,getUser,insertUser,deleteUser,updateUser,userList}