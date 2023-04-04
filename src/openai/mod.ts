import { Configuration, OpenAIApi } from "openai";
import { load } from "dotenv";

// load env
const env = await load();

// OpenAI Config
const configuration = new Configuration({
  organization: env["OPENAI_ORGANIZATION"],
  apiKey: env["OPENAI_API_KEY"],
});

export const translateCompletion = async (text: string, language: string) => {
  try {
    const openai = new OpenAIApi(configuration);
    const response = await openai.createChatCompletion({
      model: env["OPENAI_MODEL"],
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
