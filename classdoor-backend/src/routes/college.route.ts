import express from "express";
import {
  getAllColleges,
  getCollegeById,
  createCollege,
  updateCollege,
  deleteCollege,
} from "../controllers/college.controller.js";
import { authenticateAnonymousUser } from "../middleware/auth.middleware.js";
import {
  validateBody,
  validateParams,
} from "../middleware/validator.middleware.js";
import { idParamSchema, collegeSchema } from "../schemas/index.js";

const collegeRouter = express.Router();

collegeRouter.get("/all", getAllColleges);
collegeRouter.get("/:id", validateParams(idParamSchema), getCollegeById);
collegeRouter.post(
  "/create",
  authenticateAnonymousUser,
  validateBody(collegeSchema),
  createCollege
);
collegeRouter.put(
  "/update/:id",
  authenticateAnonymousUser,
  validateParams(idParamSchema),
  validateBody(collegeSchema),
  updateCollege
);
collegeRouter.delete(
  "/delete/:id",
  authenticateAnonymousUser,
  validateParams(idParamSchema),
  deleteCollege
);

export default collegeRouter;
