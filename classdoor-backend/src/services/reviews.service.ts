import * as ReviewModel from "../models/reviews.model.js";
import { ReactionType } from "../generated/prisma/index.js";

export const getAllReviews = async () => {
  return await ReviewModel.findAll();
};

export const getReviewById = async (id: string) => {
  return await ReviewModel.findById(id);
};

export const createReview = async (data: any) => {
  return await ReviewModel.create(data);
};

export const updateReview = async (id: string, data: any, authorId?: string) => {
  const existing = await ReviewModel.findById(id);
  if (!existing) return "not_found";
  if (existing.authorId !== authorId) return "unauthorized";
  return await ReviewModel.update(id, data);
};

export const deleteReview = async (id: string, authorId?: string) => {
  const existing = await ReviewModel.findById(id);
  if (!existing) return "not_found";
  if (existing.authorId !== authorId) return "unauthorized";
  await ReviewModel.remove(id);
  return true;
};

export const addReaction = async (reviewId: string, authorId: string, type: ReactionType) => {
  return await ReviewModel.addReaction({ reviewId, authorId, type });
};

export const removeReaction = async (reviewId: string, type: string, authorId?: string) => {
  return await ReviewModel.removeReaction(reviewId, type as ReactionType, authorId);
};
