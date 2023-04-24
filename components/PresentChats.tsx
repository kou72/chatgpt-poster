import { useState, useRef } from 'react'
import { useChatGPT } from '../hooks/useChatGPT'

import { useState, useRef } from 'react'

export const PresentChats = () => {
  const [focusedTextarea, setFocusedTextarea] = useState<number | null>(null)
  const [chats, setChats] = useState([
    { role: 'user', content: '質問1' },
    { role: 'assistant', content: '回答1.' },
    { role: 'user', content: '質問2' },
    { role: 'assistant', content: '回答2.' },
  ])

  const onFocusHandler = (index: number) => {
    setFocusedTextarea(index)
  }

  const onBlurHandler = () => {
    setFocusedTextarea(null)
  }

  const addChat = () => {
    setChats([
      ...chats,
      { role: 'user', content: '新しい質問' },
      { role: 'assistant', content: '新しい回答' },
    ])
  }

  return (
    <>
      <div className="w-full h-full overflow-y-auto flex flex-col">
        {chats.map((chat, index) => (
          <div key={index} className={`flex p-1`}>
            <div className="w-1/12">
              <p>{chat.role}</p>
            </div>
            <textarea
              value={chat.content}
              className={`bg-gray-300 p-1 resize-none grow transition-all overflow-y-auto ${
                focusedTextarea === index ? 'h-[12rem]' : 'h-[3rem]'
              }`}
              onFocus={() => onFocusHandler(index)}
              onBlur={onBlurHandler}
              placeholder="ここにテキストを入力してください..."
            ></textarea>
            <div className="w-1/12">
              <p>削除</p>
            </div>
          </div>
        ))}
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
        onClick={addChat}
      >
        要素を追加
      </button>
    </>
  )
}
