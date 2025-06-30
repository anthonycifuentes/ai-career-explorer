# Courses AI API - Usage Examples

## Prerequisites

1. Install dependencies:

```bash
cd backend
npm install @ai-sdk/openai@4.3.16 zod ai
```

2. Set up environment variables:

```bash
cp .env.example .env
# Add your OpenAI API key to .env
```

3. Start the server:

```bash
npm run dev
```

## API Endpoints

### 1. Get All Courses

```bash
GET http://localhost:3000/api/courses
```

### 2. Search Courses by Keyword

```bash
GET http://localhost:3000/api/courses/search?q=programming
```

### 3. Get Courses by Category

```bash
GET http://localhost:3000/api/courses/category/Programming
```

### 4. Get Course by ID

```bash
GET http://localhost:3000/api/courses/1
```

### 5. AI-Powered Course Query (Requires OpenAI API Key)

```bash
POST http://localhost:3000/api/courses/ai-query
Content-Type: application/json

{
  "query": "I want to learn programming for beginners"
}
```

### 6. Simple Keyword-Based Query (No AI Required)

```bash
POST http://localhost:3000/api/courses/simple-query
Content-Type: application/json

{
  "query": "programming courses"
}
```

## Example Responses

### AI Query Response:

```json
{
  "success": true,
  "data": {
    "intent": "Looking for beginner programming courses",
    "courses": [
      {
        "id": "1",
        "title": "JavaScript Fundamentals",
        "description": "Learn the basics of JavaScript programming language...",
        "category": "Programming",
        "level": "beginner",
        "duration": "6 weeks",
        "price": 99,
        "instructor": "John Smith",
        "tags": ["javascript", "programming", "web development", "frontend"]
      }
    ],
    "explanation": "These courses are perfect for beginners wanting to start programming",
    "count": 1
  },
  "query": "I want to learn programming for beginners"
}
```

## Testing Without OpenAI API Key

If you don't have an OpenAI API key, you can still test the application using:

1. The simple query endpoint (`/api/courses/simple-query`)
2. Regular course endpoints (get all, search, by category, etc.)

The AI service has a fallback mechanism that uses keyword search if the OpenAI API fails.
