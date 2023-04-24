import { useChatGPT } from '../hooks/useChatGPT'

const Sidebar = () => {
  const {
    totalTokens,
    history,
    setInput,
    setOutput,
    setSystem,
    setChats,
    resetTotalTokens,
  } = useChatGPT()
  const usedYen = totalTokens * (0.002 / 1000) * 150

  const handleClick = (index: number) => {
    setInput(history[index].input)
    setOutput(history[index].output)
    setSystem(history[index].system)
    setChats(history[index].chats)
    console.log(history[index].input, history[index].output)
  }

  return (
    <div className="bg-gray-600 h-full text-center">
      <div className="p-4">
        <div className="border border-white rounded-md p-4">
          <p className="m-2 text-white">使った金額</p>
          <p className="m-2 text-white text-xl">{usedYen.toFixed(3) ?? 0} 円</p>
          <button
            className="m-2 px-4 py-1 text-white bg-gray-500 rounded-md"
            onClick={resetTotalTokens}
          >
            Reset
          </button>
        </div>
      </div>
      <div className="overflow-y-auto">
        <ul className="list-none w-full flex flex-col-reverse">
          {history.map((item, index) => (
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
