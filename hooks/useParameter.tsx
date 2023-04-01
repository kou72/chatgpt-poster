import { useState } from "react";

export const useParameter = () => {
  const [apikey, setApikey] = useState("");
  const [model, setModel] = useState("");
  const [temperature, setTemperature] = useState("");
  const [maxTokens, setMaxTokens] = useState("");

  return {
    Parameter: {
      apikey,
      model,
      temperature,
      maxTokens,
    },
    handleParameter: {
      setApikey,
      setModel,
      setTemperature,
      setMaxTokens,
    },
  };
};
