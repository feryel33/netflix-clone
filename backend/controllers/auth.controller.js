import e from "express";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenandSetCookie } from "../utils/generateToken.js";

export async function signup(req, res) {
   try{
        const {email, password, username} = req.body;



        if(!email || !password || !username){
            return res.status(400).json({message: "Please fill all the fields"});
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({message: "Please enter a valid email"});
        }
        if(password.length < 6){
            return res.status(400).json({success:false, message: "Password must be at least 6 characters"});
        }
        const existingUserByEmail = await User.findOne({email:email});
        if(existingUserByEmail){
            return res.status(400).json({success:false,message: "User with this email already exists"});
        }
        const existingUserByUsername = await User.findOne({username:username});
        if(existingUserByUsername){
            return res.status(400).json({success:false,message: "User with this username already exists"});
        } 

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const   PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
        
        
        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];
        
        const newUser =  new User ({
            username: username,
            email: email,
            password: hashedPassword,
            image: image,
        });


            generateTokenandSetCookie(newUser._id, res);
            await newUser.save();
            res.status(200).json({success:true, user: {
                ...newUser._doc,
                password:""
    
            },
        });




   } catch (error) {
        console.log("Error in signup controller: ", error.message);
        res.status(500).json({success:false,message: "Internal server error"});
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please fill all the fields" });
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ success: false, message: "Invalid credentials" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
        generateTokenandSetCookie(user._id, res);
        res.status(200).json({
            success: true,
            user: {
                ...user._doc,
                password: ""
            },
        });
    } catch (error) {
        console.log("Error in login controller: ", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
        
    }
}





export async function logout(req, res) {
    try {
        res.clearCookie("jwt-netflix");
        res.status(200).json({success:true, message: "User logged out successfully"});

        
    } catch (error) {
        console.log("Error in logout controller: ", error.message);
        res.status(500).json({success:false,message: "Internal server error"});
        
    }
}