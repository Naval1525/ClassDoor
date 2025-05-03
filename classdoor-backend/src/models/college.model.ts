import prisma from "../config/db.js";

export const findAllColleges = async (params: {
  name?: string;
  location?: string;
  page: number;
  limit: number;
}) => {
  const { name, location, page, limit } = params;
  const skip = (page - 1) * limit;

  // Build filter conditions
  const where: any = {};
  if (name) {
    where.name = { contains: name, mode: 'insensitive' };
  }
  if (location) {
    where.location = { contains: location, mode: 'insensitive' };
  }

  // Get colleges with related counts
  const colleges = await prisma.college.findMany({
    where,
    include: {
      _count: {
        select: {
          professors: true,
          courses: true
        }
      }
    },
    orderBy: { name: "asc" },
    skip,
    take: limit
  });

  // Get total count for pagination
  const total = await prisma.college.count({ where });

  return {
    colleges,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    }
  };
};

export const findCollegeById = async (id: string) => {
  return prisma.college.findUnique({
    where: { id },
    include: {
      professors: {
        select: {
          id: true,
          name: true,
          department: true
        }
      },
      _count: {
        select: {
          professors: true,
          courses: true
        }
      }
    }
  });
};

export const createCollegeRecord = async (data: {
  name: string;
  location: string;
  website?: string;
  logoUrl?: string;
  description?: string;
}) => {
  return prisma.college.create({ data });
};

export const updateCollegeRecord = async (id: string, data: {
  name?: string;
  location?: string;
  website?: string;
  logoUrl?: string;
  description?: string;
}) => {
  return prisma.college.update({ where: { id }, data });
};

export const deleteCollegeRecord = async (id: string) => {
  return prisma.college.delete({ where: { id } });
};