import { Configuration, OpenAIApi } from "openai";

// OpenAI Config
const configuration = new Configuration({
  organization: Deno.env.get("OPENAI_ORGANIZATION"),
  apiKey: Deno.env.get("OPENAI_API_KEY"),
});

export const translateCompletion = async (text: string, language: string) => {
  try {
    const openai = new OpenAIApi(configuration);
    const response = await openai.createChatCompletion({
      model: Deno.env.get("OPENAI_MODEL") || "gpt-3.5-turbo",
      messages: [
        {
          role: "assistant",
          content: `Translate a JSON into ${language}, Please translate only the object values: ${text}`,
        },
      ],
      temperature: 0, // set 0 here to get the best result
    });

    return {
      content: response.data.choices[0].message?.content,
      usage: response.data.usage,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};
