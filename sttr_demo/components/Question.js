import React from 'react';
import ReactMarkdown from 'react-markdown';
import BooleanInput from './BooleanInput';
import StringInput from './StringInput';
import ListInput from './ListInput';
import GEOInput from './GEOInput';

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
    {question.type === 'geo' && <GEOInput {...{ value, onChange }} />}
    {question.type === 'string' && <StringInput {...{ value, onChange }} />}
  </div>
);

export default Question;
