// src/services/courses-service.ts

import { Course, mockCourses } from "../../../data/courses-data";

export class CoursesService {
  /**
   * Get all courses
   */
  static getAllCourses(): Course[] {
    return mockCourses;
  }

  /**
   * Get courses by category
   */
  static getCoursesByCategory(category: string): Course[] {
    return mockCourses.filter(
      (course) => course.category.toLowerCase() === category.toLowerCase()
    );
  }

  /**
   * Get courses by level
   */
  static getCoursesByLevel(level: string): Course[] {
    return mockCourses.filter(
      (course) => course.level.toLowerCase() === level.toLowerCase()
    );
  }

  /**
   * Search courses by tags or keywords
   */
  static searchCourses(query: string): Course[] {
    const searchTerm = query.toLowerCase();

    return mockCourses.filter(
      (course) =>
        course.title.toLowerCase().includes(searchTerm) ||
        course.description.toLowerCase().includes(searchTerm) ||
        course.category.toLowerCase().includes(searchTerm) ||
        course.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
    );
  }

  /**
   * Get course by ID
   */
  static getCourseById(id: string): Course | undefined {
    return mockCourses.find((course) => course.id === id);
  }

  /**
   * Get courses by multiple criteria
   */
  static getCoursesFiltered(filters: {
    category?: string;
    level?: string;
    tags?: string[];
    maxPrice?: number;
  }): Course[] {
    let filteredCourses = mockCourses;

    if (filters.category) {
      filteredCourses = filteredCourses.filter(
        (course) =>
          course.category.toLowerCase() === filters.category!.toLowerCase()
      );
    }

    if (filters.level) {
      filteredCourses = filteredCourses.filter(
        (course) => course.level.toLowerCase() === filters.level!.toLowerCase()
      );
    }

    if (filters.tags && filters.tags.length > 0) {
      filteredCourses = filteredCourses.filter((course) =>
        filters.tags!.some((tag) =>
          course.tags.some((courseTag) =>
            courseTag.toLowerCase().includes(tag.toLowerCase())
          )
        )
      );
    }

    if (filters.maxPrice) {
      filteredCourses = filteredCourses.filter(
        (course) => course.price <= filters.maxPrice!
      );
    }

    return filteredCourses;
  }
}
