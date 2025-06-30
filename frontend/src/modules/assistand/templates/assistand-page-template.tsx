// frontend/src/modules/assistant/templates/assistant-page-template.tsx

import { SimpleChat } from "../components/simple-chat"
import { useCourseChat } from "../hooks/use-course-chat"

const AssistantPageTemplate = () => {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    append,
  } = useCourseChat()

  const suggestions = [
    "I want to learn programming for beginners",
    "Show me advanced JavaScript courses",
    "Find courses about data science",
    "What programming courses do you have?",
  ]

  const handleSuggestionClick = (suggestion: string) => {
    append({ role: "user", content: suggestion })
  }

  return (
    <div className="h-full">
      <SimpleChat
        messages={messages}
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        stop={stop}
        suggestions={suggestions}
        onSuggestionClick={handleSuggestionClick}
      />
    </div>
  )
}

export default AssistantPageTemplate
