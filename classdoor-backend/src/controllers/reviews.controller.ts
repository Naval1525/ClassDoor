import { Request, Response } from "express";
import { handleControllerError } from "../middleware/error.middleware.js";
import prisma from "@/config/db.js";
import { ReactionType } from "@/generated/prisma/index.js";

export const getAllReviews = async (req: Request, res: Response) => {
  try {
    const data = await prisma.review.findMany();
    res.json({ data });
  } catch (error) {
    handleControllerError(error, res);
  }
};

export const getReviewById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await prisma.review.findUnique({ where: { id } });

    if (!data) {
      res.status(404).json({ message: "Review not found." });
    } else {
      res.json({ data });
    }
  } catch (error) {
    handleControllerError(error, res);
  }
};

export const createReview = async (req: Request, res: Response) => {
  try {
    const { content, rating, professorId, courseId, collegeId, type, tags } =
      req.body;
    const authorId = req.user?.anonId;
    if (!authorId) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const newReview = await prisma.review.create({
      data: {
        content,
        rating,
        professorId,
        courseId,
        collegeId,
        type,
        tags,
        authorId,
        anonymous: true,
      },
    });

    res.status(201).json({ data: newReview });
  } catch (error) {
    handleControllerError(error, res);
  }
};

export const updateReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { content, rating, type, tags } = req.body;
    const authorId = req.user?.anonId;
    const existingReview = await prisma.review.findUnique({ where: { id } });
    if (!existingReview) {
      res.status(404).json({ message: "Review not found." });
      return;
    }
    if (existingReview.authorId !== authorId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to update this review." });
    }
    const updatedReview = await prisma.review.update({
      where: { id },
      data: { content, rating, type, tags },
    });

    res.json({ data: updatedReview });
  } catch (error) {
    handleControllerError(error, res);
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const authorId = req.user?.anonId;
    const existingReview = await prisma.review.findUnique({ where: { id } });
    if (!existingReview) {
      res.status(404).json({ message: "Review not found." });
      return;
    }
    if (existingReview.authorId !== authorId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this review." });
    }
    await prisma.review.delete({ where: { id } });

    res.status(204).send();
  } catch (error) {
    handleControllerError(error, res);
  }
};

export const addReviewReaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { type } = req.body;
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }
    const reaction = await prisma.reaction.create({
      data: {
        type,
        authorId: req.user.anonId,
        reviewId: id,
      },
    });
    res
      .status(201)
      .json({ message: "Reaction created successfully", reaction });
  } catch (error) {
    handleControllerError(error, res);
  }
};

export const removeReviewReaction = async (req: Request, res: Response) => {
  const { id, type } = req.params;
  try {
    const deletedReaction = await prisma.reaction.deleteMany({
      where: {
        authorId: req.user?.anonId,
        reviewId: id,
        type: type as ReactionType,
      },
    });

    if (deletedReaction.count === 0) {
      return res.status(404).json({ error: "Reaction not found" });
    }

    return res.status(200).json({ message: "Reaction deleted successfully" });
  } catch (error) {
    handleControllerError(error, res);
  }
};
