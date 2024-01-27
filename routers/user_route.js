import express from "express";
import mongoose from "mongoose"
import user from "../models/user_schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from"dotenv";
import getauth from "../middleware/auth.js";
dotenv.config();

 const user_router = express.Router();
user_router.use(express.json());


user_router.get("/find" ,async(req,res)=>{
  await user.find()
  .then((result)=>{
    res.status(202).json(result);
  })
  .catch((err)=>res.status(404).json(err))

})

 user_router.post("/create",async(req,res)=>{
    try{
      
      const {email,password}=req.body;
      const existinguser= await user.findOne({email:email});
    if(existinguser)res.status(401).json({msg:"old_user"})
      else{
      console.log(req.body);

      console.log("arrived2");
        
        const hashpassword = await bcrypt.hash(password,10);
     const new_user=  await user.create({email,password:hashpassword})
     console.log(new_user);
        res.json({msg:"user created"})
      }
    }
    catch(err){
     res.json({msg:err})
    }
 })

 user_router.post("/login",async(req,res)=>{
    try{
      
        const {email,password}=req.body;
      const existinguser= await user.findOne({email:email});
      console.log(existinguser)
      
      if(!existinguser)res.status(404).json({msg:"user not found"})
      else{
        const compare_password = await bcrypt.compare(password,existinguser.password);
        if(!compare_password)res.status(400).json({msg:"email and password do not match"});
        else{
        const token = await jwt.sign({ user_id:existinguser._id},process.env.secret);
        res.status(202).json({token:token});
        }
      }
     



     
    }
    catch(err){
     res.status(404).json({msg:err})
    }
 })


 user_router.get("/auth",getauth,(req,res)=>{
  res.status(200).json(req.user_found);
 })

export default user_router;