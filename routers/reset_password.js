import express from 'express';
import user from "../models/user_schema.js";
import crypto from "crypto";
import bcrypt from "bcrypt";


const reset_password_router = express.Router();

reset_password_router.put('/:token', async (req, res) => {
    console.log("token")
const {password,confirm_password}=req.body;
if(password!==confirm_password )return res.status(400).json({msg:"password not matching"});
const hash= crypto.createHash('sha256').update(req.params.token).digest("hex");
console.log(hash);
 const existinguser=  await user.findOne({password_reset_token :hash});
 const hashpassword = await bcrypt.hash(password,10);
 console.log(existinguser.password_reset_token_expires);
 console.log(Date.now());
 if(existinguser.password_reset_token_expires<Date.now()){
    console.log("session expired")
    return res.status(400).json({msg:"session expired"});
 }
 else{
    existinguser.password= hashpassword;
    existinguser.save();
 }

console.log(password)
 console.log(existinguser)

return res.status(200).json({msg:"password changed successfully"})
})

export default reset_password_router;