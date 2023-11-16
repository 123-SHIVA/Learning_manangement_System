import jwt from "jsonwebtoken";
import AppError from "../utils/error.util.js";

const isLoggedIn=async (req,res,next)=>{
    const {token}=req.cookies;

    if(!token){
        return next(new AppError('unauthenticated,please login again',401))
    }

    const userDetails=await jwt.verify(token,process.env.JWT_SECRET);

    req.user=userDetails;

    next();


}

const authorizedRoles =(...roles)=>async(req,res,next)=>{
    const currentUserRole=req.user.role;
    if(!roles.includes(currentUserRole)){
        return next(
            new AppError('you do not have permission to access this router')
        )
    }

    next();
}

const authorizedSubscriber=async(req,res,next)=>{
      const subscription =req.user.subscription;
      const currentUserRole=req.user.role;
      if(currentUserRole !== 'ADMIN' && subscription.status !== 'active'){
        return next(
            new AppError("please subscribe to access this route",404)
        )
      }
      next()
}

export {
    isLoggedIn,
    authorizedRoles,
    authorizedSubscriber
}