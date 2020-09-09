# await_to
A Deno utility module that allows awaiting on promises using the Golang style

## Usage:

```ts
import to from "https://deno.land/x/await_to/mod.ts";
import { readJson } from "https://deno.land/std/fs/mod.ts";

/* instead of using the javascript try-catch syntax: */
(async () => {
    let data: any;
    try {
        data = await readJson("./foo.json");
    } catch (err) {
        // handle error...
    }
    // do things with data...
})();

/* use the golang style error checking which is much more compact and clean */
(async () => {
    const [err, data] = await to(readJson("./foo.json"));
    if (err) { // check if the promise was rejected (err will be null if the promise was resolved) 
        // handle error...
    }
    // do things with data...
})();
```

## Types:

The `to(promise)` function returns a promise of the type `Promise<[Error | null, T]>`, where `T` is the return type of `promise`.
### Example:
```ts
import to from "https://deno.land/x/await_to/mod.ts";

interface Dog {
  Bark(): void
  Eat(): void
  Sleep(): void
};

async function getSomeDog(): Promise<Dog> {
    // fetch the dog
}

(async () => {
    const [err, dog] = await to(getSomeDog); // You may also give to() a function that returns a promise
    if (err) {
        // handle error
        return;
    }
    // dog will be of the type Dog, so you can do:
    dog.Bark();
})();

```

_Warning_: Be careful not to use `dog` when `err !== null`, when the promise is rejected `to()` will return `[err, null]`, so if you do `dog.Bark()` you will get `Uncaught TypeError: Cannot read property 'Bark' of null`. For this reason you should either `return` from the `if (err) {}` block, or use `dog` in an `else {}` block.
