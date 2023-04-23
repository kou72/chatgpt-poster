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
      <div className="w-full h-full overflow-y-auto flex flex-col">
        <div className="h-full flex justify-between items-center p-1">
          <div className="w-1/12">
            <p>user</p>
          </div>
          <textarea
            className={`bg-gray-300 p-1 resize-none flex-grow ${
              isFocused ? 'h-full' : 'h-[1.5rem]'
            } transition-all`}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
            placeholder="ここにテキストを入力してください..."
          ></textarea>
          <div className="w-1/12">
            <p>削除</p>
          </div>
        </div>
        <div className="h-full flex justify-between items-center p-1">
          <div className="w-1/12">
            <p>assistant</p>
          </div>
          <textarea
            className={`bg-gray-300 p-1 resize-none flex-grow ${
              isFocused ? 'h-full' : 'h-[1.5rem]'
            } transition-all`}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
            placeholder="ここにテキストを入力してください..."
          ></textarea>
          <div className="w-1/12">
            <p>削除</p>
          </div>
        </div>
      </div>
    </>
  )
}
