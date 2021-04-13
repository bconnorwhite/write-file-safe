import { beforeEach, test } from "@jest/globals";
import mock, { restore, directory } from "mock-fs";
import { tmpdir } from "os";
import { readFile } from "read-file-safe";
import { writeFile } from "../source";

beforeEach(async () => {
  mock({
    [tmpdir()]: {
      [`.${process.pid}.0`]: "EXISTS"
    },
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
  return readFile("/test/note2.md").then((text) => {
    expect(text).toBe("ciao world!\n");
  });
});

test("no overwrite", async () => {
  await writeFile("/test/note.md", "ciao world!", { overwrite: false });
  return readFile("/test/note.md").then((text) => {
    expect(text).toBe("hello world!");
  });
});

test("unnecessary no overwrite", async () => {
  await writeFile("/test/note.md2", "ciao world!", { overwrite: false });
  return readFile("/test/note.md2").then((text) => {
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

test("write no recursive", async (done) => {
  await writeFile("/test/a/note2.md", "hello world!", { recursive: false });
  return readFile("/test/a/note2.md").then((text) => {
    expect(text).toBe(undefined);
    done?.();
  });
});

test("write no access", async (done) => {
  writeFile("/no-access/note.md", "hello world!").then((result) => {
    expect(result).toBe(false);
    done?.();
  });
});
