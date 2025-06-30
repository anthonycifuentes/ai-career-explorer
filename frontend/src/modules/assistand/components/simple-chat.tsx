// frontend/src/modules/assistant/components/simple-chat.tsx

import { Button } from "@/core/components/ui/button"
import { cn } from "@/core/lib/utils"
import { ArrowUp, Square } from "lucide-react"
import React from "react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  createdAt: Date
}

interface SimpleChatProps {
  messages: Message[]
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleSubmit: (e?: React.FormEvent) => void
  isLoading: boolean
  stop: () => void
  suggestions?: string[]
  onSuggestionClick?: (suggestion: string) => void
}

export function SimpleChat({
  messages,
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  stop,
  suggestions,
  onSuggestionClick,
}: SimpleChatProps) {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSubmit(e)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="mx-auto flex h-full max-w-4xl flex-col">
      {/* Messages Area */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.length === 0 && suggestions ? (
          <div className="space-y-6">
            <h2 className="text-center text-2xl font-bold">Course Assistant</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => onSuggestionClick?.(suggestion)}
                  className="bg-background hover:bg-muted rounded-xl border p-4 text-left transition-colors"
                >
                  <p className="text-sm">{suggestion}</p>
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[80%] rounded-lg p-3 text-sm",
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              )}
            >
              <div className="whitespace-pre-wrap">{message.content}</div>
              <div className="mt-1 text-xs opacity-50">
                {message.createdAt.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted text-foreground rounded-lg p-3 text-sm">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-current" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:0.1s]" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:0.2s]" />
                </div>
                <span>Searching courses...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t p-4">
        <form onSubmit={onSubmit} className="relative flex items-end space-x-2">
          <div className="flex w-full items-center justify-between gap-2">
            <textarea
              value={input}
              onChange={handleInputChange}
              onKeyDown={onKeyDown}
              placeholder="Ask about courses..."
              className="focus:ring-primary w-full resize-none rounded-xl border p-3 pr-12 focus:ring-2 focus:outline-none"
              rows={1}
              style={{ minHeight: "44px", maxHeight: "120px" }}
            />
            <div>
              {isLoading ? (
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="h-12 w-12"
                  onClick={stop}
                >
                  <Square className="h-4 w-4" fill="currentColor" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  size="icon"
                  className="h-12 w-12"
                  disabled={!input.trim() || isLoading}
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
