import React, { useEffect, useState, useContext } from 'react';
import history from 'utils/history';
import { getSttrFile } from 'shared/services/api';
import Question, { booleanOptions } from './Question';
import getChecker from '../../shared/services/sttr_client';
import { GET_CURRENT_TOPIC, PAGES, GET_STTR } from '../../constants';
import { CheckerContext } from './CheckerContext';
import { QuestionContext } from './QuestionContext';
import DebugDecisionTable from '../../components/Questionnaire/DebugDecisionTable';

const QuestionsPage = () => {
  const [loading, setLoading] = useState(false);
  const { checker, updateChecker } = useContext(CheckerContext);
  const { question, setQuestion } = useContext(QuestionContext);

  useEffect(() => {
    (async function getSttr() {
      if (checker.stack) {
        const currentQuestion = checker.stack[checker.stack.length - 1];
        setQuestion(currentQuestion);
      } else {
        setLoading(true);

        const config = await getSttrFile(GET_STTR);
        const initChecker = getChecker(config);
        const firstQuestion = initChecker.next();

        updateChecker(initChecker);
        setQuestion(firstQuestion);
        setLoading(false);
      }
    })();
  }, []);

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
    const next = checker.next();

    if (!next) {
      // Go to Result page
      history.push(`/${GET_CURRENT_TOPIC()}/${PAGES.checkerResult}`);
    } else {
      // Go to Next question
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
