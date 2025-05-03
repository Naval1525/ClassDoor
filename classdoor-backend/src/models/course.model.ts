import prisma from "../config/db.js";

export const findAllCourses = async (params: {
  collegeId?: string;
  name?: string;
  code?: string;
  page: number;
  limit: number;
}) => {
  const { collegeId, name, code, page, limit } = params;
  const skip = (page - 1) * limit;

  // Build filter conditions
  const where: any = {};
  if (collegeId) {
    where.collegeId = collegeId;
  }
  if (name) {
    where.name = { contains: name, mode: 'insensitive' };
  }
  if (code) {
    where.code = { contains: code, mode: 'insensitive' };
  }

  // Get courses with related information
  const courses = await prisma.course.findMany({
    where,
    include: {
      college: {
        select: {
          id: true,
          name: true
        }
      },
      professors: {
        select: {
          id: true,
          name: true
        }
      },
      _count: {
        select: {
          reviews: true
        }
      }
    },
    orderBy: [
      { code: "asc" },
      { name: "asc" }
    ],
    skip,
    take: limit
  });

  // Get total count for pagination
  const total = await prisma.course.count({ where });

  return {
    courses,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    }
  };
};

export const findCourseById = async (id: string) => {
    return prisma.course.findUnique({
      where: { id },
      include: {
        college: {
          select: {
            id: true,
            name: true,
            location: true
          }
        },
        professors: {
          select: {
            id: true,
            name: true,
            department: true
          }
        },
        reviews: {
          select: {
            id: true,
            rating: true,
            comments: true,
            createdAt: true,
            author: {
              select: {
                id: true
              }
            }
          },
          orderBy: { createdAt: "desc" },
          take: 5 
        },
        _count: {
          select: {
            reviews: true
          }
        }
      }
    });
  };

export const createCourseRecord = async (data: {
  code: string;
  name: string;
  description?: string;
  collegeId: string;
  professorIds?: string[];
}) => {
  const { professorIds, ...courseData } = data;
  
  return prisma.course.create({
    data: {
      ...courseData,
      professors: professorIds?.length 
        ? {
            connect: professorIds.map(id => ({ id }))
          }
        : undefined
    },
    include: {
      college: {
        select: {
          id: true,
          name: true
        }
      },
      professors: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });
};

export const updateCourseRecord = async (id: string, data: {
  code?: string;
  name?: string;
  description?: string;
  collegeId?: string;
  professorIds?: string[];
}) => {
  const { professorIds, ...courseData } = data;
  if (professorIds !== undefined) {
    await prisma.course.update({
      where: { id },
      data: {
        professors: {
          set: [] 
        }
      }
    });
  }

  return prisma.course.update({
    where: { id },
    data: {
      ...courseData,
      professors: professorIds?.length
        ? {
            connect: professorIds.map(id => ({ id }))
          }
        : undefined
    },
    include: {
      college: {
        select: {
          id: true,
          name: true
        }
      },
      professors: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });
};

export const deleteCourseRecord = async (id: string) => {
  return prisma.course.delete({ where: { id } });
};