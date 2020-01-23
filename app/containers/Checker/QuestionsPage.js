import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import history from 'utils/history';
import { getSttrFile } from 'shared/services/api';
import Form from 'components/Form/Form';
import Navigation from 'components/Navigation';
import { GET_CURRENT_TOPIC, PAGES, GET_STTR } from '../../constants';
import getChecker from '../../shared/services/sttr_client';
import { CheckerContext } from './CheckerContext';
import ListInput from './ListInput';

const booleanOptions = [
  {
    label: 'Nee',
    formValue: 'no',
    value: false,
  },
  {
    label: 'Ja',
    formValue: 'yes',
    value: true,
  },
];
const listOptions = [
  {
    label: 'Voorkant',
    formValue: 'voorkant',
    value: 'voorkant',
  },
  {
    label: 'Zijkant',
    formValue: 'zijkant',
    value: 'zijkant',
  },
  {
    label: 'Achterkant',
    formValue: 'achterkant',
    value: 'achterkant',
  },
];

const Question = ({ question, value, onChange }) => (
  <div>
    <h2>{question.text}</h2>
    {question.description && (
      <div>
        <ReactMarkdown source={question.description} />
      </div>
    )}
    {question.type === 'boolean' && <ListInput {...{ value, onChange, options: booleanOptions }} />}
    {question.type === 'list' && <ListInput {...{ value, onChange, options: listOptions }} />}
    {question.type === 'geo' && (
      <input
        type="checkbox"
        onChange={({ target: { checked } }) => {
          onChange(checked ? 'true' : 'false');
        }}
      />
    )}
  </div>
);

Question.propTypes = {
  question: PropTypes.any,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

const QuestionsPage = () => {
  const [loading, setLoading] = useState(false);
  const { stack, newStack } = useContext(CheckerContext);
  const [checker, updateChecker] = useState([]);
  const [question, setQuestion] = useState('');
  const [currentAnswerValue, setCurrentAnswerValue] = useState(question.answer); // only holds primitive

  useEffect(() => {
    (async function getSttr() {
      setLoading(true);

      const config = await getSttrFile(GET_STTR);
      const initChecker = getChecker(config);
      const firstQuestion = initChecker.next();

      updateChecker(initChecker);
      setQuestion(firstQuestion);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <div>Laden...</div>;
  }
  if (!checker) {
    return <div>Error! Geen checker...</div>;
  }

  return (
    <>
      <Form
        onSubmit={e => {
          e.preventDefault();
          newStack({ randomId: 'sadsadads' });
          console.log(stack);
          question.setAnswer(currentAnswerValue);

          const next = checker.next();
          if (!next) {
            // Go to Result page
            history.push(`/${GET_CURRENT_TOPIC()}/${PAGES.checkerResult}`);
          } else {
            // Go to Next question
            setQuestion(next);
            setCurrentAnswerValue(next.answer);
            updateChecker(checker);
          }
        }}
      >
        <div>
          <Question question={question} value={currentAnswerValue} onChange={setCurrentAnswerValue} />
        </div>
        <Navigation
          page={`checker-${PAGES.checkerQuestions}`}
          onGoToPrev={() => {
            if (checker?.stack?.length > 1) {
              const prev = checker.previous();
              setQuestion(prev);
              setCurrentAnswerValue(prev.answer);
            } else {
              // Go back to Location page
              history.push(`/${GET_CURRENT_TOPIC()}/${PAGES.checkerLocation}`);
            }
          }}
          showPrev
          showNext
        />
      </Form>
    </>
  );
};

export default QuestionsPage;
