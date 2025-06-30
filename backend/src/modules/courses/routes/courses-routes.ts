// src/routes/courses-routes.ts

import { Router } from "express";
import { CoursesController } from "../controllers/courses-controller";

const router = Router();

// GET /api/courses - Get all courses
router.get("/", CoursesController.getAllCourses);

// GET /api/courses/search?q=query - Search courses
router.get("/search", CoursesController.searchCourses);

// GET /api/courses/category/:category - Get courses by category
router.get("/category/:category", CoursesController.getCoursesByCategory);

// GET /api/courses/:id - Get course by ID
router.get("/:id", CoursesController.getCourseById);

// POST /api/courses/ai-query - AI-powered course recommendations
router.post("/ai-query", CoursesController.aiQueryCourses);

// POST /api/courses/simple-query - Simple keyword-based recommendations
router.post("/simple-query", CoursesController.simpleQueryCourses);

export default router;
