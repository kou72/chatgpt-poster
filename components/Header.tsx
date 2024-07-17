import { useChatGPT } from '../hooks/useChatGPT'

const Header = () => {
  const models = ['gpt-3.5-turbo', 'gpt-3.5-turbo-0301', 'gpt-4', 'gpt-4o']
  const {
    apikey,
    model,
    temperature,
    maxTokenCheck,
    maxTokens,
    chatMode,
    saveApikey,
    saveModel,
    saveTemperature,
    toggleMaxTokenCheck,
    toggleChatMode,
    saveMaxTokens,
    requestChatGPT,
  } = useChatGPT()

  const main = () => {
    return (
      <div className="h-full flex items-center gap-1 bg-gray-800">
        <div className="w-full hidden sm:flex">
          <ApiKey />
          <Model />
          <Temperature />
          <MaxTokens />
          <ChatMode />
        </div>
        <SendButton />
      </div>
    )
  }

  const ApiKey = () => {
    return (
      <>
        <span className="mx-1 text-white">API Key</span>
        <input
          type="password"
          className="w-1/8 pl-1"
          value={apikey}
          onChange={(e) => saveApikey(e.target.value)}
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
          value={model}
          onChange={(e) => saveModel(e.target.value)}
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
          value={temperature}
          onChange={(e) => saveTemperature(Number(e.target.value))}
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
          checked={maxTokenCheck}
          onChange={() => toggleMaxTokenCheck()}
        />

        <span className="mx-1 text-white">Max Tokens</span>
        <input
          className="w-1/12 pl-1"
          disabled={!maxTokenCheck}
          type="number"
          step="100"
          min="100"
          max="8000"
          value={maxTokens}
          onChange={(e) => saveMaxTokens(Number(e.target.value))}
        ></input>
      </>
    )
  }

  const SendButton = () => {
    return (
      <>
        <button
          className="ml-auto mr-2 px-2 bg-transparent border border-white rounded text-white"
          onClick={requestChatGPT}
        >
          Send
        </button>
      </>
    )
  }

  const ChatMode = () => {
    return (
      <>
        <input
          className="ml-2"
          type="checkbox"
          id="check"
          checked={chatMode}
          onChange={() => toggleChatMode()}
        />
        <span className="mx-1 text-white">Chat Mode</span>
      </>
    )
  }

  return main()
}

export default Header
