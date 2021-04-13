<div align="center">
  <h1>write-file-safe</h1>
  <a href="https://npmjs.com/package/write-file-safe">
    <img alt="NPM" src="https://img.shields.io/npm/v/write-file-safe.svg">
  </a>
  <a href="https://github.com/bconnorwhite/write-file-safe">
    <img alt="TypeScript" src="https://img.shields.io/github/languages/top/bconnorwhite/write-file-safe.svg">
  </a>
  <a href="https://coveralls.io/github/bconnorwhite/write-file-safe?branch=master">
    <img alt="Coverage Status" src="https://coveralls.io/repos/github/bconnorwhite/write-file-safe.svg?branch=master">
  </a>
  <a href="https://github.com/bconnorwhite/write-file-safe">
    <img alt="GitHub Stars" src="https://img.shields.io/github/stars/bconnorwhite/write-file-safe?label=Stars%20Appreciated%21&style=social">
  </a>
  <a href="https://twitter.com/bconnorwhite">
    <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/bconnorwhite.svg?label=%40bconnorwhite&style=social">
  </a>
</div>

<br />

> Write files atomically and create parent directories if necessary.

## Installation

```sh
yarn add write-file-safe
```

```sh
npm install write-file-safe
```

<br />

## API

```ts
import { writeFile, writeFileSync, Options } from "write-file-safe";

function writeFile(path: string, content?: string | Buffer): Promise<boolean>;

function writeFileSync(path: string, content?: string | Buffer): boolean;

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
```

<br />

<h2>Dependencies<img align="right" alt="dependencies" src="https://img.shields.io/david/bconnorwhite/write-file-safe.svg"></h2>

- [file-exists-safe](https://www.npmjs.com/package/file-exists-safe): Check if a file exists without try catch
- [remove-file-safe](https://www.npmjs.com/package/remove-file-safe): Remove files without try catch
- [terminating-newline](https://www.npmjs.com/package/terminating-newline): Add or remove a terminating newline
- [write-dir-safe](https://www.npmjs.com/package/write-dir-safe): Create directories and their parents recursively

<br />

<h2>Dev Dependencies<img align="right" alt="David" src="https://img.shields.io/david/dev/bconnorwhite/write-file-safe.svg"></h2>

- [@bconnorwhite/bob](https://www.npmjs.com/package/@bconnorwhite/bob): Bob is a toolkit for TypeScript projects
- [@types/mock-fs](https://www.npmjs.com/package/@types/mock-fs): TypeScript definitions for mock-fs
- [@types/node](https://www.npmjs.com/package/@types/node): TypeScript definitions for Node.js
- [mock-fs](https://www.npmjs.com/package/mock-fs): A configurable mock file system.  You know, for testing.

<br />

<h2>License <img align="right" alt="license" src="https://img.shields.io/npm/l/write-file-safe.svg"></h2>

[MIT](https://opensource.org/licenses/MIT)

## Related Packages

- [fs-safe](https://www.npmjs.com/package/fs-safe): A simple fs wrapper that doesn't throw
- [read-file-safe](https://www.npmjs.com/package/read-file-safe): Read files without try catch
- [remove-file-safe](https://www.npmjs.com/package/remove-file-safe): Remove files without try catch
- [read-dir-safe](https://www.npmjs.com/package/read-dir-safe): Read directories recursively or non-recursively
- [remove-dir-safe](https://www.npmjs.com/package/remove-dir-safe): Remove directories recursively or non-recursively
- [write-dir-safe](https://www.npmjs.com/package/write-dir-safe): Create directories and their parents recursively
