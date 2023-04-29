import { useChatGPT } from '../hooks/useChatGPT'

export const UserTextArea = () => {
  const { input, setInput, requestChatGPT } = useChatGPT()

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      requestChatGPT()
    }
  }

  return (
    <textarea
      className="bg-gray-300 w-full h-full overflow-y-auto p-1 resize-none"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => handleKeyDown(e)}
    ></textarea>
  )
}
