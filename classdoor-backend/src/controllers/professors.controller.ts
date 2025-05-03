import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { handleControllerError } from "@/middleware/error.middleware.js";
import prisma from "@/config/db.js";



export const getAllProfessors = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const professors = await prisma.professor.findMany({
      include: {
        college: { select: { id: true, name: true } },
        _count: { select: { reviews: true } },
      },
      orderBy: { name: "asc" },
    });

    res.json({ data: professors });
  } catch (error) {
    handleControllerError(error, res);
  }
};

export const getProfessorById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const professor = await prisma.professor.findUnique({
      where: { id },
      include: {
        college: true,
        courses: true,
        _count: {
          select: {
            reviews: true,
          },
        },
      },
    });

    if (!professor) {
      res.status(404).json({ error: "Professor not found" });
      return;
    }

    res.json({ data: professor });
  } catch (error) {
    handleControllerError(error, res);
  }
};

export const createProfessor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, department, bio, imageUrl, collegeId } = req.body;

    const processedData = await prisma.professor.create({
      data: { name, department, bio, imageUrl, collegeId },
    });

    res.status(201).json({ data: processedData });
  } catch (error) {
    handleControllerError(error, res);
  }
};
