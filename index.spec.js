const argstostring = require("./index");

describe("argstostring", () => {
  it("should return empty string if no arguments provided", () => {
    expect(argstostring()).toBe("");
  });

  it("should return unaffected string if no variables provided", () => {
    expect(argstostring("TEST123")).toBe("TEST123");
  });

  it("should concat string variables into provided string", () => {
    expect(argstostring("AA", "BB", "CC", "DD")).toBe("AA BB CC DD");
  });

  it("should stringify an object", () => {
    const obj = { a: 123, b: 321 };
    const str = JSON.stringify(obj);
    expect(argstostring(obj)).toEqual(str);
  });

  it("should stringify an object and concat args", () => {
    const objects = [{ a: 1, b: 2 }, { c: 3, d: 4 }, { e: 5, f: 6 }];
    const str = objects.map(obj => JSON.stringify(obj)).join(" ");
    expect(argstostring(...objects)).toEqual(str);
  });

  it("should stringify objects and concat mixed args", () => {
    const objects = [{ a: 1, b: 2 }, { c: 3, d: 4 }, { e: 5, f: 6 }];
    const str = [
      "A",
      JSON.stringify(objects[0]),
      "B",
      123.33,
      JSON.stringify(objects[1]),
      "C",
      JSON.stringify(objects[2]),
      321
    ].join(" ");

    expect(
      argstostring(
        "A",
        objects[0],
        "B",
        123.33,
        objects[1],
        "C",
        objects[2],
        321
      )
    ).toEqual(str);
  });

  it("replace the string variables", () => {
    expect(argstostring("A %s %s %s", "B", "C", "D")).toBe("A B C D");
  });

  it("replace the integer variable", () => {
    expect(argstostring("A %i", 2.33)).toBe("A 2");
  });

  it("replace the float variables", () => {
    expect(argstostring("A %f %f", 1, 2.44)).toBe("A 1 2.44");
  });

  it("replace objects variable", () => {
    const objects = [{ a: 1, b: 2 }, { c: 3, d: 4 }];
    expect(argstostring("A %o %O", objects[0], objects[1])).toBe(
      "A " + objects.map(obj => JSON.stringify(obj)).join(" ")
    );
  });

  it("replace mixed variables", () => {
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
  });
});
