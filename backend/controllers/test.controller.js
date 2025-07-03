import mongoose from "mongoose";
import Test from "../models/test.model.js";

export const getTests = async (req,res) => {
    try {
        const tests = await Test.find({});
        res.status(200).json({ success: true, data: tests });
    }   catch (error) {
        console.log("Error in fetching products: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const createTests = async (req,res) => {
    const test = req.body;

    if(!test.name || !test.price || !test.image) {
        return res.status(400).json({ success:false, message: "Please provide all fields" });
    }

    const newTest = new Test(test)

    try {
        await newTest.save();
        res.status(201).json({ success: true, data: newTest});
    }   catch (error) {
        console.error("Error in creating test: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }   
};

export const updateTests = async (req,res) => {
    const { id } = req.params;

    const test = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json ({ success: false, message: "Invalid Prodduct Id" });
    }
    
    try {
        const updatedTest= await Test.findByIdAndUpdate(id, test,{new:true});
        res.status(200).json({ success: true, message: updatedTest });
    }   catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const deleteTests = async (req,res) => {
    const { id } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json ({ success: false, message: "Invalid Prodduct Id" });
    }
    
    try {
        await Test.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product Deleted" });
    }   catch (error) {
        console.log("Error in deleting product", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};