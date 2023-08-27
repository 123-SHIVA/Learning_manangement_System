import AppError from "../utils/error.util.js";

const cookieOptions={
    maxAge:7*24*60*60*1000,
    httpOnly:true,
    secure:true
}

const register=async(req,res ,next)=>{

    const {name,email,password}=req.body;

    if(!name || !email || !password){
        return next (new AppError('All fields are required',400))
    }

    const userExists=await user.findOne({email});

    if(userExists){
        return next (new AppError('All fields are required',400))
    }

    const user=await user.create({
        name,
        email,
        password,
        avatar:{
            public_id:email,
            secure_url:'https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg'
        }

        
    })
    if (!user){
        return next (new AppError('User registration fail please try again',400))
    }

    //Todo file upload

    await user.save();

    user.password=undefined;

    const token =await user.generateJWTToken();

    res.cookie('token',token,cookieOptions)

    res.status(201).json({
        success:true,
        message:'User registered successfully',
        user,
    })


    
}
const login=async (req,res ,next)=>{
 try {
    const {email,password}=req.body;

    if(!email || !password){
        return next(new AppError("All fiels is required"),400)
    }
     const user=await user.findOne({
        email
     }).select('password')

     if(!user || !user.comparePassword(password)){
        return next (new AppError('eamil or password does not match',400))
     }

     const token=await user.generateJWTToken();
     user.password=undefined;

     res.cookie ('token',token,cookieOptions)

     res.status(200).json({
        success:true,
        message:"User logged in successfully",
        user,
     })
    
 } catch (error) {
    return next(new AppError(error.message,500))
    
 }
}
const logout=(req,res)=>{

    res.cookie('token', null ,{
        secure:true,
        maxAge:0,
        httpOnly:true,

    });

    res.status(200).json({
        success:true,
        message:'User logged out successfully'
    })

}
const getProfile=async (req,res)=>{
     try {
        const userId=req.user.id;
        const user=await user.findById(userId);

        res.status(200).json({
            success:true,
            message:'user details',
            user
        })
     }catch(e){
        return next (new AppError('Failed to fetch profile ',400))
     }
}

export {
    register,
    login,
    logout,
    getProfile
}