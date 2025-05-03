import { Request, Response } from "express";
import {
  getAllCoursesService,
  getCourseByIdService,
  createCourseService,
  updateCourseService,
  deleteCourseService,
} from "../services/course.service.js";
import { handleControllerError } from "../middleware/error.middleware.js";

export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const { collegeId, name, code, page = 1, limit = 10 } = req.query;
    const data = await getAllCoursesService({
      collegeId: collegeId as string,
      name: name as string,
      code: code as string,
      page: Number(page),
      limit: Number(limit)
    });
    res.json({ data });
  } catch (error) {
    handleControllerError(error, res);
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await getCourseByIdService(id);

    if (!data) {
      res.status(404).json({ error: "Course not found" });
      return;
    }

    res.json({ data });
  } catch (error) {
    handleControllerError(error, res);
  }
};

export const createCourse = async (req: Request, res: Response) => {
  try {
    const data = await createCourseService(req.body);
    res.status(201).json({ data });
  } catch (error) {
    handleControllerError(error, res);
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await updateCourseService(id, req.body);
    res.json({ data });
  } catch (error) {
    handleControllerError(error, res);
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteCourseService(id);
    res.status(204).send();
  } catch (error) {
    handleControllerError(error, res);
  }
};