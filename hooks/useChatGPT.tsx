import { useState, createContext } from "react";

export const useChatGPT = () => {
  const [apikey, setApikey] = useState("");
  const [model, setModel] = useState("gpt-3.5-turbo");
  const [temperature, setTemperature] = useState(0.9);
  const [maxTokens, setMaxTokens] = useState(200);
  const [input, setInput] = useState("こんにちは");
  const [output, setOutput] = useState("");

  const requestChatGPT = async () => {
    try {
      setOutput("リクエスト中...");
      const response = await fetch("/api/chatgpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apikey,
          model,
          temperature,
          maxTokens,
          input,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setOutput(data.choices[0].message.content);
      } else {
        console.error("Error calling API route");
        setOutput("リクエストが失敗しました");
      }
    } catch (error) {
      console.log(error);
      setOutput("リクエストが失敗しました");
    }
  };

  return {
    chatgpt: {
      apikey,
      model,
      temperature,
      maxTokens,
      input,
      output,
    },
    handleChatgpt: {
      setApikey,
      setModel,
      setTemperature,
      setMaxTokens,
      setInput,
      setOutput,
      requestChatGPT,
    },
  };
};

export type ChatGPT = ReturnType<typeof useChatGPT>;

export const ChatGPTContext = createContext<ChatGPT>({
  chatgpt: {
    apikey: "",
    model: "",
    temperature: 0,
    maxTokens: 0,
    input: "",
    output: "",
  },
  handleChatgpt: {
    setApikey: () => {},
    setModel: () => {},
    setTemperature: () => {},
    setMaxTokens: () => {},
    setInput: () => {},
    setOutput: () => {},
    requestChatGPT: () => Promise.resolve(),
  },
});

export const ChatGPTProvider = ({ children }: { children: any }) => {
  const chatGPT = useChatGPT();
  return (
    <ChatGPTContext.Provider value={chatGPT}>
      {children}
    </ChatGPTContext.Provider>
  );
};
