import Checker from "./checker";
import Permit from "./permit";
import Question from "./question";
import Rule from "./rule";
import Decision from "./decision";

const getQuestions = () => [
  new Question("aaa", "boolean", "Are you older then 18 years?"),
  new Question("bbb", "boolean", "Do you live in the Netherlands?")
];

describe("Permit", () => {
  test("getDecisionById", () => expect(true).toBe(false));
  test("simple sttr checker", () => {
    const questions = getQuestions();
    const checker = new Permit(
      "drivers-licence",
      // id: "abc",
      // "Are you allowed to drive?",
      [
        new Decision("a", questions, [
          new Rule([false], "no"),
          new Rule([true, false], "not sure"),
          new Rule([true, true], "yes")
        ])
      ]
    );
    let question = checker.next();
    expect(checker.getOutput()).toBe(undefined);

    // Change the values a bit on the first question
    question.setAnswer(false);
    expect(checker.getOutput()).toBe("no");
    question.setAnswer(true);
    expect(checker.getOutput()).toBe(undefined);

    // Answer and move to next question
    question = checker.next();
    expect(checker.getOutput()).toBe(undefined);
    question.setAnswer(false);
    expect(checker.getOutput()).toBe("not sure");
    question.setAnswer(true);
    expect(checker.getOutput()).toBe("yes");

    question = checker.next();
    expect(question).toBe(null);
  });

  test("next", () => {
    const questions = getQuestions();
    const checker = new Checker([
      new Decision("ab", questions, [
        new Rule([false], "no"),
        new Rule([true, false], "not sure"),
        new Rule([true, true], "yes")
      ])
    ]);
    const question = checker.next(); // first
    expect(question).toBe(questions[0]);
    expect(question.answer).toBe(undefined);
    expect(checker.getOutput()).toBe(undefined);

    expect(() => checker.next()).toThrow("Please answer the question first");
  });
  test("rewindTo", () => {
    const questions = getQuestions();
    const checker = new Checker([
      new Decision("x3", questions, [
        new Rule([false], "no"),
        new Rule([true, false], "not sure"),
        new Rule([true, true], "yes")
      ])
    ]);
    let question = checker.next();
    question.setAnswer(true);
    question = checker.next();
    question.setAnswer(false);
    question = checker.rewindTo(1); // also known as _current in this case
    expect(question).toBe(questions[1]);
    question = checker.rewindTo(0);
    expect(question).toBe(questions[0]);
  });

  test("remember answers", () => {
    const questions = getQuestions();
    const checker = new Checker([
      new Decision("1a", questions, [
        new Rule([false], "no"),
        new Rule([true, false], "not sure"),
        new Rule([true, true], "yes")
      ])
    ]);
    // set some answers
    let question = checker.next();
    question.setAnswer(true);
    question = checker.next();
    question.setAnswer(false);

    // rewind 1 question and validate answers still there
    question = checker.previous();
    expect(question.answer).toBe(true);
    question = checker.next();
    expect(question.answer).toBe(false);

    // rewind with goto should also preserve answers
    question = checker.rewindTo(0);
    expect(question.answer).toBe(true);
    question = checker.next();
    expect(question.answer).toBe(false);
  });
  test("previous", () => {
    const questions = getQuestions();
    const checker = new Checker([
      new Decision("cc", questions, [
        new Rule([false], "no"),
        new Rule([true, false], "not sure"),
        new Rule([true, true], "yes")
      ])
    ]);
    let question = checker.next(); // first
    question.setAnswer(true);
    question = checker.next(); // second
    expect(question).toBe(questions[1]);
    question = checker.previous();
    expect(question).toBe(questions[0]);
    expect(() => checker.previous()).toThrow(
      "'rewindTo' index out of bounds of current question stack."
    );
  });
  test("done + previous", () => {
    const questions = getQuestions();
    const checker = new Checker([
      new Decision("cc", questions, [
        new Rule([false], "no"),
        new Rule([true, false], "not sure"),
        new Rule([true, true], "yes")
      ])
    ]);
    let question = checker.next();
    question.setAnswer(true);
    question = checker.next();
    question.setAnswer(true);
    question = checker.next();
    expect(question).toBe(null);
    question = checker.previous();
    expect(question).toBe(questions[1]);
  });
});
