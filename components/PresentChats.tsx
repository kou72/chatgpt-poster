import { useState, useRef } from 'react'
import { useChatGPT } from '../hooks/useChatGPT'

export const PresentChats = () => {
  const [expanded, setExpanded] = useState(false)
  const [arrowDirection, setArrowDirection] = useState('down')
  const textAreaRef = useRef(null)

  const handleButtonClick = () => {
    setExpanded(!expanded)
    setArrowDirection(arrowDirection === 'down' ? 'up' : 'down')
  }

  const handleBlur = () => {
    setExpanded(false)
    setArrowDirection('down')
  }

  return (
    <>
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
    </>
  )
}
