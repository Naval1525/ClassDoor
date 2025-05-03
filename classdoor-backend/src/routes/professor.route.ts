import express from "express";
import {
  createProfessor,
  deleteProfessor,
  getAllProfessors,
  getProfessorById,
  updateProfessor,
} from "../controllers/professors.controller.js";
import { authenticateAnonymousUser } from "../middleware/auth.middleware.js";
import {
  validateBody,
  validateParams,
} from "../middleware/validator.middleware.js";
import { idParamSchema, professorSchema } from "../schemas/index.js";

const professorsRouter = express.Router();

// Get all professors 
professorsRouter.get("/all", getAllProfessors);

// Get professor by ID 
professorsRouter.get("/:id", validateParams(idParamSchema), getProfessorById);

// Create professor 
professorsRouter.post(
  "/create",
  authenticateAnonymousUser,
  validateBody(professorSchema),
  createProfessor
);

// Update professor 
professorsRouter.put(
  "/update/:id",
  authenticateAnonymousUser,
  validateParams(idParamSchema),
  validateBody(professorSchema),
  updateProfessor
);

// Delete professor
professorsRouter.delete(
  "/delete/:id",
  authenticateAnonymousUser,
  validateParams(idParamSchema),
  deleteProfessor
);

export default professorsRouter;
