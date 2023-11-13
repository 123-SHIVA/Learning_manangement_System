
import Course from "../models/course.model.js"
import AppError from "../utils/error.util.js";
import fs from "fs/promises";
import cloudinary from "cloudinary";

const getAllCourses=async function(req,res,next){
   try {
     const {Course}=req.body;
    const courses=await Course.find({}).select('-lectures');

    res.status(200).json({
        success:true,
        message:'All courses',
        courses,
    });
    
   } catch (e) {

    next(new AppError(e.message,500))
    
   }

}

const getLectureByCourseId=async function(req,res,next){

    try {
        const {id}=req.params;
        console.log(id)
        const course=await Course.findById(id);
        console.log(course)

        if(!course){
            return next(
                new AppError('Invalid course id ',400)
            )
        }

        res.status(200).json({
            success:true,
            message:"course lecture fetched successfully",
            lectures:course.lectures
        })
        
    } catch (e) {
        next(new AppError(e.message,500))
        
    }

}

const createCourse=async(req,res,next)=>{

    const {title,description,Category,createdBy}=req.body;

    if(!title || !description || !Category || ! createdBy){
        return next(
            new AppError("All field is required",400)
        )
    }

    const course=await Course.create({
        title,
        description,
        Category,
        createdBy,
        thumbnail:{
            public_id:"Dummy",
            secure_url:'Dummy',
        },
    })


    if(!course){
        return next(
            new AppError('Course could not  find,please try again',500)
        )
    }
try{
    
    if(req.file){
        const result = await cloudinary.v2.uploader.upload(req.file.path,{
            folder:'lms'
        });

        if(result){
            course.thumbnail.public_id=result.public_id;
            course.thumbnail.secure_url=result.secure_url;
        }


        fs.rm(`uploads/${req.file.filename}`)

    }
}catch(e){

    return next(
        new AppError(e.message,500)
    )

}


    await course.save();

    res.status(200).json({
        success:true,
        message:'Course created succesfully',
        course,
    }
        )

}


const updateCourse=async (req,res,next)=>{

    try{

        const {id}=req.params;
        const course=await Course.findByIdAndUpdate(
            id,
            {
                $set:req.body
            },
            {
                runValidators:true
            }
        );

        if(!course){
            return next(
                new AppError("Course with given id does not exist",500)
            )
        }

        res.status(200).json({
            success:true,
            message:'Course updated successfully!',
            course
        });

    }catch(e){
        new AppError(e.message,500)
    }

}


const removeCourse=async (req,res,next)=>{

    try {

        const {id}=req.params;
        const course=await Course.findById(id);

        if(!course){
            return next(
                new AppError('Course with given id does not exist ',500)
            )
        }
        await Course.findByIdAndDelete(id);

        res.status(200).json({
            success:true,
            message:"Course deleted successfully"
        })
    }catch(e){
        new AppError(e.message,500)
    }

}

export{
    getAllCourses,
    getLectureByCourseId,
    createCourse,
    updateCourse,
    removeCourse
}