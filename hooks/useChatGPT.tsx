import { useState } from "react";

export const useChatGPT = () => {
  const [apikey, setApikey] = useState(
    "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"
  );
  const [model, setModel] = useState("gpt-3.5-turbo");
  const [temperature, setTemperature] = useState(0.9);
  const [maxTokens, setMaxTokens] = useState(200);
  const [input, setInput] = useState("こんにちは");
  const [output, setOutput] = useState("出力");

  const requestChatGPT = async () => {
    try {
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
        console.log(data.choices[0].message.content);
        alert(data.choices[0].message.content);
        // setOutput(data.choices[0].message.content);
        setOutput("test");
      } else {
        console.error("Error calling API route");
      }
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
