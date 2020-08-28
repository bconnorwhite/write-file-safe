# read-file-safe
![dependencies](https://img.shields.io/david/write-file-safe)
![typescript](https://img.shields.io/github/languages/top/bconnorwhite/write-file-safe)
![npm](https://img.shields.io/npm/v/write-file-safe)

Write files, and create parent directories if necessary.

```
yarn add write-file-safe
```

## API
```ts
import { writeFile, writeFileSync } from "write-file-safe";

writeFileSync(path: string, content?: string) => void;

writeFile(path: string, content?: string) => Promise<void>;
```

