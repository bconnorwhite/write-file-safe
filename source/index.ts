import fs, { promises } from "fs";
import { dirname } from "path";
import { writeDir, writeDirSync } from "write-dir-safe";
import { addTerminatingNewline } from "terminating-newline";

type Options = {
  /**
   * Recursively create parent directories if needed. Default: `true`
   */
  recursive?: boolean;
  /**
   * Ensure file ends with a newline. Default: `true`
   */
  appendNewline?: boolean;
}

function handleNewline(content: string, appendNewline?: boolean) {
  if(appendNewline ?? true) {
    return addTerminatingNewline(content);
  } else {
    return content;
  }
}

export async function writeFile(path: string, content = "", options: Options = {}) {
  const directory = dirname(path);
  if(options.recursive ?? true) {
    await writeDir(directory);
  }
  return promises.writeFile(path, handleNewline(content, options.appendNewline)).then(() => {
    return true;
  }).catch(() => {
    return false
  });
}

export function writeFileSync(path: string, content = "", options: Options = {}) {
  const directory = dirname(path);
  if(options.recursive ?? true) {
    writeDirSync(directory);
  }
  try {
    // eslint-disable-next-line no-sync
    fs.writeFileSync(path, handleNewline(content, options.appendNewline));
    return true;
  } catch(e) {
    return false;
  }
}
