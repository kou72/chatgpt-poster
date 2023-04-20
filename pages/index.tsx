import { useChatGPT } from '../hooks/useChatGPT'
import Head from 'next/head'
// import MarkdownPreview from "../components/MarkdownPreview";
import ReactMarkdown from 'react-markdown'

export default function Home() {
  const { chatgpt, handleChatgpt } = useChatGPT()

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      console.log('key down cmd + Enter')
      handleChatgpt.requestChatGPT()
    }
  }

  const main = () => {
    return (
      <div className="bg-gray-700 min-h-screen pt-12">
        <div className="grid grid-cols-2 p-2 gap-2">
          <div className="col-span-1">
            <Textarea />
          </div>
          <div className="col-span-1">
            <Response />
          </div>
        </div>
      </div>
    )
  }

  const Textarea = () => {
    return (
      <textarea
        className="bg-gray-300 w-full h-[calc(100vh-5rem)] overflow-y-auto p-1"
        value={chatgpt.input}
        onChange={(e) => handleChatgpt.setInput(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
      ></textarea>
    )
  }

  const Response = () => {
    return (
      <div className="markdown-body h-[calc(100vh-5rem)] overflow-y-auto">
        {/* <MarkdownPreview>{chatgpt.output}</MarkdownPreview> */}
        <ReactMarkdown>{chatgpt.output}</ReactMarkdown>
      </div>
    )
  }

  return main()
}
