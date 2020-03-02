import Rule from "./rule";

describe("Rule", () => {
  test("constructor", () => {
    expect(() => new Rule(undefined, "yes")).toThrow(
      "'inputConditions' on Rule should be an array with at least one real value."
    );
    expect(() => new Rule([], "yes")).toThrow(
      "'inputConditions' on Rule should be an array with at least one real value."
    );
    expect(() => new Rule([true], undefined)).toThrow(
      "'outputValue' should be a number, boolean or string"
    );
  });

  test("evaluateNew", () => {
    expect(
      new Rule([true, "-", false], "yes").evaluateNew([true, false, false])
    ).toEqual([0, 2]);

    // non-match values
    expect(new Rule([true, false], "yes").evaluateNew([true])).toStrictEqual(
      []
    );
    expect(new Rule([false, true], "yes").evaluateNew([true])).toStrictEqual(
      []
    );
    expect(new Rule([true, false], "yes").evaluateNew([false])).toStrictEqual(
      []
    );
    expect(new Rule([false, true], "yes").evaluateNew([false])).toStrictEqual(
      []
    );
    expect(new Rule([true], "yes").evaluateNew([false])).toStrictEqual([]);
    expect(new Rule([false], "yes").evaluateNew([true])).toStrictEqual([]);

    // matches
    expect(new Rule([true], "yes").evaluateNew([true])).toStrictEqual([0]);
    expect(new Rule([false], "yes").evaluateNew([false])).toStrictEqual([0]);
    expect(
      new Rule([true, false], "yes").evaluateNew([true, false])
    ).toStrictEqual([0, 1]);
    expect(
      new Rule([false, true], "yes").evaluateNew([false, true])
    ).toStrictEqual([0, 1]);

    // partial non-matches
    expect(new Rule([true, false], "yes").evaluateNew([true])).toStrictEqual(
      []
    );
    expect(new Rule([false, true], "yes").evaluateNew([false])).toStrictEqual(
      []
    );
    expect(new Rule([true], "yes").evaluateNew([])).toStrictEqual([]);
    expect(new Rule([false], "yes").evaluateNew([])).toStrictEqual([]);

    // partial match values
    expect(new Rule([true], "yes").evaluateNew([true, false])).toStrictEqual([
      0
    ]);
    expect(new Rule([false], "yes").evaluateNew([false, true])).toStrictEqual([
      0
    ]);
    expect(
      new Rule([true, false], "yes").evaluateNew([true, false, "x"])
    ).toStrictEqual([0, 1]);
    expect(
      new Rule([true, "x"], "yes").evaluateNew([true, "x", "y"])
    ).toStrictEqual([0, 1]);

    // check types
    expect(new Rule(["x"], "yes").evaluateNew([false, true])).toStrictEqual([]);
    expect(
      new Rule([true, false], "yes").evaluateNew([true, "false"])
    ).toStrictEqual([]);
    expect(new Rule([true], "yes").evaluateNew(["true"])).toStrictEqual([]);

    // error cases
    expect(() => new Rule([true], "yes").evaluateNew(undefined)).toThrow(
      "'values' should be an array"
    );
    expect(() => new Rule([true], "yes").evaluateNew({})).toThrow(
      "'values' should be an array"
    );
    expect(() => new Rule([true], "yes").evaluateNew(null)).toThrow(
      "'values' should be an array"
    );
    expect(() => new Rule([true], "yes").evaluateNew(false)).toThrow(
      "'values' should be an array"
    );
  });
  test("evaluate", () => {
    // non-match values
    expect(new Rule([true, false], "yes").evaluate([true])).toBe(false);
    expect(new Rule([false, true], "yes").evaluate([true])).toBe(false);
    expect(new Rule([true, false], "yes").evaluate([false])).toBe(false);
    expect(new Rule([false, true], "yes").evaluate([false])).toBe(false);
    expect(new Rule([true], "yes").evaluate([false])).toBe(false);
    expect(new Rule([false], "yes").evaluate([true])).toBe(false);

    // matches
    expect(new Rule([true], "yes").evaluate([true])).toBe(true);
    expect(new Rule([false], "yes").evaluate([false])).toBe(true);
    expect(new Rule([true, false], "yes").evaluate([true, false])).toBe(true);
    expect(new Rule([false, true], "yes").evaluate([false, true])).toBe(true);

    // partial non-matches
    expect(new Rule([true, false], "yes").evaluate([true])).toBe(false);
    expect(new Rule([false, true], "yes").evaluate([false])).toBe(false);
    expect(new Rule([true], "yes").evaluate([])).toBe(false);
    expect(new Rule([false], "yes").evaluate([])).toBe(false);

    // partial match values
    expect(new Rule([true], "yes").evaluate([true, false])).toBe(true);
    expect(new Rule([false], "yes").evaluate([false, true])).toBe(true);
    expect(new Rule([true, false], "yes").evaluate([true, false, "x"])).toBe(
      true
    );
    expect(new Rule([true, "x"], "yes").evaluate([true, "x", "y"])).toBe(true);

    // check types
    expect(new Rule(["x"], "yes").evaluate([false, true])).toBe(false);
    expect(new Rule([true, false], "yes").evaluate([true, "false"])).toBe(
      false
    );
    expect(new Rule([true], "yes").evaluate(["true"])).toBe(false);

    // error cases
    expect(() => new Rule([true], "yes").evaluate(undefined)).toThrow(
      "'values' should be an array"
    );
    expect(() => new Rule([true], "yes").evaluate({})).toThrow(
      "'values' should be an array"
    );
    expect(() => new Rule([true], "yes").evaluate(null)).toThrow(
      "'values' should be an array"
    );
    expect(() => new Rule([true], "yes").evaluate(false)).toThrow(
      "'values' should be an array"
    );
  });

  // test("'-' support", () => {

  // });
  test("description", () => {
    expect(
      new Rule([true], true, "My very clear description.").description
    ).toBe("My very clear description.");
  });
  test("outputValue", () => {
    expect(new Rule([true], true).outputValue).toBe(true);
    expect(new Rule([true], false).outputValue).toBe(false);
    expect(new Rule([true], "yes").outputValue).toBe("yes");
  });
});
