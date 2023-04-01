import { useState } from "react";
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";

export const useChatGPT = () => {
  const [apikey, setApikey] = useState("");
  const [model, setModel] = useState("gpt-3.5-turbo");
  const [temperature, setTemperature] = useState(0.9);
  const [maxTokens, setMaxTokens] = useState(200);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const requestChatGPT = async () => {
    try {
      const configuration = new Configuration({
        apiKey: apikey,
      });
      const openai = new OpenAIApi(configuration);

      const messages: ChatCompletionRequestMessage[] = [
        { role: "user", content: input },
      ];
      const completion = await openai.createChatCompletion({
        model: model,
        messages: messages,
        temperature: temperature,
        max_tokens: maxTokens,
      });
      const response = completion.data.choices[0].message;
      if (response) setOutput(response.toString());
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
