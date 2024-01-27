import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import user from "../models/user_schema.js";
import jwt from "jsonwebtoken";

const forget_password_router = express.Router();

forget_password_router.post('/', async (req, res) => {
    const { email } = req.body;
    const existinguser= await user.findOne({email:email});
   if(!existinguser)return res.status(400).send('Invalid Email');
   if(!existinguser)return res.status(202).json({msg:"unauthorized"}); 
   const reset_token = existinguser.create_reset_password_token();
  await  existinguser.save();
    // Send the email with the reset link
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sunn53579@gmail.com', // replace with your email
            pass: 'swfc znlq beed ebps' // replace with your email password
        }
    });
    console.log(email);
    const mailOptions = {
        from: 'sunn53579@gmail.com',
        to: email,
        subject: 'Password Reset',
        text: `Click the following link to reset your password: http://localhost:3000/reset_password/${reset_token}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error sending email');
        }

        // In a real forget_password_routerlication, you would store the token and email in a database
        // For simplicity, we'll just send them in the response
        
       return  res.send({Status:"success"});
    });
});

export default forget_password_router;