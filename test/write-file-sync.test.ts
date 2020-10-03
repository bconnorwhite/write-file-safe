import { beforeEach, test } from "@jest/globals";
import mock, { restore } from "mock-fs";
import { readFile } from "read-file-safe";
import { writeFileSync } from "../source";

beforeEach(async () => {
  mock({
    "/test": {
      "note.md": "hello world!"
    }
  })
});

afterEach(async () => {
  restore();
});

test("write sync", async () => {
  writeFileSync("/test/note2.md", "ciao world!");
  return readFile("/test/note2.md").then((text) => {
    expect(text).toBe("ciao world!\n");
  });
});

test("write sync no newline", async () => {
  writeFileSync("/test/note2.md", "ciao world!", { appendNewline: false });
  return readFile("/test/note2.md").then((text) => {
    expect(text).toBe("ciao world!");
  });
});

test("write sync empty", async () => {
  writeFileSync("/test/note2.md");
  return readFile("/test/note2.md").then((text) => {
    expect(text).toBe("\n");
  });
});

test("write recursive", async () => {
  writeFileSync("/test/a/note2.md", "hello world!");
  return readFile("/test/a/note2.md").then((text) => {
    expect(text).toBe("hello world!\n");
  });
});

test("write no recursive", async () => {
  writeFileSync("/test/a/note2.md", "hello world!", { recursive: false });
  return readFile("/test/a/note2.md").then((text) => {
    expect(text).toBe(undefined);
  });
});
