// trending.controller.ts
import { Request, Response } from 'express';
import prisma from '@/config/db.js';
import { TrendingEntityType, TrendingPeriod } from '../types/trending.js';
import * as trendingModel from '../models/trending.model.js';

/**
 * Get trending items for home page
 */
export const getHomePageTrending = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get top 5 trending items from each category
    const [professors, courses, colleges] = await Promise.all([
      trendingModel.getTrendingProfessors(prisma, TrendingPeriod.WEEK, 5),
      trendingModel.getTrendingCourses(prisma, TrendingPeriod.WEEK, 5),
      trendingModel.getTrendingColleges(prisma, TrendingPeriod.WEEK, 5)
    ]);

    res.status(200).json({
      success: true,
      data: {
        professors,
        courses,
        colleges
      }
    });
  } catch (error) {
    console.error('Error getting homepage trending items:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve trending items',
      error: (error as Error).message
    });
  }
};

/**
 * Get trending professors
 */
export const getTrendingProfessors = async (req: Request, res: Response): Promise<void> => {
  try {
    const trendingProfessors = await trendingModel.getTrendingProfessors(
      prisma,
      TrendingPeriod.WEEK,
      10
    );

    res.status(200).json({
      success: true,
      data: trendingProfessors
    });
  } catch (error) {
    console.error('Error getting trending professors:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve trending professors',
      error: (error as Error).message
    });
  }
};

/**
 * Get trending courses
 */
export const getTrendingCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    const trendingCourses = await trendingModel.getTrendingCourses(
      prisma,
      TrendingPeriod.WEEK,
      10
    );

    res.status(200).json({
      success: true,
      data: trendingCourses
    });
  } catch (error) {
    console.error('Error getting trending courses:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve trending courses',
      error: (error as Error).message
    });
  }
};

/**
 * Get trending colleges
 */
export const getTrendingColleges = async (req: Request, res: Response): Promise<void> => {
  try {
    const trendingColleges = await trendingModel.getTrendingColleges(
      prisma,
      TrendingPeriod.WEEK,
      10
    );

    res.status(200).json({
      success: true,
      data: trendingColleges
    });
  } catch (error) {
    console.error('Error getting trending colleges:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve trending colleges',
      error: (error as Error).message
    });
  }
};