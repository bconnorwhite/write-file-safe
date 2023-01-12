import { beforeEach, test, afterEach, expect } from "@jest/globals";
import mock, { directory, restore } from "mock-fs";
import { tmpdir } from "node:os";
import { readFile } from "read-file-safe";
import { writeFile } from "../source/index.js";

beforeEach(async () => {
  mock({
    [tmpdir()]: {},
    "/test": {
      "note.md": "hello world!"
    },
    "/no-access": directory({
      mode: 0
    })
  }, {
    createTmp: false
  });
});

afterEach(async () => {
  restore();
});

test("write", async () => {
  await writeFile("/test/note2.md", "ciao world!");
  const text = await readFile("/test/note2.md");
  expect(text).toBe("ciao world!\n");
});

test("no overwrite", async () => {
  await writeFile("/test/note.md", "ciao world!", { overwrite: false });
  const text = await readFile("/test/note.md");
  expect(text).toBe("hello world!");
});

test("unnecessary no overwrite", async () => {
  await writeFile("/test/note.md2", "ciao world!", { overwrite: false });
  const text = await readFile("/test/note.md2");
  expect(text).toBe("ciao world!\n");
});

test("write no newline", async () => {
  await writeFile("/test/note2.md", "ciao world!", { appendNewline: false });
  const text = await readFile("/test/note2.md");
  expect(text).toBe("ciao world!");
});

test("write empty", async () => {
  await writeFile("/test/note2.md");
  const text = await readFile("/test/note2.md");
  expect(text).toBe("\n");
});

test("write recursive", async () => {
  await writeFile("/test/a/note2.md", "hello world!");
  const text = await readFile("/test/a/note2.md");
  expect(text).toBe("hello world!\n");
});

test("write no recursive", async () => {
  await writeFile("/test/a/note2.md", "hello world!", { recursive: false });
  const text = await readFile("/test/a/note2.md");
  expect(text).toBe(undefined);
});

test("write no access", async () => {
  const result = await writeFile("/no-access/note.md", "hello world!");
  expect(result).toBe(false);
});
