import { useState, useRef } from 'react'
import { useChatGPT } from '../hooks/useChatGPT'

export const PresentChats = () => {
  const [focusedTextarea, setFocusedTextarea] = useState<number | null>(null)
  const { chats, addChat, removeChat, updateChatContent } = useChatGPT()

  return (
    <div className="w-full h-full overflow-y-auto flex flex-col">
      {chats.map((chat, index) => (
        <div key={index} className={`flex p-1`}>
          <textarea
            value={chat.content}
            className={`p-1 resize-none grow transition-all overflow-y-auto ${
              focusedTextarea === index ? 'h-[12rem]' : 'h-[2rem]'
            }  ${chat.role === 'user' ? 'bg-gray-300' : 'bg-gray-500'}`}
            onFocus={() => setFocusedTextarea(index)}
            onBlur={() => setFocusedTextarea(null)}
            onChange={(event) => updateChatContent(index, event.target.value)}
            placeholder={
              chat.role === 'user'
                ? 'user（サンプルの質問）'
                : 'assistant（期待する回答）'
            }
          ></textarea>
          <div className="w-1/12">
            <p
              className="text-white p-1 cursor-pointer"
              onClick={() => removeChat(index)}
            >
              削除
            </p>
          </div>
        </div>
      ))}
      <button
        className="text-white bg-gray-500 px-4 py-2 m-2 rounded-md"
        onClick={addChat}
      >
        要素を追加
      </button>
    </div>
  )
}
