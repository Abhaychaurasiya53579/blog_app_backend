import express from "express";
import blog from "../models/blog_schema.js";
import getauth from "../middleware/auth.js";



const blog_route = express.Router();
const response =(res,status,result)=>{
    res.status(status).json(result);
}

blog_route.post("/create",getauth,async(req,res)=>{
    
    try{
        console.log(req.body);
        const {tittle,content,image}=req.body;
        
        if(tittle &&content){
    const user = req.user_id;
            const new_blog = await  blog.create({tittle,content,image, user});
        //   console.log(req.body);
            res.json({"name":"abhay"});
        }
        else res.status(202).json({err})  
    }
   catch(err){
res.status(202).json({err});
   }
})

blog_route.put("/update/:id",getauth,async (req,res)=>{
const {tittle,content,image}=req.body;
await blog.findOneAndUpdate({_id :req.params.id},{tittle,content,image})
.then((result)=>res.json(result))
.catch((err)=>res.status(202).json({msg:err}))

})

blog_route.get("/find",getauth,async (req,res)=>{
    
    await blog.find().populate("user").sort("-createdon")
    .then(result=>res.json(result))
    .catch((err)=>res.json({msg:err}))
    
    })

    blog_route.get("/user/find",getauth,async (req,res)=>{
    try{
        return res.json({id:req.user_id})
    }
      catch{(err)=>res.json({msg:err}) } 
      
        
        })

    blog_route.delete("/del/:id",getauth,async (req,res)=>{
      try{
        console.log("abhay");
        const selected_blog =await blog.findById(req.params.id);
        console.log(selected_blog.user);
        console.log(req.user_id);
        if(selected_blog.user!=req.user_id) {
           res.status(202).json({msg:"unauthorized"});
        }
        else{
         const delete_blog = await blog.findByIdAndDelete (req.params.id);
       if(!delete_blog)return res.json({error:"blog not found"});
       else return res.json(delete_blog)
        }
    }
    
    
    catch{(err)=>res.json({msg:err})}
        
        })


        blog_route.get("/:id",getauth,async (req,res)=>{
            console.log("update_arrived");
           const found_blog= blog.findById(req.params.id)
            
           .then((result) =>{
            console.log(result);
            res.json(result)
           })
           .catch (err=>res.json({msg:err}))
        
        })

      


export default blog_route;
