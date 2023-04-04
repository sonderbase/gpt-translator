# CLI Translation Tool

This CLI Translation Tool is a command-line interface that allows users to translate text from one language to another using the OpenAI GPT-3.5 API. The tool takes in text input in one language and outputs the translation in another language through the command line.

## Prerequisites

Before running this tool, we recommend you install the following dependencies:

- Deno
- OpenAI GPT-3.5 API Key

## Installation

1. Clone the repository.
   `git clone https://github.com/sonderbase/gpt-translator.git`
2. Navigate to the project directory.
   `cd gpt-translator`
3. Create a .env file and add your OpenAI API credentials.

```
OPENAI_API_KEY=<api-key>
OPENAI_ORGANIZATION=<organization-id>
OPENAI_MODEL=<gpt-model> // gpt-3.5-turbo
```

4. Run the CLI.
   `deno run --allow-read --allow-env --allow-net --allow-write src/mod.ts --input=<path-to-input-file> --output=<path-to-output-file> --lang=<output-language>`

## Usage

The CLI Translation Tool takes in the following arguments:

- --input: the path to the input file with the text to be translated.
- --output: the path to the output file where the translated text will be written.
- --lang: the language code for the output language (e.g. es for Spanish, fr for French).

Here's an example command to translate text from English to Spanish:

```deno run --allow-read --allow-env --allow-net --allow-write src/mod.ts --input=./test-data/en.json --output=./test-data/es.json --lang=es```

### License
  This project is licensed under the MIT License. Have fun experimenting with the CLI Translation Tool!
