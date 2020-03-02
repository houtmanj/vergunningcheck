import Question from "./question";

const getQuestion = () =>
  new Question(
    "aaa",
    "boolean",
    "Are you ok?",
    "Describe how you are _feeling_."
  );

describe("Question", () => {
  test("initialization", () => {
    const { id, type, text, description } = getQuestion();
    expect(id).toBe("aaa");
    expect(type).toBe("boolean");
    expect(text).toBe("Are you ok?");
    expect(description).toBe("Describe how you are _feeling_.");
  });

  test("isAnswerType - bool", () => {
    expect(Question.isAnswerType(false)).toBe(true);
    expect(Question.isAnswerType(true)).toBe(true);
    expect(Question.isAnswerType([false, true])).toBe(false);
  });

  test("isAnswertype - string", () => {
    expect(Question.isAnswerType("yes")).toBe(true);
    expect(Question.isAnswerType(["yes"])).toBe(true);
    expect(Question.isAnswerType(["yes", "no"])).toBe(true);
  });
  test("isAnswertype - number", () => {
    expect(Question.isAnswerType(3.1234)).toBe(true);
    expect(Question.isAnswerType(-1)).toBe(true);
    expect(Question.isAnswerType(5)).toBe(true);
    expect(Question.isAnswerType([5, 3])).toBe(false);
  });
  test("isAnswertype - empty", () => {
    expect(Question.isAnswerType([])).toBe(true);

    expect(Question.isAnswerType(null)).toBe(false);
    expect(Question.isAnswerType(undefined)).toBe(false);
    expect(Question.isAnswerType({})).toBe(false);
  });

  test("answer", () => {
    const question = getQuestion();
    question.setAnswer(true);
    expect(question.answer).toBe(true);
    question.setAnswer(false);
    expect(question.answer).toBe(false);
    expect(() => question.setAnswer("goooo")).toThrow(
      "value 'goooo' not valid for Answer of type boolean"
    );
  });
});
