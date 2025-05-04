import express from 'express';
import * as trendingController from '../controllers/trending.controller.js';

const router = express.Router();

// Simple routes without query parameters
router.get('/home', trendingController.getHomePageTrending);
router.get('/professors', trendingController.getTrendingProfessors);
router.get('/courses', trendingController.getTrendingCourses);
router.get('/colleges', trendingController.getTrendingColleges);

export default router;