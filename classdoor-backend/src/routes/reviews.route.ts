import express from "express";
import {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  addReviewReaction,
  removeReviewReaction,
} from "../controllers/reviews.controller.js";

import { authenticateAnonymousUser } from "../middleware/auth.middleware.js";
import {
  validateBody,
  validateParams,
} from "../middleware/validator.middleware.js";
import { idParamSchema, reviewSchema } from "../schemas/index.js";

const reviewsRouter = express.Router();

reviewsRouter.get("/all", getAllReviews);
reviewsRouter.get("/:id", validateParams(idParamSchema), getReviewById);
reviewsRouter.post(
  "/create",
  authenticateAnonymousUser,
  validateBody(reviewSchema),
  createReview
);
reviewsRouter.put("/update/:id", validateParams(idParamSchema), updateReview);
reviewsRouter.delete("/delete/:id", validateParams(idParamSchema), deleteReview);
reviewsRouter.post(
  "/:id/reaction/:reactionType",
  authenticateAnonymousUser,
  validateParams(idParamSchema),
  addReviewReaction
);
reviewsRouter.delete(
  "/:id/reaction/:reactionType",
  authenticateAnonymousUser,
  validateParams(idParamSchema),
  removeReviewReaction
);

export default reviewsRouter;
