import {
  addlectureToCourseById,
  createCourse,
  getAllCourses,
  getLectureByCourseId,
  removeCourse,
  updateCourse,
} from "../controller/course.controller.js";
import { Router } from "express";
import { authorizedRoles, authorizedSubscriber, isLoggedIn } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

router
  .route("/")
  .get(getAllCourses)
  .post(
    isLoggedIn,
    authorizedRoles("ADMIN"),
    upload.single("thumbnail"),
    createCourse
  );

router
  .route("/:id")
  .get(isLoggedIn,authorizedSubscriber, getLectureByCourseId)
  .put(isLoggedIn, authorizedRoles("ADMIN"), updateCourse)
  .delete(isLoggedIn, authorizedRoles("ADMIN"), removeCourse)
  .post(
    isLoggedIn,
    authorizedRoles('ADMIN'),
    upload.single('thumbnail'),
    addlectureToCourseById
  );

router.route("/").post(getAllCourses);

export default router;
