import React, { useContext } from 'react';
import { Paragraph, Heading } from '@datapunt/asc-ui';

import ReactMarkdown from 'react-markdown';
import history from 'utils/history';
import Form from 'components/Form/Form';
import Navigation from 'components/Navigation';
import { GET_CURRENT_TOPIC, PAGES } from '../../constants';
import { CheckerContext } from './CheckerContext';
import DebugDecisionTable from '../../components/Questionnaire/DebugDecisionTable';

const uniqueFilter = (value, index, self) => self.indexOf(value) === index;

const ContactGemeentePage = () => {
  const { checker, updateChecker } = useContext(CheckerContext);

  const onGoBack = () => {
    checker.previous();
    history.goBack();
  };

  const onSubmit = () => {
    updateChecker([]);
    history.push(`/${GET_CURRENT_TOPIC()}/${PAGES.checkerLocation}`);
  };

  return (
    <Form onSubmit={() => onSubmit()}>
      <Heading $as="h1">Conclusie</Heading>

      <Paragraph>Op basis van uw antwoorden vindt u hieronder wat voor uw activiteit van toepassing is.</Paragraph>

      {checker.permits.map(permit => {
        const conclusion = permit.getDecisionById('dummy');
        const conclusionMatchingRules = conclusion.getMatchingRules();
        const displayConclusions = conclusionMatchingRules
          .filter(rule => rule.outputValue === '"NeemContactOpMet"')
          .map(rule => rule.description)
          .filter(uniqueFilter);

        if (displayConclusions.length === 0) return false;
        return (
          <div key={permit.name}>
            <Heading $as="h2">Neem contact op met de gemeente</Heading>
            {displayConclusions.map(text => (
              <div key={text}>
                <ReactMarkdown source={text} renderers={{ paragraph: Paragraph }} linkTarget="_blank" />
              </div>
            ))}
          </div>
        );
      })}

      <Navigation
        page={`checker-${PAGES.checkerConclusions}`}
        onGoToPrev={onGoBack}
        showPrev
        showNext
        nextText="Opnieuw checken"
        formEnds
      />
      <DebugDecisionTable checker={checker} />
    </Form>
  );
};

export default ContactGemeentePage;
