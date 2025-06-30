// src/controllers/courses-controller.ts

import { Request, Response } from "express";
import { CoursesService } from "../services/courses-service";
import { AIService } from "../../ai/services/ai-service";

export class CoursesController {
  /**
   * GET /api/courses - Get all courses
   */
  static async getAllCourses(req: Request, res: Response) {
    try {
      const courses = CoursesService.getAllCourses();

      res.json({
        success: true,
        data: courses,
        count: courses.length,
      });
    } catch (error) {
      console.error("Error getting all courses:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch courses",
      });
    }
  }

  /**
   * GET /api/courses/category/:category - Get courses by category
   */
  static async getCoursesByCategory(req: Request, res: Response) {
    try {
      const { category } = req.params;
      const courses = CoursesService.getCoursesByCategory(category);

      res.json({
        success: true,
        data: courses,
        count: courses.length,
        category,
      });
    } catch (error) {
      console.error("Error getting courses by category:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch courses by category",
      });
    }
  }

  /**
   * GET /api/courses/search?q= - Search courses
   */
  static async searchCourses(req: Request, res: Response) {
    try {
      const { q } = req.query;

      if (!q || typeof q !== "string") {
        return res.status(400).json({
          success: false,
          message: "Search query is required",
        });
      }

      const courses = CoursesService.searchCourses(q);

      res.json({
        success: true,
        data: courses,
        count: courses.length,
        query: q,
      });
    } catch (error) {
      console.error("Error searching courses:", error);
      res.status(500).json({
        success: false,
        message: "Failed to search courses",
      });
    }
  }

  /**
   * GET /api/courses/:id - Get course by ID
   */
  static async getCourseById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const course = CoursesService.getCourseById(id);

      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }

      res.json({
        success: true,
        data: course,
      });
    } catch (error) {
      console.error("Error getting course by ID:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch course",
      });
    }
  }

  /**
   * POST /api/courses/ai-query - AI-powered course recommendations
   */
  static async aiQueryCourses(req: Request, res: Response) {
    try {
      const { query } = req.body;

      if (!query || typeof query !== "string") {
        return res.status(400).json({
          success: false,
          message: "Query is required in request body",
        });
      }

      // Use AI service to get course recommendations
      const result = await AIService.queryCourses(query);

      res.json({
        success: true,
        data: {
          intent: result.intent,
          courses: result.courses,
          explanation: result.explanation,
          count: result.courses.length,
        },
        query,
      });
    } catch (error) {
      console.error("Error in AI course query:", error);
      res.status(500).json({
        success: false,
        message: "Failed to process AI query",
      });
    }
  }

  /**
   * POST /api/courses/simple-query - Simple keyword-based course recommendations
   */
  static async simpleQueryCourses(req: Request, res: Response) {
    try {
      const { query } = req.body;

      if (!query || typeof query !== "string") {
        return res.status(400).json({
          success: false,
          message: "Query is required in request body",
        });
      }

      // Use simple keyword matching
      const result = await AIService.simpleQueryCourses(query);

      res.json({
        success: true,
        data: {
          intent: result.intent,
          courses: result.courses,
          explanation: result.explanation,
          count: result.courses.length,
        },
        query,
      });
    } catch (error) {
      console.error("Error in simple course query:", error);
      res.status(500).json({
        success: false,
        message: "Failed to process simple query",
      });
    }
  }
}
