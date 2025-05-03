import { Request, Response } from "express";
import {
  getAllProfessorsService,
  getProfessorByIdService,
  createProfessorService,
  updateProfessorService,
  deleteProfessorService,
} from "../services/professor.service.js";
import { handleControllerError } from "../middleware/error.middleware.js";

export const getAllProfessors = async (req: Request, res: Response) => {
  try {
    const data = await getAllProfessorsService();
    res.json({ data });
  } catch (error) {
    handleControllerError(error, res);
  }
};

export const getProfessorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await getProfessorByIdService(id);

    if (!data) {
      res.status(404).json({ error: "Professor not found" });
      return;
    }

    res.json({ data });
  } catch (error) {
    handleControllerError(error, res);
  }
};

export const createProfessor = async (req: Request, res: Response) => {
  try {
    const data = await createProfessorService(req.body);
    res.status(201).json({ data });
  } catch (error) {
    handleControllerError(error, res);
  }
};

export const updateProfessor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await updateProfessorService(id, req.body);
    res.json({ data });
  } catch (error) {
    handleControllerError(error, res);
  }
};

export const deleteProfessor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteProfessorService(id);
    res.status(204).send();
  } catch (error) {
    handleControllerError(error, res);
  }
};
