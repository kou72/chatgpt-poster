import { useContext } from "react";
import { ChatGPTContext } from "../hooks/useChatGPT";

const Header = () => {
  const { chatgpt, handleChatgpt } = useContext(ChatGPTContext);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-12 bg-gray-600 z-10">
        <div className="flex items-center h-12">
          <span className="mx-1 text-white">API Key</span>
          <input
            className="w-1/8 pl-1"
            value={chatgpt.apikey}
            onChange={(e) => handleChatgpt.setApikey(e.target.value)}
          ></input>
          <span className="mx-1 text-white">Model</span>
          <input
            className="w-1/12 pl-1"
            value={chatgpt.model}
            onChange={(e) => handleChatgpt.setModel(e.target.value)}
          ></input>
          <span className="mx-1 text-white">Temperature</span>
          <input
            className="w-1/12 pl-1"
            value={chatgpt.temperature}
            onChange={(e) =>
              handleChatgpt.setTemperature(Number(e.target.value))
            }
          ></input>
          <span className="mx-1 text-white">Max Tokens</span>
          <input
            className="w-1/12 pl-1"
            value={chatgpt.maxTokens}
            onChange={(e) => handleChatgpt.setMaxTokens(Number(e.target.value))}
          ></input>
          <button
            className="mx-2 px-2 bg-transparent border border-white rounded text-white"
            onClick={handleChatgpt.requestChatGPT}
          >
            Send
          </button>
          <button
            className="mx-2 px-2 bg-transparent border border-white rounded text-white"
            onClick={() => handleChatgpt.setOutput("test")}
          >
            Test
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
