import { beforeEach, test } from "@jest/globals";
import mock, { directory, restore } from "mock-fs";
import { tmpdir } from "os";
import { writeFile } from "../source";

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

test("write no access", async (done) => {
  writeFile("/test/note.md", "hello world!").then((result) => {
    expect(result).toBe(false);
    done?.();
  });
});
