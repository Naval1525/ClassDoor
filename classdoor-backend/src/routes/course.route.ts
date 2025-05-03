import express from "express";
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/course.controller.js";
import { authenticateAnonymousUser } from "../middleware/auth.middleware.js";
import {
  validateBody,
  validateParams,
} from "../middleware/validator.middleware.js";
import { idParamSchema, courseSchema } from "../schemas/index.js";

const coursesRouter = express.Router();

coursesRouter.get("/", getAllCourses);
coursesRouter.get("/:id", validateParams(idParamSchema), getCourseById);
coursesRouter.post(
  "/create",
  authenticateAnonymousUser,
  validateBody(courseSchema),
  createCourse
);
coursesRouter.put(
  "/:id",
  authenticateAnonymousUser,
  validateParams(idParamSchema),
  validateBody(courseSchema),
  updateCourse
);
coursesRouter.delete(
  "/:id",
  authenticateAnonymousUser,
  validateParams(idParamSchema),
  deleteCourse
);

export default coursesRouter;
