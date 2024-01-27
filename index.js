import express from "express";
import dotenv from"dotenv";
import cors from "cors";
import "./db/database.js";
import user_router from "./routers/user_route.js";
import blog_router from "./routers/blog_route.js";
import forget_password_router from "./routers/forget_password.js";
import reset_password_router from "./routers/reset_password.js";
const BASE_URL =process.env.BASE_URL;
import middle from "./middleware/auth.js";

dotenv.config();
const port = process.env.PORT;
const app =express();
app.use(express.json());

app.use(cors({credantials:true}));


app.use("/api/user", user_router);
app.use("/api/blog", blog_router);
app.use("/api/forget_password", forget_password_router );
app.use("/api/reset_password", reset_password_router );

app.listen(port,()=>{
    console.log(`server is running on` ,port);
})
