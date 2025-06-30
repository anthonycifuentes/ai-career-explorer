# Course AI Assistant - Frontend

A simple React frontend for the Course AI Assistant that helps users discover courses through AI-powered search.

## 🚀 Features

- **AI-Powered Course Search**: Natural language course queries
- **Clean Chat Interface**: Simple and intuitive chat UI
- **Responsive Design**: Works on desktop and mobile
- **Fallback System**: Graceful degradation when AI is unavailable

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **TanStack Router** for routing
- **Tailwind CSS** for styling
- **shadcn/ui** components
- **Vite** for development

## 📁 Project Structure

```
frontend/src/
├── core/
│   ├── components/ui/       # UI components
│   ├── hooks/               # Custom hooks
│   └── lib/                 # Utilities
├── modules/assistant/       # Chat functionality
└── routes/                  # App routes
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- Backend running on `http://localhost:3000`

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser at http://localhost:5173
```

## 🔧 Available Scripts

```bash
npm run dev      # Development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🌐 API Integration

Connects to backend endpoints:

- `POST /api/courses/ai-query` - AI-powered search
- `POST /api/courses/simple-query` - Fallback search
- `GET /api/courses` - All courses

### Request Format

```json
{
  "query": "I want to learn programming for beginners"
}
```

## 🎯 Key Components

- **Assistant Module**: Main chat functionality
- **Course Service**: API communication with fallback
- **Chat Hook**: State management for conversations

## 🚨 Error Handling

1. AI query fails → Falls back to simple search
2. Simple search fails → Shows friendly error message
3. Network issues → Graceful degradation

## 🚀 Deployment

```bash
# Build for production
npm run build

# Deploy to Vercel/Netlify
# Build command: npm run build
# Output directory: dist
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Submit Pull Request

---

**Simple, fast, and effective course discovery powered by AI**
