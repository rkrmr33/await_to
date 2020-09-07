// Copyright 2019-2020 Roi Kramer. All rights reserved. MIT license.
import { assertEquals } from "./_test_deps.ts";
import { to } from "./mod.ts";

Deno.test("await-to should return the correct types", async () => {
  const [err, res] = await to(async () => 1);
  if (err) {
    throw err;
  }
  assertEquals(res, 1);
});

Deno.test("await-to should catch the rejected promise and return the error", async () => {
  const [err, res] = await to(async () =>
    Promise.reject(new Error("some error"))
  );
  if (err) {
    assertEquals(res, null);
    assertEquals(err.message, "some error");
  } else {
    throw new Error("expected an error to be catched");
  }
});
