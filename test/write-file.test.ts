import { beforeEach, test } from "@jest/globals";
import mock, { restore } from "mock-fs";
import { readFile } from "read-file-safe";
import { writeFile } from "../source";

beforeEach(async () => {
  mock({
    "/test": {
      "note.md": "hello world!"
    }
  });
});

afterEach(async () => {
  restore();
});

test("write", async () => {
  await writeFile("/test/note2.md", "ciao world!");
  return readFile("/test/note2.md").then((text) => {
    expect(text).toBe("ciao world!\n");
  });
});

test("write no newline", async () => {
  await writeFile("/test/note2.md", "ciao world!", { appendNewline: false });
  return readFile("/test/note2.md").then((text) => {
    expect(text).toBe("ciao world!");
  });
});

test("write empty", async () => {
  await writeFile("/test/note2.md");
  return readFile("/test/note2.md").then((text) => {
    expect(text).toBe("\n");
  });
});

test("write recursive", async () => {
  await writeFile("/test/a/note2.md", "hello world!");
  return readFile("/test/a/note2.md").then((text) => {
    expect(text).toBe("hello world!\n");
  });
});

test("write no recursive", async () => {
  await writeFile("/test/a/note2.md", "hello world!", { recursive: false });
  return readFile("/test/a/note2.md").then((text) => {
    expect(text).toBe(undefined);
  });
});

test("write concurrent", async () => {
  let longString = "";
  for(let i=0; i<100000; i+=1) {
    longString += "test";
  }
  await Promise.all([
    writeFile("/test/note2.md", longString),
    writeFile("/test/note2.md", "ciao world!")
  ]);
  return readFile("/test/note2.md").then((text) => {
    expect(text).toBe("ciao world!\n");
  });
});
