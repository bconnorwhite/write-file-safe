import fs, { promises } from "fs";
import { dirname } from "path";
import { getLock } from "p-lock";
import { writeDir, writeDirSync } from "write-dir-safe";
import { addTerminatingNewline } from "terminating-newline";

export type Options = {
  /**
   * Recursively create parent directories if needed. Default: `true`
   */
  recursive?: boolean;
  /**
   * Ensure file ends with a newline. Default: `true`
   */
  appendNewline?: boolean;
};

type ReturnType<T> = T extends Buffer ? Buffer : string;

function handleNewline<T extends string | Buffer>(content: T, appendNewline?: boolean): ReturnType<T> {
  if(appendNewline ?? true) {
    return addTerminatingNewline(content) as ReturnType<T>;
  } else {
    return content as (string | Buffer) as ReturnType<T>;
  }
}

const writeFileLock = getLock();

export async function writeFile(path: string, content: string | Buffer = "", options: Options = {}): Promise<boolean> {
  return writeFileLock(path).then(async (release) => {
    const directory = dirname(path);
    if(options.recursive ?? true) {
      await writeDir(directory);
    }
    return promises.writeFile(path, handleNewline(content, options.appendNewline)).then(() => {
      release();
      return true;
    }).catch(() => {
      release();
      return false;
    });
  });
}

export function writeFileSync(path: string, content: string | Buffer = "", options: Options = {}): boolean {
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
