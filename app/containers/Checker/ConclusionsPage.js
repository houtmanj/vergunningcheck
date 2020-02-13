import React, { useContext } from 'react';
import { Paragraph, Heading } from '@datapunt/asc-ui';

import ReactMarkdown from 'react-markdown';
import history from 'utils/history';
import Form from 'components/Form/Form';
import Navigation from 'components/Navigation';
import { EXTERNAL_URLS, GET_CURRENT_TOPIC, PAGES } from '../../constants';
import { CheckerContext } from './CheckerContext';
import DebugDecisionTable from '../../components/Questionnaire/DebugDecisionTable';

const uniqueFilter = (value, index, self) => self.indexOf(value) === index;

const ConclusionsPage = () => {
  const { checker } = useContext(CheckerContext);

  const goToOLO = e => {
    e.preventDefault();
    // Redirect user to OLO with all parameters
    window.open(`${EXTERNAL_URLS.oloChecker.omgevingsloket}`, '_blank');
  };

  return (
    <Form onSubmit={goToOLO}>
      <Heading $as="h1">Conclusies</Heading>

      <Paragraph>Op basis van uw antwoorden vindt u hieronder wat voor uw activiteit van toepassing is.</Paragraph>

      {checker.permits.map(permit => {
        const conclusionString = permit.getOutputByDecisionId('dummy');
        const conclusion = permit.getDecisionById('dummy');
        const conclusionMatchingRules = conclusion.getMatchingRules();
        const displayConclusions = conclusionMatchingRules
          .filter(rule => rule.outputValue !== '"NeemContactOpMet"')
          .map(rule => rule.description)
          .filter(uniqueFilter);

        return (
          <div key={permit.name}>
            <Heading $as="h2">
              {permit.name.replace('Conclusie', '')}: {conclusionString}
            </Heading>
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
        onGoToPrev={() => history.push(`/${GET_CURRENT_TOPIC()}/${PAGES.checkerResult}`)}
        showPrev
        showNext
        nextText="Naar het omgevingsloket"
        formEnds
      />
      <DebugDecisionTable checker={checker} />
    </Form>
  );
};

export default ConclusionsPage;
