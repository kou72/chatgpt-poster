import { useChatGPT } from '../hooks/useChatGPT'

const Header = () => {
  const models = ['gpt-3.5-turbo', 'gpt-3.5-turbo-0301']
  const { chatgpt, handleChatgpt } = useChatGPT()

  const main = () => {
    return (
      <div className="fixed top-0 left-0 w-full h-12 bg-gray-800 z-10">
        <div className="flex items-center h-12 gap-1">
          <ApiKey />
          <Model />
          <Temperature />
          <MaxTokens />
          <SendButton />
        </div>
      </div>
    )
  }

  const ApiKey = () => {
    return (
      <>
        <span className="mx-1 text-white">API Key</span>
        <input
          className="w-1/8 pl-1"
          value={chatgpt.apikey}
          onChange={(e) => handleChatgpt.saveApikey(e.target.value)}
        ></input>
      </>
    )
  }

  const Model = () => {
    return (
      <>
        <span className="mx-1 text-white">Model</span>
        <select
          className="w-1/8 pl-1"
          value={chatgpt.model}
          onChange={(e) => handleChatgpt.saveModel(e.target.value)}
        >
          {models.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      </>
    )
  }

  const Temperature = () => {
    return (
      <>
        <span className="mx-1 text-white">Temperature</span>
        <input
          className="w-1/12 pl-1"
          type="number"
          step="0.1"
          min="0"
          max="1"
          value={chatgpt.temperature}
          onChange={(e) =>
            handleChatgpt.saveTemperature(Number(e.target.value))
          }
        ></input>
      </>
    )
  }

  const MaxTokens = () => {
    return (
      <>
        <input
          className="ml-2"
          type="checkbox"
          id="check"
          checked={chatgpt.maxTokenCheck}
          onChange={() => handleChatgpt.toggleMaxTokenCheck()}
        />

        <span className="mx-1 text-white">Max Tokens</span>
        <input
          className="w-1/12 pl-1"
          disabled={!chatgpt.maxTokenCheck}
          type="number"
          step="100"
          min="100"
          max="3000"
          value={chatgpt.maxTokens}
          onChange={(e) => handleChatgpt.saveMaxTokens(Number(e.target.value))}
        ></input>
      </>
    )
  }

  const SendButton = () => {
    return (
      <>
        <button
          className="ml-auto mr-2 px-2 bg-transparent border border-white rounded text-white"
          onClick={handleChatgpt.requestChatGPT}
        >
          Send
        </button>
      </>
    )
  }

  return main()
}

export default Header
