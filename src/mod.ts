import { readInputFile, saveFile } from "@src/file-parser/mod.ts";
import { translateCompletion } from "./openai/mod.ts";
import { green, yellow } from "fmt/colors.ts";
import { parse } from "flags";
import * as log from "log";
import iso639 from "iso-639-1";

/**
 * @param {string} input - input file path
 * @param {string} output - output file path
 * @param {string} lang - language code
 * all these flags are required
 */
const flags = parse(Deno.args, {
  string: ["input", "output", "lang"],
});

if (!flags.input) {
  log.error("Please provide input file path");
  Deno.exit();
}

if (!flags.output) {
  log.error("Please provide output file path");
  Deno.exit();
}

if (!flags.lang) {
  log.error("Please provide language code");
  Deno.exit();
}

// validate iso code
if (!iso639.validate(flags.lang)) {
  log.error("Please provide valid language code");
  Deno.exit();
}

try {
  const result = await readInputFile(flags.input);

  log.debug(JSON.stringify(result));
  log.info("Translating file...");
  const translateResult = await translateCompletion(result, flags.lang);

  log.info(
    yellow(
      `Usage: Prompt Tokens: ${translateResult?.usage?.prompt_tokens} | Completion Tokens: ${translateResult?.usage?.completion_tokens} | Total Tokens: ${translateResult?.usage?.total_tokens} | `
    )
  );

  // save file to output folder
  await saveFile(flags.output, translateResult?.content || "");
  log.info(green(`Translation completed, file save into ${flags.output}`));
} catch (err) {
  log.error(err);
  Deno.exit();
}
