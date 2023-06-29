import { beforeEach, test, afterEach, expect } from "@jest/globals";
import mock, { restore, directory } from "mock-fs";
import { readFile } from "read-file-safe";
import { writeFileSync } from "../source/index.js";

beforeEach(async () => {
  mock({
    "/test": {
      "note.md": "hello world!"
    },
    "/no-access": directory({
      mode: 0
    })
  });
});

afterEach(async () => {
  restore();
});

test("write sync", async () => {
  writeFileSync("/test/note2.md", "ciao world!");
  const text = await readFile("/test/note2.md");
  expect(text).toBe("ciao world!\n");
});

test("no overwrite", async () => {
  writeFileSync("/test/note.md", "ciao world!", { overwrite: false });
  const text = await readFile("/test/note.md");
  expect(text).toBe("hello world!");
});

test("unnecessary no overwrite", async () => {
  writeFileSync("/test/note2.md", "ciao world!", { overwrite: false });
  const text = await readFile("/test/note2.md");
  expect(text).toBe("ciao world!\n");
});

test("write sync no newline", async () => {
  writeFileSync("/test/note2.md", "ciao world!", { appendNewline: false });
  const text = await readFile("/test/note2.md");
  expect(text).toBe("ciao world!");
});

test("write sync empty", async () => {
  writeFileSync("/test/note2.md");
  const text = await readFile("/test/note2.md");
  expect(text).toBe("\n");
});

test("write recursive", async () => {
  writeFileSync("/test/a/note2.md", "hello world!");
  const text = await readFile("/test/a/note2.md");
  expect(text).toBe("hello world!\n");
});

test("write no access", () => {
  const result = writeFileSync("/no-access/note.md", "hello world!");
  expect(result).toBe(false);
});

test("write no recursive", async () => {
  writeFileSync("/test/a/note2.md", "hello world!", { recursive: false });
  return readFile("/test/a/note2.md").then((text) => {
    expect(text).toBe(undefined);
  });
});
