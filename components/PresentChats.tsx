import { useState, useRef } from 'react'
import { useChatGPT } from '../hooks/useChatGPT'

export const PresentChats = () => {
  const [isFocused, setIsFocused] = useState(false)

  const onFocusHandler = () => {
    setIsFocused(true)
  }

  const onBlurHandler = () => {
    setIsFocused(false)
  }

  return (
    <>
      <div className="w-full h-full overflow-y-auto">
        <textarea
          className={`bg-gray-300 p-1 resize-none w-full ${
            isFocused ? 'h-full' : 'h-[1.5rem]'
          } transition-all`}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          placeholder="ここにテキストを入力してください..."
        ></textarea>
        <textarea
          className={`bg-gray-300 p-1 resize-none w-full ${
            isFocused ? 'h-full' : 'h-[1.5rem]'
          } transition-all`}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          placeholder="ここにテキストを入力してください..."
        ></textarea>
      </div>
    </>
  )
}
