import { readInputFile, saveFile } from "@src/file-parser/mod.ts";
import { translateCompletion } from "./openai/mod.ts";
import { green, yellow } from "fmt/colors.ts";

try {
  const result = await readInputFile("./test-data/en.json");

  const translateResult = await translateCompletion(result, "es");

  console.log(
    yellow(
      `Prompt Tokens: ${translateResult?.usage?.prompt_tokens} | Completion Tokens: ${translateResult?.usage?.completion_tokens} | Total Tokens: ${translateResult?.usage?.total_tokens} | `
    )
  );

  // save file to output folder
  await saveFile("./translate-output/es.json", translateResult?.content || "");
  console.log(green(`Translation completed, file save into translate-output/es.json`));
} catch (err) {
  console.log(err);
  throw err;
}
