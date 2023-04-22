import React, { useState, useRef } from 'react'
import { useChatGPT } from '../hooks/useChatGPT'
// import MarkdownPreview from "../components/MarkdownPreview";
import ReactMarkdown from 'react-markdown'
import { SystemTextArea } from '@/components/SystemTextArea'

export default function Home() {
  const { chatgpt, handleChatgpt } = useChatGPT()
  const [expanded, setExpanded] = useState(false)
  const [arrowDirection, setArrowDirection] = useState('down')
  const textAreaRef = useRef(null)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      console.log('key down cmd + Enter')
      handleChatgpt.requestChatGPT()
    }
  }

  const handleButtonClick = () => {
    setExpanded(!expanded)
    setArrowDirection(arrowDirection === 'down' ? 'up' : 'down')
  }

  const handleBlur = () => {
    setExpanded(false)
    setArrowDirection('down')
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
              <button className="w-full" onClick={handleButtonClick}>
                {arrowDirection === 'down' ? '▼' : '▲'}
              </button>
              <div
                className={`${
                  expanded ? 'h-[calc(100vh-9rem)]' : 'h-0'
                } overflow-hidden bg-gray-300 w-full absolute top-12 transition-all duration-500 ease-in-out`}
              >
                <textarea
                  ref={textAreaRef}
                  className={`bg-gray-300 w-full h-[calc(100vh-9rem)] overflow-y-auto p-1 transition-all duration-500 ease-in-out`}
                  onBlur={handleBlur}
                ></textarea>
              </div>
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
