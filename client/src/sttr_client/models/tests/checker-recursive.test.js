const Checker = require("../checker");
const Permit = require("../permit");
const Question = require("../question");
const Rule = require("../rule");
const Decision = require("../decision");

const q1 = new Question("aaa", "boolean", "Are you having fun?");
const q2 = new Question("bbb", "boolean", "Do you live in Alkmaar?");

describe("Checker recursive", () => {
  test("initialization", () => {
    // XXX still working on this implementation for dummy-conclusion

    const d1 = new Decision(
      "a",
      [q1],
      [new Rule([true], "fun!"), new Rule([false], "boring")]
    );
    const d2 = new Decision(
      "b",
      [q1, q2],
      [new Rule([true, false], "non local"), new Rule([true, true], "local")]
    );
    const d3 = new Decision(
      "dummy",
      [d1, d2],
      [
        new Rule(["boring"], "Maybe you should move?"),
        new Rule(["fun!", "non local"], "Hi Robin or Sven"),
        new Rule(["fun!", "local"], "Hi André")
      ]
    );
    const checker = new Checker(new Permit("some permit", [d1, d2, d3]));

    let question = checker.next();
    expect(question).toBe(q1);
    question.setAnswer(true);
    question = checker.next();
    question.setAnswer(true);
    expect(checker.getOutputByDecisionId("dummy")).toBe("Hi André");

    question = checker.rewindTo(0);
    question.setAnswer(true);
    question = checker.next();
    question.setAnswer(false);
    expect(checker.getOutputByDecisionId("dummy")).toBe("Hi Robin or Sven");

    question = checker.rewindTo(0);
    question.setAnswer(false);
    expect(checker.getOutputByDecisionId("dummy")).toBe(
      "Maybe you should move?"
    );
  });
});
