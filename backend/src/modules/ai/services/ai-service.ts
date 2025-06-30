// src/services/ai-service.ts

import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";
import { Course } from "../../../data/courses-data";
import { CoursesService } from "../../courses/services/courses-service";

// Schema for the AI response
const CourseRecommendationSchema = z.object({
  intent: z.string().describe("The user's intent or what they are looking for"),
  recommendedCourses: z
    .array(z.string())
    .describe("Array of course IDs that match the user query"),
  explanation: z
    .string()
    .describe("Brief explanation of why these courses were recommended"),
});

export class AIService {
  private static model = openai("gpt-3.5-turbo");

  /**
   * Process user query and return relevant courses using AI
   */
  static async queryCourses(userQuery: string): Promise<{
    intent: string;
    courses: Course[];
    explanation: string;
  }> {
    try {
      // Get all available courses
      const allCourses = CoursesService.getAllCourses();

      // Create a simplified course list for the AI prompt
      const coursesList = allCourses.map((course) => ({
        id: course.id,
        title: course.title,
        category: course.category,
        level: course.level,
        tags: course.tags,
        description: course.description.substring(0, 100) + "...",
      }));

      // Generate AI response
      const { object } = await generateObject({
        model: this.model,
        schema: CourseRecommendationSchema,
        prompt: `
          You are a course recommendation assistant. Based on the user's query, recommend relevant courses from the available catalog.
          
          User Query: "${userQuery}"
          
          Available Courses:
          ${JSON.stringify(coursesList, null, 2)}
          
          Instructions:
          1. Analyze the user's intent and what type of courses they're looking for
          2. Select the most relevant course IDs that match their query
          3. Provide a brief explanation of why these courses are recommended
          4. If no courses match well, still provide the closest matches and explain why
          
          Return the course IDs, not the full course objects.
        `,
      });

      // Get the full course details for recommended courses
      const recommendedCourses = object.recommendedCourses
        .map((courseId) => CoursesService.getCourseById(courseId))
        .filter((course) => course !== undefined) as Course[];

      return {
        intent: object.intent,
        courses: recommendedCourses,
        explanation: object.explanation,
      };
    } catch (error) {
      console.error("AI Service Error:", error);

      // Fallback: simple text search if AI fails
      const fallbackCourses = CoursesService.searchCourses(userQuery);

      return {
        intent: "Fallback search due to AI service error",
        courses: fallbackCourses,
        explanation: `Showing results based on keyword search for: "${userQuery}"`,
      };
    }
  }

  /**
   * Simple keyword-based course recommendation (backup method)
   */
  static async simpleQueryCourses(userQuery: string): Promise<{
    intent: string;
    courses: Course[];
    explanation: string;
  }> {
    const query = userQuery.toLowerCase();
    let courses: Course[] = [];
    let intent = "";
    let explanation = "";

    // Simple keyword matching logic
    if (
      query.includes("programming") ||
      query.includes("coding") ||
      query.includes("development")
    ) {
      courses = CoursesService.getCoursesByCategory("Programming");
      intent = "Looking for programming courses";
      explanation = "Found programming and development related courses";
    } else if (
      query.includes("data") ||
      query.includes("analytics") ||
      query.includes("science")
    ) {
      courses = CoursesService.getCoursesByCategory("Data Science");
      intent = "Looking for data science courses";
      explanation = "Found data science and analytics related courses";
    } else if (
      query.includes("design") ||
      query.includes("ui") ||
      query.includes("ux")
    ) {
      courses = CoursesService.getCoursesByCategory("Design");
      intent = "Looking for design courses";
      explanation = "Found UI/UX and design related courses";
    } else if (query.includes("marketing") || query.includes("digital")) {
      courses = CoursesService.getCoursesByCategory("Marketing");
      intent = "Looking for marketing courses";
      explanation = "Found marketing and digital marketing courses";
    } else if (query.includes("cloud") || query.includes("aws")) {
      courses = CoursesService.getCoursesByCategory("Cloud Computing");
      intent = "Looking for cloud computing courses";
      explanation = "Found cloud computing and AWS related courses";
    } else if (
      query.includes("beginner") ||
      query.includes("easy") ||
      query.includes("basic")
    ) {
      courses = CoursesService.getCoursesByLevel("beginner");
      intent = "Looking for beginner-friendly courses";
      explanation = "Found beginner level courses across various categories";
    } else {
      // General search
      courses = CoursesService.searchCourses(userQuery);
      intent = "General course search";
      explanation = `Showing results matching: "${userQuery}"`;
    }

    return {
      intent,
      courses,
      explanation,
    };
  }
}
