import fs, { promises } from "fs";
import { tmpdir } from "os";
import { dirname, join } from "path";
import { writeDir, writeDirSync } from "write-dir-safe";
import { removeFile } from "remove-file-safe";
import { addTerminatingNewline } from "terminating-newline";

type TempFile = {
  path: string;
  fd: fs.promises.FileHandle;
  cleanup: () => void;
};

export type Options = {
  /**
   * Recursively create parent directories if needed. Default: `true`
   */
  recursive?: boolean;
  /**
   * Ensure file ends with a newline. Default: `true`
   */
  appendNewline?: boolean;
  /**
   * Write even if file already exists. Default: `true`
   */
  overwrite?: boolean;
};

type ReturnType<T> = T extends Buffer ? Buffer : string;

function handleNewline<T extends string | Buffer>(content: T, appendNewline?: boolean): ReturnType<T> {
  if(appendNewline ?? true) {
    return addTerminatingNewline(content) as ReturnType<T>;
  } else {
    return content as (string | Buffer) as ReturnType<T>;
  }
}

let counter = 0;

async function openTemp(): Promise<TempFile | undefined> {
  const path = join(tmpdir(), `.${process.pid}.${counter}`);
  counter += 1;
  return promises.open(path, "wx").then((fd) => {
    return {
      fd,
      path,
      cleanup: () => {
        fd.close().then(() => {
          removeFile(path);
        });
      }
    };
  }).catch((error) => {
    if(error && error.code === "EEXIST") {
      return openTemp();
    } else {
      return undefined;
    }
  });
}

export async function writeFile(path: string, content: string | Buffer = "", options: Options = {}): Promise<boolean> {
  let mode: number | undefined;
  const stat = await promises.stat(path).catch(() => undefined);
  if(stat) {
    if(options.overwrite === false) {
      return true;
    }
    mode = stat.mode;
  }
  return openTemp().then((temp) => {
    if(temp) {
      return promises.writeFile(temp.fd, handleNewline(content, options.appendNewline)).then(async () => {
        // Set the mode of the temp file to match the original file, if one was found
        if(mode !== undefined) {
          await promises.chmod(temp.path, mode);
        }
        // Make sure a directory exists for the target file
        const directory = dirname(path);
        if(options.recursive ?? true) {
          await writeDir(directory);
        }
        // Rename the temp file to the target file
        return promises.rename(temp.path, path).then(() => {
          return true;
        }).catch(async (error) => {
          if(error.code === "EXDEV") {
            // temp file and target file are on different volumes, so we need to copy
            await promises.copyFile(temp.path, path);
            await promises.unlink(temp.path);
            return true;
          } else {
            return false; // Unable to rename temp file
          }
        });
      }).catch(() => {
        return false; // Unable to write to temp file
      }).finally(() => {
        temp.cleanup();
      });
    } else {
      return false; // Unable to resolve temp directory
    }
  });
}

export function writeFileSync(path: string, content: string | Buffer = "", options: Options = {}): boolean {
  let mode: number | undefined;
  try {
    // eslint-disable-next-line no-sync
    const stat = fs.statSync(path);
    if(options.overwrite === false) {
      return true;
    }
    mode = stat.mode;
  } catch(e) {
    // File does not exist
  }
  const directory = dirname(path);
  if(options.recursive ?? true) {
    writeDirSync(directory);
  }
  try {
    // eslint-disable-next-line no-sync
    fs.writeFileSync(path, handleNewline(content, options.appendNewline));
    if(mode !== undefined) {
      // eslint-disable-next-line no-sync
      fs.chmodSync(path, mode);
    }
    return true;
  } catch(e) {
    return false;
  }
}
