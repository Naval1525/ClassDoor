import prisma from "../config/db.js";

export const createAnonymousUser = async (id: string) => {
  return prisma.anonymousUser.create({
    data: { id },
  });
};

export const findAnonymousUserById = async (id: string) => {
  return prisma.anonymousUser.findUnique({
    where: { id },
  });
};
