import Decision from "./decision";
import Question from "./question";
import Rule from "./rule";

let mock;

beforeEach(() => {
  const yes = new Rule([true], "Something big");
  const no = new Rule([false], "Something small");

  const question = new Question(
    "abc",
    "boolean",
    "Are you planning something big?"
  );
  const decision = new Decision("fake-id", [question], [yes, no]);

  const conclusionYes = new Rule(["Something big"], "You need this permit.");
  const conclusionNo = new Rule(
    ["Something small"],
    "You don't need this permit."
  );

  const conclusionDecision = new Decision(
    "dummy",
    [decision],
    [conclusionYes, conclusionNo]
  );
  mock = {
    rules: { yes, no },
    question,
    decision,
    conclusion: {
      decision: conclusionDecision,
      rules: { yes: conclusionYes, no: conclusionNo }
    }
  };
});

describe("Decision", () => {
  test("id", () => {
    expect(mock.decision.id).toBe("fake-id");
    expect(() => new Decision(3, [mock.question], [mock.yes, mock.no])).toThrow(
      "'id' must be a String"
    );
  });

  describe("for Questions", () => {
    test("getDecisiveInputs", () => {
      const q1 = new Question("aaa", "boolean", "Are you having fun?");
      const q2 = new Question("bbb", "boolean", "Do you live in Alkmaar?");
      const d1 = new Decision(
        "b",
        [q1, q2],
        [
          new Rule([false], "not interested"),
          new Rule([true, false], "maybe later"),
          new Rule([true, true], "let's go")
        ]
      );

      // const d3 = new Decision(
      // 	"dummy",
      // 	[d1, d2],
      // 	[
      // 		new Rule(["boring"], "Maybe you should move?"),
      // 		new Rule(["fun!", "non local"], "Hi Robin or Sven"),
      // 		new Rule(["fun!", "local"], "Hi André")
      // 	]
      // );
      q2.setAnswer(true);
      expect(d1.getDecisiveInputs()).toStrictEqual([]);
      q1.setAnswer(false);
      q2.setAnswer(false);
      expect(d1.getDecisiveInputs()).toStrictEqual([q1]);
      q1.setAnswer(true);
      q2.setAnswer(false);
      expect(d1.getDecisiveInputs()).toStrictEqual([q1, q2]);
    });

    xtest("getMatchingRules", () => {});

    test("getMatchingRule", () => {
      expect(mock.decision.getMatchingRule()).toBe(null);
      mock.question.setAnswer(true);
      expect(mock.decision.getMatchingRule()).toBe(mock.rules.yes);
      mock.question.setAnswer(false);
      expect(mock.decision.getMatchingRule()).toBe(mock.rules.no);
    });

    xtest("getOpenInputs", () => {
      expect(mock.decision.getOpenInputs()).toStrictEqual([mock.question]);
      mock.question.setAnswer(true);
      expect(mock.decision.getOpenInputs()).toStrictEqual([]);
    });

    test("getQuestions", () => {
      expect(mock.decision.getQuestions()).toStrictEqual([mock.question]);
      mock.question.setAnswer(true);
      expect(mock.decision.getQuestions()).toStrictEqual([mock.question]);
    });
  });

  describe("for recursive-decision", () => {
    test("getMatchingRule", () => {
      const concl = mock.conclusion;
      expect(concl.decision.getMatchingRule()).toBe(null);
      mock.question.setAnswer(true);
      expect(mock.decision.getMatchingRule()).toBe(mock.rules.yes);

      expect(concl.decision.getMatchingRule()).toBe(concl.rules.yes);
      mock.question.setAnswer(false);
      expect(concl.decision.getMatchingRule()).toBe(concl.rules.no);
    });

    xtest("getOpenInputs", () => {
      const concl = mock.conclusion;
      expect(concl.decision.getOpenInputs()).toStrictEqual([mock.question]);
      mock.question.setAnswer(true);
      expect(concl.decision.getOpenInputs()).toStrictEqual([]);
    });

    xtest("getQuestions", () => {
      const concl = mock.conclusion;
      expect(concl.decision.getQuestions()).toStrictEqual([mock.question]);
      mock.question.setAnswer(true);
      expect(concl.decision.getQuestions()).toStrictEqual([mock.question]);
    });
  });
});
