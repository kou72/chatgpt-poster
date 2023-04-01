import { useContext } from "react";
import { ChatGPTContext } from "../hooks/useChatGPT";

const Sidebar = () => {
  const { chatgpt, handleChatgpt } = useContext(ChatGPTContext);
  const usedYen = chatgpt.totalTokens * (0.002 / 1000) * 150;

  return (
    <div className="bg-gray-600 min-h-screen pt-12 text-center">
      <div className="border border-white rounded-md m-4 p-4">
        <p className="m-2 text-white">使った金額</p>
        <p className="m-2 text-white text-xl">{usedYen.toFixed(3)} 円</p>

        {/* <p>{chatgpt.totalTokens}</p> */}
        <button
          className="m-2 px-4 py-1 text-white bg-gray-500 rounded-md"
          onClick={handleChatgpt.resetTotalTokens}
        >
          Reset
        </button>
      </div>

      <div className="flex">
        <ul className="border-r">
          <li className="py-2 border-b">メニュー1</li>
          <li className="py-2 border-b">メニュー2</li>
          <li className="py-2 border-b">メニュー3</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
