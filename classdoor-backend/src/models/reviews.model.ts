import prisma from "../config/db.js";
import { ReactionType } from "../generated/prisma/index.js";

export const findAll = async () => {
  return await prisma.review.findMany();
};

export const findById = async (id: string) => {
  return await prisma.review.findUnique({ where: { id } });
};

export const create = async (data: any) => {
  return await prisma.review.create({ data: { ...data, anonymous: true } });
};

export const update = async (id: string, data: any) => {
  return await prisma.review.update({ where: { id }, data });
};

export const remove = async (id: string) => {
  return await prisma.review.delete({ where: { id } });
};

export const addReaction = async (data: { type: ReactionType; authorId: string; reviewId: string }) => {
  return await prisma.reaction.create({ data });
};

export const removeReaction = async (reviewId: string, type: ReactionType, authorId?: string) => {
  const result = await prisma.reaction.deleteMany({
    where: { reviewId, type, authorId },
  });
  return result.count > 0;
};
