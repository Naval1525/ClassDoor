import { Request, Response } from "express";
import * as reviewService from "../services/reviews.service.js";
import { handleControllerError } from "../middleware/error.middleware.js";

export const getAllReviews = async (req: Request, res: Response) => {
  try {
    const data = await reviewService.getAllReviews();
    res.json({ data });
  } catch (e) {
    handleControllerError(e, res);
  }
};

export const getReviewById = async (req: Request, res: Response) => {
  try {
    const data = await reviewService.getReviewById(req.params.id);
    if (!data) res.status(404).json({ message: "Review not found." });
    else res.json({ data });
  } catch (e) {
    handleControllerError(e, res);
  }
};

export const createReview = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const authorId = req.user?.anonId;
    if (!authorId) res.status(401).json({ error: "Authentication required" });
    const data = await reviewService.createReview({ ...req.body, authorId });
    res.status(201).json({ data });
  } catch (e) {
    handleControllerError(e, res);
  }
};

export const updateReview = async (
  req: Request,
  res: Response
): Promise<void|Response> => {
  try {
    const authorId = req.user?.anonId;
    const { id } = req.params;
    const updated = await reviewService.updateReview(id, req.body, authorId);
    if (updated === "not_found")
      return res.status(404).json({ message: "Review not found." });
    if (updated === "unauthorized")
      return res.status(403).json({ error: "Unauthorized" });
    res.json({ data: updated });
  } catch (e) {
    handleControllerError(e, res);
  }
};

export const deleteReview = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const authorId = req.user?.anonId;
    const deleted = await reviewService.deleteReview(req.params.id, authorId);
    if (deleted === "not_found")
      res.status(404).json({ message: "Review not found." });
    if (deleted === "unauthorized")
      res.status(403).json({ error: "Unauthorized" });
    res.status(204).send();
  } catch (e) {
    handleControllerError(e, res);
  }
};

export const addReviewReaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }
    const reaction = await reviewService.addReaction(
      req.params.id,
      req.user.anonId,
      req.body.type
    );
    res
      .status(201)
      .json({ message: "Reaction created successfully", reaction });
  } catch (e) {
    handleControllerError(e, res);
  }
};

export const removeReviewReaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deleted = await reviewService.removeReaction(
      req.params.id,
      req.params.type,
      req.user?.anonId
    );
    if (!deleted) res.status(404).json({ error: "Reaction not found" });
    res.status(200).json({ message: "Reaction deleted successfully" });
  } catch (e) {
    handleControllerError(e, res);
  }
};
