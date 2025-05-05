import { PrismaClient } from '@/generated/prisma/index.js';
import { TrendingEntity, TrendingEntityType, TrendingPeriod } from '@/types/trending.js';

// Helper function to get start date based on period
const getStartDateForPeriod = (period: TrendingPeriod): Date => {
  const now = new Date();

  switch (period) {
    case TrendingPeriod.DAY:
      return new Date(now.setDate(now.getDate() - 1));
    case TrendingPeriod.WEEK:
      return new Date(now.setDate(now.getDate() - 7));
    case TrendingPeriod.MONTH:
      return new Date(now.setMonth(now.getMonth() - 1));
    default:
      return new Date(now.setDate(now.getDate() - 7)); // Default to week
  }
};

/**
 * Get trending professors using Prisma queries (no raw SQL)
 */
export const getTrendingProfessors = async (
  prisma: PrismaClient,
  period: TrendingPeriod,
  limit: number = 10
): Promise<TrendingEntity[]> => {
  const startDate = getStartDateForPeriod(period);

  // Get professors with activity in the given period
  const professors = await prisma.professor.findMany({
    select: {
      id: true,
      name: true,
      department: true,
      collegeId: true,
      college: {
        select: {
          name: true
        }
      },
      reviews: {
        where: {
          createdAt: {
            gte: startDate
          }
        },
        select: {
          id: true,
          rating: true,
          reactions: {
            where: {
              createdAt: {
                gte: startDate
              }
            },
            select: {
              id: true
            }
          }
        }
      }
    },
    orderBy: {
      reviews: {
        _count: 'desc'
      }
    },
    take: limit * 3 // Fetch more than needed to ensure we have enough after filtering
  });

  // Calculate trend scores and map to TrendingEntity format
  const trendingProfessors = professors.map(prof => {
    const reviewCount = prof.reviews.length;
    const reactionCount = prof.reviews.reduce(
      (sum, review) => sum + review.reactions.length,
      0
    );

    const totalRatings = prof.reviews.reduce(
      (sum, review) => sum + (review.rating || 0),
      0
    );

    const averageRating = reviewCount > 0
      ? totalRatings / reviewCount
      : undefined;

    return {
      id: prof.id,
      name: `${prof.name} (${prof.department})`,
      type: TrendingEntityType.PROFESSOR,
      score: reviewCount * 10 + reactionCount,
      reviewCount,
      reactionCount,
      averageRating,
      collegeId: prof.collegeId,
      collegeName: prof.college.name
    };
  });

  // Sort by score and limit results
  return trendingProfessors
    .filter(prof => prof.score >= 0) // Only include professors with activity
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};

/**
 * Get trending courses using Prisma queries (no raw SQL)
 */
export const getTrendingCourses = async (
  prisma: PrismaClient,
  period: TrendingPeriod,
  limit: number = 10
): Promise<TrendingEntity[]> => {
  const startDate = getStartDateForPeriod(period);

  // Get courses with activity in the given period
  const courses = await prisma.course.findMany({
    select: {
      id: true,
      name: true,
      code: true,
      collegeId: true,
      college: {
        select: {
          name: true
        }
      },
      reviews: {
        where: {
          createdAt: {
            gte: startDate
          }
        },
        select: {
          id: true,
          rating: true,
          reactions: {
            where: {
              createdAt: {
                gte: startDate
              }
            },
            select: {
              id: true
            }
          }
        }
      }
    },
    orderBy: {
      reviews: {
        _count: 'desc'
      }
    },
    take: limit * 3 // Fetch more than needed to ensure we have enough after filtering
  });

  // Calculate trend scores and map to TrendingEntity format
  const trendingCourses = courses.map(course => {
    const reviewCount = course.reviews.length;
    const reactionCount = course.reviews.reduce(
      (sum, review) => sum + review.reactions.length,
      0
    );

    const totalRatings = course.reviews.reduce(
      (sum, review) => sum + (review.rating || 0),
      0
    );

    const averageRating = reviewCount > 0
      ? totalRatings / reviewCount
      : undefined;

    return {
      id: course.id,
      name: `${course.code}: ${course.name}`,
      type: TrendingEntityType.COURSE,
      score: reviewCount * 10 + reactionCount,
      reviewCount,
      reactionCount,
      averageRating,
      collegeId: course.collegeId,
      collegeName: course.college.name
    };
  });

  // Sort by score and limit results
  return trendingCourses
    .filter(course => course.score >= 0) // Only include courses with activity
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};

/**
 * Get trending colleges using Prisma queries (no raw SQL)
 */
export const getTrendingColleges = async (
  prisma: PrismaClient,
  period: TrendingPeriod,
  limit: number = 10
): Promise<TrendingEntity[]> => {
  const startDate = getStartDateForPeriod(period);

  // Get colleges with activity in the given period
  const colleges = await prisma.college.findMany({
    select: {
      id: true,
      name: true,
      location: true,
      logoUrl: true,
      reviews: {
        where: {
          createdAt: {
            gte: startDate
          }
        },
        select: {
          id: true,
          rating: true,
          reactions: {
            where: {
              createdAt: {
                gte: startDate
              }
            },
            select: {
              id: true
            }
          }
        }
      },
      discussions: {
        where: {
          createdAt: {
            gte: startDate
          }
        },
        select: {
          id: true
        }
      }
    },
    orderBy: [
      {
        reviews: {
          _count: 'desc'
        }
      },
      {
        discussions: {
          _count: 'desc'
        }
      }
    ],
    take: limit * 3 // Fetch more than needed to ensure we have enough after filtering
  });

  // Calculate trend scores and map to TrendingEntity format
  const trendingColleges = colleges.map(college => {
    const reviewCount = college.reviews.length;
    const discussionCount = college.discussions.length;
    const reactionCount = college.reviews.reduce(
      (sum, review) => sum + review.reactions.length,
      0
    );

    const totalRatings = college.reviews.reduce(
      (sum, review) => sum + (review.rating || 0),
      0
    );

    const averageRating = reviewCount > 0
      ? totalRatings / reviewCount
      : undefined;

    return {
      id: college.id,
      name: `${college.name}, ${college.location}`,
      type: TrendingEntityType.COLLEGE,
      score: reviewCount * 10 + discussionCount * 5 + reactionCount,
      reviewCount,
      reactionCount,
      discussionCount,
      averageRating,
      logoUrl: college.logoUrl
    };
  });

  // Sort by score and limit results
  return trendingColleges
    .filter(college => college.score >= 0) // Only include colleges with activity
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};

/**
 * Get all trending entities and combine them
 */
export const getAllTrending = async (
  prisma: PrismaClient,
  period: TrendingPeriod,
  limit: number = 10
): Promise<TrendingEntity[]> => {
  const [professors, courses, colleges] = await Promise.all([
    getTrendingProfessors(prisma, period, limit),
    getTrendingCourses(prisma, period, limit),
    getTrendingColleges(prisma, period, limit)
  ]);

  // Combine all entities and sort by score
  return [...professors, ...courses, ...colleges]
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};