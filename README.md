# argstostring

[![CircleCI](https://circleci.com/gh/stormcrows/argstostring/tree/master.svg?style=svg)](https://circleci.com/gh/stormcrows/argstostring/tree/master)

argstostring converts provided list of arguments into a single string,
similiar to what console.log is doing.

## USAGE

```javascript
const argstostring = require("argstostring");

expect(argstostring()).toBe("");

expect(argstostring("AA", "BB", "CC", "DD")).toBe("AA BB CC DD");

expect(argstostring("A %f %f", 1, 2.44)).toBe("A 1 2.44");

const vars = [
  "AAA",
  321.123,
  22,
  44.11,
  { a: 1, b: { c: { d: "e" } } },
  { c: 3, d: 4 },
  { c: 5, d: 6 }
];
expect(argstostring("%s %f %i %d %O %o %j", ...vars)).toBe(
  'AAA 321.123 22 44.11 {"a":1,"b":{"c":{"d":"e"}}} {"c":3,"d":4} {"c":5,"d":6}'
);
```

more examples in index.spec.js