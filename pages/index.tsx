import { useChatGPT } from '../hooks/useChatGPT'
// import MarkdownPreview from "../components/MarkdownPreview";
import ReactMarkdown from 'react-markdown'
import { SystemTextArea } from '@/components/SystemTextArea'
import { PresentChats } from '@/components/PresentChats'

export default function Home() {
  const { chatgpt, handleChatgpt } = useChatGPT()

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      console.log('key down cmd + Enter')
      handleChatgpt.requestChatGPT()
    }
  }

  return (
    <div className="bg-gray-700 min-h-screen pt-12">
      <div className="flex flex-col h-full">
        <div className="h-1/12">
          <div className="grid grid-cols-2 px-2 pt-2 gap-2">
            <div className="col-span-1">
              <SystemTextArea />
            </div>
            <div className="col-span-1">
              <PresentChats />
            </div>
          </div>
        </div>
        <div className="h-11/12">
          <div className="grid grid-cols-2 p-2 gap-2">
            <div className="col-span-1">
              <textarea
                className="bg-gray-300 w-full h-[calc(100vh-9rem)] overflow-y-auto p-1"
                value={chatgpt.input}
                onChange={(e) => handleChatgpt.setInput(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
              ></textarea>
            </div>
            <div className="col-span-1">
              <div className="markdown-body h-[calc(100vh-9rem)] overflow-y-auto">
                {/* <MarkdownPreview>{chatgpt.output}</MarkdownPreview> */}
                <ReactMarkdown>{chatgpt.output}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
