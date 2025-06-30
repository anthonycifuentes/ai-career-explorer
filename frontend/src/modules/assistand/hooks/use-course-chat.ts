// frontend/src/modules/assistant/hooks/use-course-chat.ts

import { useCallback, useState } from "react"
import { queryCourses } from "../services/chat-service"

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  createdAt: Date
}

export function useCourseChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInput(e.target.value)
    },
    []
  )

  const addMessage = useCallback(
    (message: Omit<Message, "id" | "createdAt">) => {
      const newMessage: Message = {
        ...message,
        id: Date.now().toString(),
        createdAt: new Date(),
      }
      setMessages((prev) => [...prev, newMessage])
      return newMessage
    },
    []
  )

  const formatCoursesResponse = (response: any) => {
    if (!response.success || response.data.courses.length === 0) {
      return (
        response.data.explanation ||
        "I couldn't find any courses matching your query."
      )
    }

    const { courses, explanation, count } = response.data

    let formattedResponse = `${explanation}\n\n`
    formattedResponse += `**Found ${count} course${count !== 1 ? "s" : ""}:**\n\n`

    courses.forEach((course: any, index: number) => {
      formattedResponse += `**${index + 1}. ${course.title}**\n`
      formattedResponse += `- **Instructor:** ${course.instructor}\n`
      formattedResponse += `- **Level:** ${course.level}\n`
      formattedResponse += `- **Duration:** ${course.duration}\n`
      formattedResponse += `- **Price:** $${course.price}\n`
      formattedResponse += `- **Category:** ${course.category}\n`
      formattedResponse += `- **Description:** ${course.description}\n\n`
    })

    return formattedResponse
  }

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault()

      if (!input.trim() || isLoading) return

      const userMessage = input.trim()
      setInput("")

      // Add user message
      addMessage({
        role: "user",
        content: userMessage,
      })

      setIsLoading(true)

      try {
        // Query the backend
        const response = await queryCourses(userMessage)

        // Format and add assistant response
        const formattedResponse = formatCoursesResponse(response)

        addMessage({
          role: "assistant",
          content: formattedResponse,
        })
      } catch (error) {
        console.error("Chat error:", error)
        addMessage({
          role: "assistant",
          content:
            "Sorry, I encountered an error while processing your request. Please try again.",
        })
      } finally {
        setIsLoading(false)
      }
    },
    [input, isLoading, addMessage]
  )

  const append = useCallback(
    (message: { role: "user"; content: string }) => {
      setInput(message.content)
      // Trigger submit after setting input
      setTimeout(() => {
        handleSubmit()
      }, 0)
    },
    [handleSubmit]
  )

  const stop = useCallback(() => {
    setIsLoading(false)
  }, [])

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    isLoading,
    stop,
  }
}
