<!--BEGIN HEADER-->
<div id="top" align="center">
  <h1>write-file-safe</h1>
  <a href="https://npmjs.com/package/write-file-safe">
    <img alt="NPM" src="https://img.shields.io/npm/v/write-file-safe.svg">
  </a>
  <a href="https://github.com/bconnorwhite/write-file-safe">
    <img alt="TypeScript" src="https://img.shields.io/github/languages/top/bconnorwhite/write-file-safe.svg">
  </a>
  <a href="https://coveralls.io/github/bconnorwhite/write-file-safe?branch=master">
    <img alt="Coverage Status" src="https://img.shields.io/coveralls/github/bconnorwhite/write-file-safe.svg?branch=master">
  </a>
</div>

<br />

<blockquote align="center">Write files atomically, and create parent directories if necessary.</blockquote>

<br />

_If I should maintain this repo, please ⭐️_
<a href="https://github.com/bconnorwhite/write-file-safe">
  <img align="right" alt="GitHub stars" src="https://img.shields.io/github/stars/bconnorwhite/write-file-safe?label=%E2%AD%90%EF%B8%8F&style=social">
</a>

_DM me on [Twitter](https://twitter.com/bconnorwhite) if you have questions or suggestions._
<a href="https://twitter.com/bconnorwhite">
  <img align="right" alt="Twitter" src="https://img.shields.io/twitter/url?label=%40bconnorwhite&style=social&url=https%3A%2F%2Ftwitter.com%2Fbconnorwhite">
</a>

---
<!--END HEADER-->

## Installation

```sh
yarn add write-file-safe
```

```sh
npm install write-file-safe
```

```sh
pnpm add write-file-safe
```

<br />

## Usage

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
  /**
   * Write even if file already exists. Default: `true`
   */
  overwrite?: boolean;
};
```

<br />

<!--BEGIN FOOTER-->

<br />

<h2 id="dependencies">Dependencies<a href="https://www.npmjs.com/package/write-file-safe?activeTab=dependencies"><img align="right" alt="dependencies" src="https://img.shields.io/librariesio/release/npm/write-file-safe.svg"></a></h2>

- [file-exists-safe](https://www.npmjs.com/package/file-exists-safe): Check if a file exists without try catch
- [remove-file-safe](https://www.npmjs.com/package/remove-file-safe): Remove files without try catch
- [terminating-newline](https://www.npmjs.com/package/terminating-newline): Add or remove a terminating newline
- [write-dir-safe](https://www.npmjs.com/package/write-dir-safe): Create directories and their parents recursively

<br />

<h3>Dev Dependencies</h3>

- [autorepo](https://www.npmjs.com/package/autorepo): Autorepo abstracts away your dev dependencies, providing a single command to run all of your scripts.


<br />

<h2 id="license">License <a href="https://opensource.org/licenses/MIT"><img align="right" alt="license" src="https://img.shields.io/npm/l/write-file-safe.svg"></a></h2>

[MIT](https://opensource.org/licenses/MIT) - _MIT License_
<!--END FOOTER-->

<br />

## Related Packages

- [fs-safe](https://www.npmjs.com/package/fs-safe): A simple fs wrapper that doesn't throw
- [read-file-safe](https://www.npmjs.com/package/read-file-safe): Read files without try catch
- [remove-file-safe](https://www.npmjs.com/package/remove-file-safe): Remove files without try catch
- [read-dir-safe](https://www.npmjs.com/package/read-dir-safe): Read directories recursively or non-recursively
- [remove-dir-safe](https://www.npmjs.com/package/remove-dir-safe): Remove directories recursively or non-recursively
- [write-dir-safe](https://www.npmjs.com/package/write-dir-safe): Create directories and their parents recursively
