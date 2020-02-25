import React, { useState, useContext } from 'react';
import slugify from 'slugify';
import history from 'utils/history';
import Question from './Question';
import { GET_CURRENT_TOPIC, PAGES, booleanOptions } from '../../constants';
import { CheckerContext } from './CheckerContext';
import { QuestionContext } from './QuestionContext';
import DebugDecisionTable from '../../components/Questionnaire/DebugDecisionTable';

const QuestionsPage = () => {
  const [loading] = useState(false);
  const { checker, updateChecker } = useContext(CheckerContext);
  const { question, setQuestion } = useContext(QuestionContext);

  if (loading) {
    return <div>Laden...</div>;
  }
  if (!checker) {
    return <div>Error! Geen checker...</div>;
  }

  const onQuestionNext = value => {
    if (question.options) {
      question.setAnswer(value);
    } else {
      const responseObj = booleanOptions.find(o => o.formValue === value);
      question.setAnswer(responseObj.value);
    }

    const needContactPermits = checker.permits.find(permit => {
      const conclusion = permit.getDecisionById('dummy');
      const conclusionMatchingRules = conclusion.getMatchingRules();
      return conclusionMatchingRules.find(rule => rule.outputValue === '"NeemContactOpMet"');
    });

    if (needContactPermits) {
      history.push(`/${GET_CURRENT_TOPIC()}/${PAGES.checkerContactAmsterdam}`);
    }

    const next = checker.next();

    if (!next) {
      // Go to Result page
      history.push(`/${GET_CURRENT_TOPIC()}/${PAGES.checkerResult}`);
    } else {
      // Go to Next question
      history.push(`/${GET_CURRENT_TOPIC()}/${PAGES.checkerQuestions}/${slugify(next?.text?.toLowerCase())}`);
      setQuestion(next);
      updateChecker(checker);
    }
  };

  const onQuestionPrev = () => {
    if (checker?.stack?.length > 1) {
      const prev = checker.previous();
      setQuestion(prev);
    } else {
      // Go back to Location page
      history.push(`/${GET_CURRENT_TOPIC()}/${PAGES.locationResult}`);
    }
  };

  return (
    <>
      <Question question={question} onSubmit={onQuestionNext} onGoToPrev={onQuestionPrev} showNext showPrev required />
      <DebugDecisionTable checker={checker} />
    </>
  );
};

export default QuestionsPage;
