
import { createCourse, getAllCourses,getLectureByCourseId, removeCourse, updateCourse } from '../controller/course.controller.js';
import {Router} from 'express';
import {isLoggedIn} from "../middlewares/auth.middleware.js"
import upload from "../middlewares/multer.middleware.js"

const router=Router();

router.route('/')
  .get(getAllCourses)
  .post(upload.single('thumbnail'),isLoggedIn, createCourse);
 

router.route('/:id')
 .get(isLoggedIn,getLectureByCourseId)
 .put(isLoggedIn,updateCourse)
 .delete(isLoggedIn, removeCourse);

 router.route('/')
  .post(  getAllCourses);

 

export default router;