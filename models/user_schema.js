import mongoose from "mongoose";
import crypto from "crypto";

const userSchema =new mongoose.Schema(
{
name:{type:String},
email:{type:String,  required:true},
password:{type:String,required:true},
password_reset_token:{type:String},
password_reset_token_expires:{type:String },
}
)
userSchema.methods.create_reset_password_token= function(){
const reset_token= crypto.randomBytes(32).toString("hex");
this.password_reset_token= crypto.createHash('sha256').update(reset_token).digest("hex");
this.password_reset_token_expires= Date.now()+10*60*1000 ;

console.log(reset_token,this.password_reset_token);
return reset_token;
}

const User = mongoose.model("user",userSchema);
export default User;