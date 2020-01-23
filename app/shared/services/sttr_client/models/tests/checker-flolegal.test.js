const Checker = require('../checker');
const Permit = require('../permit');
const Question = require('../question');
const Rule = require('../rule');
const Decision = require('../decision');

const getQuestions = () => [new Question('aaa', 'boolean', 'Do you live in a well-being area (welstandsgebied)?')];

describe('STTR specific', () => {
  test('"-" and "no hit" support', () => {
    const q1 = new Question('aaa', 'boolean', 'Do you need a permit?');
    const q2 = new Question('bbb', 'boolean', 'Are you sure?');
    const d1 = new Decision(
      'd1',
      [q1, q2],
      [
        new Rule([true], 'permit-required'),
        new Rule([false, false], 'permit-required'),
        new Rule([false, true], 'no-permit-required'),
      ],
    );
    const dummy = new Decision(
      'dummy',
      [d1],
      [
        new Rule(['permit-required'], 'You need a permit.'),
        new Rule(['no-permit-required'], "You don't need a permit."),
      ],
    );
    const checker = new Checker(new Permit('some permit', [d1, dummy]));
    let question = checker.next();
    question.setAnswer(true);
    expect(checker.getOutputByDecisionId('dummy')).toBe('You need a permit.');
    question.setAnswer(false);
    expect(checker.getOutputByDecisionId('dummy')).toBe(undefined);
    question = checker.next();
    question.setAnswer(true);
    expect(checker.getOutputByDecisionId('dummy')).toBe("You don't need a permit.");
    question.setAnswer(false);
    expect(checker.getOutputByDecisionId('dummy')).toBe('You need a permit.');
  });

  test('Stop on status Contact', () => {
    const questions = getQuestions();
    const checker = new Checker(
      new Permit('some permit', [new Decision('cc', questions, [new Rule([true], ''), new Rule([true], 'not sure')])]),
    );
    const question = checker.next();
    question.setAnswer(true);
  });
});
