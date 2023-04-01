import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      apikey,
      model,
      temperature,
      maxTokens,
      input,
    }: {
      apikey: string;
      model: string;
      temperature: number;
      maxTokens: number;
      input: string;
    } = req.body;

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
      res.status(200).json(completion.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error calling OpenAI API" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
