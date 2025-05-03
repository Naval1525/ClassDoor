import prisma from "../config/db.js";

export const findAllProfessors = async () => {
  return prisma.professor.findMany({
    include: {
      college: { select: { id: true, name: true } },
      _count: { select: { reviews: true } },
    },
    orderBy: { name: "asc" },
  });
};

export const findProfessorById = async (id: string) => {
  return prisma.professor.findUnique({
    where: { id },
    include: {
      college: true,
      courses: true,
      _count: {
        select: { reviews: true },
      },
    },
  });
};

export const createProfessorRecord = async (data: {
  name: string;
  department: string;
  bio: string;
  imageUrl: string;
  collegeId: string;
}) => {
  return prisma.professor.create({ data });
};

export const updateProfessorRecord = async (id: string, data: {
  name: string;
  department: string;
  bio: string;
  imageUrl: string;
  collegeId: string;
}) => {
  return prisma.professor.update({ where: { id }, data });
};

export const deleteProfessorRecord = async (id: string) => {
  return prisma.professor.delete({ where: { id } });
};
