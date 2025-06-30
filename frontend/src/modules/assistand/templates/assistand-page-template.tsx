import {
  ChatContainer,
  ChatForm,
  ChatMessages,
} from "@/core/components/ui/chat"
import { MessageInput } from "@/core/components/ui/message-input"
import { MessageList } from "@/core/components/ui/message-list"
import { PromptSuggestions } from "@/core/components/ui/prompt-suggestions"
import { useChat } from "@ai-sdk/react"
const AssistandPageTemplate = () => {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    status,
    stop,
  } = useChat()

  const isLoading = status === "submitted" || status === "streaming"
  const lastMessage = messages.at(-1)
  const isEmpty = messages.length === 0
  const isTyping = lastMessage?.role === "user"

  return (
    <ChatContainer>
      {isEmpty ? (
        <PromptSuggestions
          label="Suggestions"
          append={append}
          suggestions={["What is the capital of France?", "Tell me a joke"]}
        />
      ) : null}

      {!isEmpty ? (
        <ChatMessages messages={messages}>
          <MessageList messages={messages} isTyping={isTyping} />
        </ChatMessages>
      ) : null}

      <ChatForm
        className="mt-auto"
        isPending={isLoading || isTyping}
        handleSubmit={handleSubmit}
      >
        {({ files, setFiles }) => (
          <MessageInput
            value={input}
            onChange={handleInputChange}
            allowAttachments
            files={files}
            setFiles={setFiles}
            stop={stop}
            isGenerating={isLoading}
          />
        )}
      </ChatForm>
    </ChatContainer>
  )
}

export default AssistandPageTemplate
