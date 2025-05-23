import { Request, Response } from "express";
import Course from "../models/courseModel";
import { error } from "console";

export const listCourses = async (req:Request,res:Response):Promise<void>=>{
    const {category} = req.query;
    try{
        const courses = category && category !== "all" ? await Course.scan("category").eq(category).exec() : await Course.scan().exec();
        res.json({message:"Courses reterieved successfully",data:courses})
    }
    catch(error){
             res.status(500).json({message:"Error retrieving courses",error:error});
    }
}
export const getCourse = async (req:Request,res:Response):Promise<void>=>{
    const {courseId} = req.params;
    try{
        const course = await Course.get(courseId);
        if(!course){
            res.status(404).json({message:"Course not found"});
            return 
        }
        res.json({message:"Courses reterieved successfully",data:course})
      
    }
    catch(error){
             res.status(500).json({message:"Error retrieving course",error:error});
    }
}