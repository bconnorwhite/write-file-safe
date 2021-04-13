import fs, { promises } from "fs";
import { tmpdir } from "os";
import { dirname, join } from "path";
import { writeDir, writeDirSync } from "write-dir-safe";
import { removeFile } from "remove-file-safe";
import { fileExists, fileExistsSync } from "file-exists-safe";
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
  if(options.overwrite === false) {
    const exists = await fileExists(path);
    if(exists) {
      return true;
    }
  }
  return openTemp().then((temp) => {
    if(temp) {
      return promises.writeFile(temp.fd, handleNewline(content, options.appendNewline)).then(async () => {
        const directory = dirname(path);
        if(options.recursive ?? true) {
          await writeDir(directory);
        }
        return promises.rename(temp.path, path).then(() => {
          return true;
        }).catch(() => {
          return false;
        });
      }).finally(() => {
        temp.cleanup();
      });
    } else {
      return false;
    }
  });
}

export function writeFileSync(path: string, content: string | Buffer = "", options: Options = {}): boolean {
  if(options.overwrite === false) {
    const exists = fileExistsSync(path);
    if(exists) {
      return true;
    }
  }
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
