import { useChatGPT } from '../hooks/useChatGPT'
// import MarkdownPreview from "../components/MarkdownPreview";
import ReactMarkdown from 'react-markdown'
import { SystemTextArea } from '@/components/SystemTextArea'
import { UserTextArea } from '@/components/UserTextArea'
import { PresentChats } from '@/components/PresentChats'

export default function Home() {
  const { chatgpt, handleChatgpt } = useChatGPT()

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
          <div className="grid grid-cols-2 p-2 gap-2 h-[calc(100vh-9rem)]">
            <div className="col-span-1">
              <UserTextArea />
            </div>
            <div className="col-span-1">
              <div className="markdown-body h-full overflow-y-auto">
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
