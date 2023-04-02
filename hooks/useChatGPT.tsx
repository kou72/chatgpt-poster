import { useState, createContext, useEffect } from "react";

const getStore = (key: string, init: any) => {
  if (typeof window === "undefined") return;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : init;
  } catch (error) {
    console.log(error);
  }
};

const initHistory = [
  {
    input: "History",
    output: "最新30個までヒストリが表示されます",
  },
];

const saveData = (key: string, newArr: any) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(newArr));
  } catch (error) {
    console.log(error);
  }
};

export const useChatGPT = () => {
  const [apikey, setApikey] = useState("");
  const [model, setModel] = useState("");
  const [temperature, setTemperature] = useState(0);
  const [maxTokens, setMaxTokens] = useState(0);
  const [input, setInput] = useState("こんにちは！");
  const [output, setOutput] = useState("");
  const [totalTokens, setTotalTokens] = useState(0);
  const [history, setHistory] = useState<{ input: string; output: string }[]>(
    []
  );

  useEffect(() => {
    try {
      setApikey(getStore("apikey", ""));
      setModel(getStore("model", "gpt-3.5-turbo"));
      setTemperature(getStore("temperature", 0.9));
      setMaxTokens(getStore("maxTokens", 200));
      setTotalTokens(getStore("totalTokens", 0));
      setHistory(getStore("history", initHistory));
    } catch (error) {
      console.log(error);
    }
  }, []);

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
        saveTotalTokens(data.usage.total_tokens);
        setOutput(data.choices[0].message.content);
        saveHistory(data.choices[0].message.content);
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
    if (typeof window === "undefined") return;
    try {
      setTemperature(value);
      setTotalTokens((prevTokens: any) => prevTokens + value);
      window.localStorage.setItem("temperature", JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  const saveMaxTokens = (value: number) => {
    if (typeof window === "undefined") return;
    try {
      setMaxTokens(value);
      window.localStorage.setItem("maxTokens", JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  const saveTotalTokens = (value: number) => {
    try {
      setTotalTokens((prevTokens: any) => prevTokens + value);
      const data = window.localStorage.getItem("totalTokens");
      window.localStorage.setItem(
        "totalTokens",
        JSON.stringify(Number(data) + value)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const resetTotalTokens = () => {
    try {
      setTotalTokens(0);
      window.localStorage.setItem("totalTokens", JSON.stringify(0));
    } catch (error) {
      console.log(error);
    }
  };

  const saveHistory = (value: any) => {
    const newArr = [...history, { input: input, output: value }].splice(-30);
    saveData("history", newArr);
    setHistory(newArr);
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
      history,
    },
    handleChatgpt: {
      saveApikey,
      saveModel,
      saveTemperature,
      saveMaxTokens,
      resetTotalTokens,
      setInput,
      setOutput,
      requestChatGPT,
      saveHistory,
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
    history: [],
  },
  handleChatgpt: {
    saveApikey: () => {},
    saveModel: () => {},
    saveTemperature: () => {},
    saveMaxTokens: () => {},
    resetTotalTokens: () => {},
    setInput: () => {},
    setOutput: () => {},
    requestChatGPT: () => Promise.resolve(),
    saveHistory: () => {},
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
