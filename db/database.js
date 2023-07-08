import dotenv from "dotenv"
import mongoose from "mongoose";
dotenv.config();

const mongo_url =process.env.mongo_url;

mongoose.connect(mongo_url)
.then(()=>console.log("connected to database"))
.catch((err)=>console.log(err));


