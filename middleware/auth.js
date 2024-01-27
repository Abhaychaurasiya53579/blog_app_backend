import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import express from "express";
import mongoose from "mongoose"
import user from "../models/user_schema.js";

const response=(res,status,value)=>{
res.status(status).json(value);
}

const getauth= async (req,res,next)=>{
try{
const token = req.headers.token;
if(!token)res.status(202).json({msg:"unauthorized"})
else{
    const realtoken =jwt.verify(token,process.env.secret);
   const user_found= await user.findById(realtoken.user_id);
  
   req.user_id =realtoken.user_id;
   req.user_found =user_found;
}

next();
}
catch(err){
response(res,202,{error:"unautorized"});
}
}


const reset_password= async(req,res,next)=>{
const existinguser= user.findOne({email:req.body.email});

if(!existinguser)return res.status(202).json({msg:"unauthorized"});

// const reset_token = existinguser.create_reset_password_token();
return res;

}


export default {getauth,reset_password};