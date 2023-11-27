const  UserData =require( "../model/user.model");
const  RegisterValidation =require("../validation/user.validation");
const bcryptjs =require( "bcryptjs")
const {sign} =require( "jsonwebtoken")
const {generateAccessToken, generateRefreshToken} = require("../utils/token_utils");
require('dotenv').config()
const jwt=require("jsonwebtoken")
 const Register = async (req, res) => {
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
       await newUser.save();
        res.status(200).send({ message: `User Successfully added ${newUser}` });
    }


    catch (error) {
        res.status(400).send({ message: `Error Creating User ${error}` });
    }
};
 const Login = async (req, res) => {
    const {email,password}=req.body;
    const user=await UserData.findOne({email:email})
    if(!user){
        res.status(400).send({message:'User Not Found'})
        return;
    }
    else{
        if(!await bcryptjs.compare(password,user.password)){
            res.status(400).send({message:'Invalid Credentials'})
            return
        }
        const payload={id:user._id}
        const accessToken=generateAccessToken(payload)
        const refreshToken=generateRefreshToken(payload)
        res.status(200).send({accessToken:accessToken,refreshToken:refreshToken})
    }
}
 const Logout=async(req,res)=>{
    res.cookie('jwt','',{maxAge:0})
    res.status(200).send({message:'User Successfully Logged Out'})

}
const refreshToken=async (req, res) => {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token missing' });
    }

    try {
        const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        const accessToken = generateAccessToken({ userId: user.userId });

        res.json({ accessToken });
    } catch (err) {
        console.error('Refresh token verification failed:', err);
        res.status(403).json({ message: 'Invalid refresh token' });
    }
}
module.exports={Logout,Login,Register,refreshToken}
