import jwt from 'jsonwebtoken'
import { Component } from 'react';

export const adminLogin = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
            return res.status(401).json({success: false, message: "Invalid credentials"})
        }
        const token = jwt.sign({email}, process.env.JWT_SECRET)
        res.json({success: true, token})
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}


export const getAllComments = async (req,res) =>{
    try {
        const comments = await Comment.find({}).populate('blogId').sort({createdAt:-1})
        res.json({success: true, comments})
        } catch (error) {
            res.json({success: false, message: error.message})
        
    }
}

export const getDashboard = async (req,res) =>{
    try {
        const recentBlogs = await blogs.find({}).sort({createdAt: -1}).limit(15);
        const blogs = await blogs.countDocuments();
        
        const comments = await Component.countDocuments();
        const drafts = await blogs.countDocuments({isPublished: false})

        const getDashboard = {
            blogs, comments, drafts, recentBlogs
        } 
        res.json({success: true, comments})
        
    } catch (error) {
        res.json({success: false, message: error.message})
        
    }
} 