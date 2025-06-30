// frontend/src/modules/assistant/services/chat-service.ts

interface CourseQueryRequest {
  query: string
}

interface Course {
  id: string
  title: string
  description: string
  category: string
  level: string
  duration: string
  price: number
  instructor: string
  tags: string[]
}

interface CourseQueryResponse {
  success: boolean
  data: {
    intent: string
    courses: Course[]
    explanation: string
    count: number
  }
  query: string
}

const baseUrl = "http://localhost:3000/api"

const simpleQuery = async (query: string): Promise<CourseQueryResponse> => {
  try {
    const response = await fetch(`${baseUrl}/courses/simple-query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })

    if (!response.ok) {
      throw new Error("Simple query failed")
    }

    return await response.json()
  } catch (error) {
    console.error("Simple query failed:", error)
    // Return empty result if all fails
    return {
      success: false,
      data: {
        intent: "No results found",
        courses: [],
        explanation: "Sorry, I could not find any courses matching your query.",
        count: 0,
      },
      query,
    }
  }
}

export const queryCourses = async (
  query: string
): Promise<CourseQueryResponse> => {
  try {
    const response = await fetch(`${baseUrl}/courses/ai-query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })

    if (!response.ok) {
      // If AI query fails, fallback to simple query
      return simpleQuery(query)
    }

    return await response.json()
  } catch (error) {
    console.error("AI query failed, using fallback:", error)
    return simpleQuery(query)
  }
}

export const getAllCourses = async (): Promise<Course[]> => {
  try {
    const response = await fetch(`${baseUrl}/courses`)
    if (!response.ok) {
      throw new Error("Failed to fetch courses")
    }
    return await response.json()
  } catch (error) {
    console.error("Failed to fetch all courses:", error)
    return []
  }
}

export const getCoursesByCategory = async (
  category: string
): Promise<Course[]> => {
  try {
    const response = await fetch(`${baseUrl}/courses/category/${category}`)
    if (!response.ok) {
      throw new Error("Failed to fetch courses by category")
    }
    return await response.json()
  } catch (error) {
    console.error("Failed to fetch courses by category:", error)
    return []
  }
}
