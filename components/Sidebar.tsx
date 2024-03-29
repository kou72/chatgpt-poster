import { useChatGPT } from '../hooks/useChatGPT'

const Sidebar = () => {
  const {
    totalUsedYen,
    history,
    setInput,
    setOutput,
    setSystem,
    setChats,
    resetTotalUsedYen,
  } = useChatGPT()

  const handleClick = (index: number) => {
    setInput(history[index].input)
    setOutput(history[index].output)
    setSystem(history[index].system)
    setChats(history[index].chats)
    console.log(history[index].output)
  }

  const main = () => {
    return (
      <div className="hidden sm:inline-block">
        <div className="bg-gray-600 h-full text-center">
          <TotalYenUsed />
          <HistoryList />
        </div>
      </div>
    )
  }

  const TotalYenUsed = () => {
    return (
      <div className="p-4">
        <div className="border border-white rounded-md p-4">
          <p className="m-2 text-white">使った金額</p>
          <p className="m-2 text-white text-xl">
            {totalUsedYen.toFixed(3) ?? 0} 円
          </p>
          <button
            className="m-2 px-4 py-1 text-white bg-gray-500 rounded-md"
            onClick={resetTotalUsedYen}
          >
            Reset
          </button>
        </div>
      </div>
    )
  }

  const HistoryList = () => {
    return (
      <div className="overflow-y-auto">
        <ul className="list-none w-full flex flex-col-reverse">
          {history.map((item, index) => {
            const maxlength = 200
            const leader = item.input.length > maxlength ? '...' : ''
            return (
              <li
                key={index}
                className="py-2 px-4 m-2 max-h-32 overflow-hidden text-white text-xs text-left border border-white cursor-pointer rounded"
                onClick={() => handleClick(index)}
              >
                {item.input.slice(0, maxlength)}
                {leader}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return main()
}

export default Sidebar
