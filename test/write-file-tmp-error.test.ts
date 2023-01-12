import { beforeEach, test, afterEach, expect } from "@jest/globals";
import mock, { directory, restore } from "mock-fs";
import { tmpdir } from "os";
import { writeFile } from "../source/index.js";

beforeEach(async () => {
  mock({
    [tmpdir()]: directory({
      mode: 0
    }),
    "/test": {}
  }, {
    createTmp: false
  });
});

afterEach(async () => {
  restore();
});

test("write no access", async () => {
  const result = await writeFile("/test/note.md", "hello world!");
  expect(result).toBe(false);
});
