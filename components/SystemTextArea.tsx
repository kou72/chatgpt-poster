import { useChatGPT } from '../hooks/useChatGPT'

export const SystemTextArea = () => {
  const { system, setSystem, requestChatGPT } = useChatGPT()

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      requestChatGPT()
    }
  }

  return (
    <textarea
      className="bg-gray-300 w-full h-full overflow-y-auto p-1 resize-none"
      placeholder="System（AIの振る舞いを指示）"
      value={system}
      onChange={(e) => setSystem(e.target.value)}
      onKeyDown={(e) => handleKeyDown(e)}
    ></textarea>
  )
}
