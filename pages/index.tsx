import { useContext } from "react";
import Head from "next/head";
// import "github-markdown-css/github-markdown-light.css";
import "github-markdown-css/github-markdown-dark.css";
import ReactMarkdown from "react-markdown";
import { ChatGPTContext } from "../hooks/useChatGPT";

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
            <ReactMarkdown className="w-full h-[calc(100vh-5rem)] overflow-y-auto pr-2">
              {chatgpt.output}
            </ReactMarkdown>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .markdown-body {
            background-color: initial;
          }
        `}
      </style>
    </>
  );
}
