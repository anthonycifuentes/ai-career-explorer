// src/data/courses-data.ts

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  price: number;
  instructor: string;
  tags: string[];
}

export const mockCourses: Course[] = [
  {
    id: "1",
    title: "JavaScript Fundamentals",
    description:
      "Learn the basics of JavaScript programming language including variables, functions, and DOM manipulation.",
    category: "Programming",
    level: "beginner",
    duration: "6 weeks",
    price: 99,
    instructor: "John Smith",
    tags: ["javascript", "programming", "web development", "frontend"],
  },
  {
    id: "2",
    title: "React Advanced Patterns",
    description:
      "Master advanced React concepts including hooks, context, and performance optimization techniques.",
    category: "Programming",
    level: "advanced",
    duration: "8 weeks",
    price: 199,
    instructor: "Sarah Johnson",
    tags: ["react", "javascript", "frontend", "web development"],
  },
  {
    id: "3",
    title: "Node.js Backend Development",
    description:
      "Build scalable backend applications with Node.js, Express, and database integration.",
    category: "Programming",
    level: "intermediate",
    duration: "10 weeks",
    price: 149,
    instructor: "Mike Davis",
    tags: ["nodejs", "backend", "javascript", "api development"],
  },
  {
    id: "4",
    title: "Python Data Science",
    description:
      "Analyze data and build machine learning models using Python, pandas, and scikit-learn.",
    category: "Data Science",
    level: "intermediate",
    duration: "12 weeks",
    price: 179,
    instructor: "Dr. Lisa Chen",
    tags: ["python", "data science", "machine learning", "analytics"],
  },
  {
    id: "5",
    title: "Digital Marketing Strategy",
    description:
      "Learn how to create effective digital marketing campaigns across multiple channels.",
    category: "Marketing",
    level: "beginner",
    duration: "4 weeks",
    price: 79,
    instructor: "Amanda Wilson",
    tags: ["marketing", "digital marketing", "social media", "strategy"],
  },
  {
    id: "6",
    title: "UI/UX Design Principles",
    description:
      "Master the fundamentals of user interface and user experience design.",
    category: "Design",
    level: "beginner",
    duration: "7 weeks",
    price: 129,
    instructor: "Carlos Rodriguez",
    tags: ["design", "ui", "ux", "user experience"],
  },
  {
    id: "7",
    title: "AWS Cloud Architecture",
    description:
      "Learn to design and deploy scalable applications on Amazon Web Services.",
    category: "Cloud Computing",
    level: "intermediate",
    duration: "9 weeks",
    price: 219,
    instructor: "Robert Kim",
    tags: ["aws", "cloud", "architecture", "devops"],
  },
  {
    id: "8",
    title: "Mobile App Development with Flutter",
    description:
      "Create cross-platform mobile applications using Flutter and Dart.",
    category: "Programming",
    level: "intermediate",
    duration: "11 weeks",
    price: 169,
    instructor: "Emma Thompson",
    tags: ["flutter", "mobile development", "dart", "cross-platform"],
  },
];
