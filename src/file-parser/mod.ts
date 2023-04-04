/**
 * Takes a path to a file and returns the contents of the file as a string. If the file is empty, it returns null.
 */
export const readInputFile = (path: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    Deno.readTextFile(path)
      .then((result) => {
        resolve(result ? JSON.parse(JSON.stringify(result)) : null);
      })
      .catch(reject);
  });
};

/**
 * This function will save a file to the filesystem.
 * @param path The path of the file to save.
 * @param content The content of the file.
 * @returns A promise that resolves to true if the file was successfully saved.
 */
// deno-lint-ignore no-explicit-any
export const saveFile = (path: string, content: any): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    Deno.writeTextFile(path, content)
      .then(() => {
        resolve(true);
      })
      .catch(reject);
  });
};
