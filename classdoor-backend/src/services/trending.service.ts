import { PrismaClient } from '@/generated/prisma/index.js';
import * as trendingModel from '../models/trending.model.js';
import { TrendingEntity, TrendingEntityType, TrendingPeriod } from '../types/trending.js';

/**
 * Get trending entities based on type, period, and limit
 */
export const getTrending = async (
  prisma: PrismaClient,
  type?: TrendingEntityType,
  period: TrendingPeriod = TrendingPeriod.WEEK,
  limit: number = 10
): Promise<TrendingEntity[]> => {
  // If no specific type is requested, get all trending entities
  if (!type) {
    return trendingModel.getAllTrending(prisma, period, limit);
  }

  // Otherwise, get trending entities by type
  switch (type) {
    case TrendingEntityType.PROFESSOR:
      return trendingModel.getTrendingProfessors(prisma, period, limit);
    case TrendingEntityType.COURSE:
      return trendingModel.getTrendingCourses(prisma, period, limit);
    case TrendingEntityType.COLLEGE:
      return trendingModel.getTrendingColleges(prisma, period, limit);
    default:
      throw new Error(`Invalid entity type: ${type}`);
  }
};

/**
 * Get trending entities for the home page with customizable limits
 */
export const getTrendingForHomePage = async (
  prisma: PrismaClient,
  options: {
    professorLimit?: number;
    courseLimit?: number;
    collegeLimit?: number;
    period?: TrendingPeriod;
  } = {}
): Promise<{
  professors: TrendingEntity[];
  courses: TrendingEntity[];
  colleges: TrendingEntity[];
}> => {
  const {
    professorLimit = 5,
    courseLimit = 5,
    collegeLimit = 5,
    period = TrendingPeriod.WEEK
  } = options;

  const [professors, courses, colleges] = await Promise.all([
    trendingModel.getTrendingProfessors(prisma, period, professorLimit),
    trendingModel.getTrendingCourses(prisma, period, courseLimit),
    trendingModel.getTrendingColleges(prisma, period, collegeLimit)
  ]);

  return {
    professors,
    courses,
    colleges
  };
};

/**
 * Get detailed trending data with pagination support
 */
export const getPaginatedTrending = async (
  prisma: PrismaClient,
  options: {
    type: TrendingEntityType;
    period?: TrendingPeriod;
    page?: number;
    pageSize?: number;
  }
): Promise<{
  data: TrendingEntity[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}> => {
  const {
    type,
    period = TrendingPeriod.WEEK,
    page = 1,
    pageSize = 10
  } = options;

  let trendingData: TrendingEntity[] = [];

  // Get trending entities based on type
  switch (type) {
    case TrendingEntityType.PROFESSOR:
      // Get all trending professors without limiting
      trendingData = await trendingModel.getTrendingProfessors(prisma, period, 100);
      break;
    case TrendingEntityType.COURSE:
      trendingData = await trendingModel.getTrendingCourses(prisma, period, 100);
      break;
    case TrendingEntityType.COLLEGE:
      trendingData = await trendingModel.getTrendingColleges(prisma, period, 100);
      break;
    default:
      throw new Error(`Invalid entity type: ${type}`);
  }

  // Calculate pagination
  const totalCount = trendingData.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  const validPage = Math.max(1, Math.min(page, totalPages || 1));

  // Apply pagination
  const start = (validPage - 1) * pageSize;
  const end = start + pageSize;
  const paginatedData = trendingData.slice(start, end);

  return {
    data: paginatedData,
    totalCount,
    page: validPage,
    pageSize,
    totalPages
  };
};