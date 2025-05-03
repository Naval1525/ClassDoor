import { Request, Response } from "express";
import {
  getAllCollegesService,
  getCollegeByIdService,
  createCollegeService,
  updateCollegeService,
  deleteCollegeService,
} from "../services/college.service.js";
import { handleControllerError } from "../middleware/error.middleware.js";

export const getAllColleges = async (req: Request, res: Response) => {
  try {
    const { name, location, page = 1, limit = 10 } = req.query;
    const data = await getAllCollegesService({
      name: name as string,
      location: location as string,
      page: Number(page),
      limit: Number(limit)
    });
    res.json({ data });
  } catch (error) {
    handleControllerError(error, res);
  }
};

export const getCollegeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await getCollegeByIdService(id);

    if (!data) {
      res.status(404).json({ error: "College not found" });
      return;
    }

    res.json({ data });
  } catch (error) {
    handleControllerError(error, res);
  }
};

export const createCollege = async (req: Request, res: Response) => {
  try {
    const data = await createCollegeService(req.body);
    res.status(201).json({ data });
  } catch (error) {
    handleControllerError(error, res);
  }
};

export const updateCollege = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await updateCollegeService(id, req.body);
    res.json({ data });
  } catch (error) {
    handleControllerError(error, res);
  }
};

export const deleteCollege = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteCollegeService(id);
    res.status(204).send();
  } catch (error) {
    handleControllerError(error, res);
  }
};