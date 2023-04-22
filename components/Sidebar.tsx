import { useChatGPT } from '../hooks/useChatGPT'

const Sidebar = () => {
  const { chatgpt, handleChatgpt } = useChatGPT()
  const usedYen = chatgpt.totalTokens * (0.002 / 1000) * 150

  const handleClick = (index: number) => {
    handleChatgpt.setInput(chatgpt.history[index].input)
    handleChatgpt.setOutput(chatgpt.history[index].output)
    console.log(chatgpt.history[index].input, chatgpt.history[index].output)
  }

  return (
    <div className="bg-gray-600 min-h-screen text-center">
      <div className="p-4">
        <div className="border border-white rounded-md p-4">
          <p className="m-2 text-white">使った金額</p>
          <p className="m-2 text-white text-xl">{usedYen.toFixed(3) ?? 0} 円</p>
          <button
            className="m-2 px-4 py-1 text-white bg-gray-500 rounded-md"
            onClick={handleChatgpt.resetTotalTokens}
          >
            Reset
          </button>
        </div>
      </div>
      <div className="overflow-y-auto">
        <ul className="list-none w-full flex flex-col-reverse">
          {chatgpt.history.map((item, index) => (
            <li
              key={index}
              className="py-2 px-4 m-2 max-h-32 overflow-hidden text-white text-xs text-left border border-white cursor-pointer rounded"
              onClick={() => handleClick(index)}
            >
              {item.input}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
