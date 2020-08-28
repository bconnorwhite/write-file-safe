import fs, { promises } from "fs";
import { dirname } from "path";

export async function writeFile(path: string, content = "") {
  const directory = dirname(path);
  return promises.mkdir(directory, { recursive: true }).then(() => {
    return promises.writeFile(path, content);
  });
}

export function writeFileSync(path: string, content = "") {
  const directory = dirname(path);
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(path, content);
}
