import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
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

export default getauth;