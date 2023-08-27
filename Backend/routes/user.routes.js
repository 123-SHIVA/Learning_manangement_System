import { Router } from "express";
import {register,login,logout,getProfile} from "../controller/user.controller.js"
import { isLoggedIn } from "../middlewares/auth.middleware.js";


const router=Router();

router.post('/register',register);
router.post('/login',login);
router.post('/logout',logout);
router.post('/me',isLoggedIn,getProfile);


export default router;