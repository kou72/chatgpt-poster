import { useState, createContext, useEffect } from "react";

const getStore = (key: string, initial: string | number) => {
  if (typeof window === "undefined") return;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initial;
  } catch (error) {
    console.log(error);
    return initial;
  }
};

export const useChatGPT = () => {
  const [apikey, setApikey] = useState(getStore("apikey", ""));
  const [model, setModel] = useState(getStore("model", "gpt-3.5-turbo"));
  const [temperature, setTemperature] = useState(getStore("temperature", 0.9));
  const [maxTokens, setMaxTokens] = useState(getStore("maxTokens", 200));
  const [input, setInput] = useState("こんにちは");
  const [output, setOutput] = useState("");
  const [totalTokens, setTotalTokens] = useState(getStore("totalTokens", 0));

  useEffect(() => {
    try {
      window.localStorage.setItem("totalTokens", JSON.stringify(totalTokens));
    } catch (error) {
      console.log(error);
    }
  }, [totalTokens]);

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
        setTotalTokens(
          (prevTokens: any) => prevTokens + data.usage.total_tokens
        );
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

  const saveApikey = (value: string) => {
    try {
      setApikey(value);
      window.localStorage.setItem("apikey", JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  const saveModel = (value: string) => {
    try {
      setModel(value);
      window.localStorage.setItem("model", JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  const saveTemperature = (value: number) => {
    try {
      setTemperature(value);
      window.localStorage.setItem("temperature", JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  const saveMaxTokens = (value: number) => {
    try {
      setMaxTokens(value);
      window.localStorage.setItem("maxTokens", JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  // const saveTotalTokens = () => {
  //   try {
  //     console.log(totalTokens);
  //     // setTotalTokens(value);
  //     window.localStorage.setItem("totalTokens", JSON.stringify(totalTokens));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const resetTotalTokens = () => {
    try {
      setTotalTokens(0);
      window.localStorage.setItem("totalTokens", JSON.stringify(0));
    } catch (error) {
      console.log(error);
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
      totalTokens,
    },
    handleChatgpt: {
      saveApikey,
      saveModel,
      saveTemperature,
      saveMaxTokens,
      // saveTotalTokens,
      resetTotalTokens,
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
    totalTokens: 0,
  },
  handleChatgpt: {
    saveApikey: () => {},
    saveModel: () => {},
    saveTemperature: () => {},
    saveMaxTokens: () => {},
    // saveTotalTokens: () => {},
    resetTotalTokens: () => {},
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
