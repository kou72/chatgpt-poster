import { useContext } from "react";
import { ChatGPTContext } from "../hooks/useChatGPT";
import Head from "next/head";
import MarkdownPreview from "../components/MarkdownPreview";

export default function Home() {
  const { chatgpt, handleChatgpt } = useContext(ChatGPTContext);

  return (
    <>
      <Head>
        <title>Chat-GPT Poster</title>
      </Head>
      <div className="bg-gray-700 min-h-screen pt-12">
        <div className="grid grid-cols-2 p-2 gap-2">
          <div className="col-span-1">
            <textarea
              className="bg-gray-300 w-full h-[calc(100vh-5rem)] overflow-y-auto p-1"
              value={chatgpt.input}
              onChange={(e) => handleChatgpt.setInput(e.target.value)}
            ></textarea>
          </div>
          <div className="col-span-1 markdown-body">
            <MarkdownPreview>{chatgpt.output}</MarkdownPreview>
          </div>
        </div>
      </div>
    </>
  );
}
