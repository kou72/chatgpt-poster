import { useChatGPT } from '../hooks/useChatGPT'

export const UserTextArea = () => {
  const { input, setInput, requestChatGPT } = useChatGPT()

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      console.log('key down cmd + Enter')
      requestChatGPT()
    }
  }

  return (
    <textarea
      className="bg-gray-300 w-full h-[99%] overflow-y-auto p-1"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => handleKeyDown(e)}
    ></textarea>
  )
}
