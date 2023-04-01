import { useParameter } from "../hooks/useParameter";

const Header = () => {
  const { Parameter, handleParameter } = useParameter();

  return (
    <>
      <header
        data-role="Header"
        className="fixed top-0 left-0 w-full h-12 bg-gray-600 z-10"
      >
        <div className="flex items-center h-12">
          <span className="mx-1">API Key</span>
          <input
            className="w-1/8 pl-1"
            value={Parameter.apikey}
            onChange={(e) => handleParameter.setApikey(e.target.value)}
          ></input>
          <span className="mx-1">Model</span>
          <input
            className="w-1/12 pl-1"
            value={Parameter.model}
            onChange={(e) => handleParameter.setModel(e.target.value)}
          ></input>
          <span className="mx-1">Temperature</span>
          <input
            className="w-1/12 pl-1"
            value={Parameter.temperature}
            onChange={(e) => handleParameter.setTemperature(e.target.value)}
          ></input>
          <span className="mx-1">Max Tokens</span>
          <input
            className="w-1/12 pl-1"
            value={Parameter.maxTokens}
            onChange={(e) => handleParameter.setMaxTokens(e.target.value)}
          ></input>
          <button className="mx-2 px-2 bg-transparent border border-white rounded text-white">
            Send
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
