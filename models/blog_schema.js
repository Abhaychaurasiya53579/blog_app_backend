import mongoose from "mongoose";

const blogSchema =new mongoose.Schema(
{
tittle:{type:String,required:true},
content:{type:String,required:true},
image:{type:String},
user:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
createdon:{type:Date,default:Date.now}

}
)

const Blog = mongoose.model("blog",blogSchema );
export default Blog;