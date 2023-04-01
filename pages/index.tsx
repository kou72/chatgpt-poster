import { useState } from "react";
import Head from "next/head";
import "github-markdown-css/github-markdown-light.css";
import ReactMarkdown from "react-markdown";

const markdownString = `
# title

## title2

- test
- test
- test
`;

export default function Home() {
  const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <>
      <Head>
        <title>Chat-GPT Poster</title>
      </Head>
      <div className="bg-gray-400 min-h-screen pt-12">
        <div className="grid grid-cols-2 p-2 gap-2">
          <div className="col-span-1">
            <textarea
              className="bg-gray-300 w-full h-[calc(100vh-5rem)] overflow-y-auto p-1"
              value={text}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="col-span-1 markdown-body">
            <ReactMarkdown className="w-full h-[calc(100vh-5rem)] overflow-y-auto">
              {markdownString}
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
