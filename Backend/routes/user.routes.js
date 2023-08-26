import { Router } from "express";
import {register,login,logout,getProfile} from "../controller/user.controller.js"


const router=Router();

router.post('/register',register);
router.post('/login',login);
router.post('/logout',logout);
router.post('/me',getProfile);


export default router;