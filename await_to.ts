// Copyright 2019-2020 Roi Kramer. All rights reserved. MIT license.

export const to = async <T>(
  awaitable: () => Promise<T> | Promise<T>,
): Promise<([null | Error, T])> => {
  try {
    let promise: Promise<T>;
    if (typeof awaitable === "function") {
      promise = awaitable();
    } else {
      promise = awaitable;
    }
    const res = await promise;
    return [null, res];
  } catch (err) {
    return [err, null as unknown as T];
  }
};
