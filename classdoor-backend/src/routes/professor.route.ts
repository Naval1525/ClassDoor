// import { createProfessor, deleteProfessor, getAllProfessors, getProfessorById, updateProfessor } from "../controllers/professors.controller.js";
// import { authenticateAnonymousUser } from "../middleware/auth.middleware.js";

// import  express  from "express";

// const professorsRouter = express.Router();

// professorsRouter.get("/all", getAllProfessors);
// professorsRouter.get("/:id", getProfessorById);
// professorsRouter.post("/create", authenticateAnonymousUser,createProfessor);
// professorsRouter.put("/update/:id",authenticateAnonymousUser,updateProfessor);
// professorsRouter.delete("/delete/:id", authenticateAnonymousUser,deleteProfessor);

// export default professorsRouter;

// src/routes/professors.routes.js
import express from "express";
import { z } from "zod";
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
import { professorSchema } from "../schemas/index.js";

const professorsRouter = express.Router();

// Parameter validation schema
const idParamSchema = z.object({
  id: z.string().uuid("Invalid professor ID format"),
});

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
