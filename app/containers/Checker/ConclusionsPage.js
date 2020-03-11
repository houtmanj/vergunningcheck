import React, { useContext } from 'react';
import { Paragraph, Heading } from '@datapunt/asc-ui';
import Helmet from 'react-helmet';

import ReactMarkdown from 'react-markdown';
import history from 'utils/history';
import Form from 'components/Form/Form';
import Navigation from 'components/Navigation';
import { EXTERNAL_URLS, GET_CURRENT_TOPIC, PAGES, GET_TEXT } from '../../constants';
import { CheckerContext } from './CheckerContext';
import DebugDecisionTable from '../../components/Questionnaire/DebugDecisionTable';

const uniqueFilter = (value, index, self) => self.indexOf(value) === index;

const ConclusionsPage = () => {
  const { checker, updateChecker } = useContext(CheckerContext);
  let authorized = false;

  const goToOLO = e => {
    e.preventDefault();

    if (authorized) {
      window.open(`${EXTERNAL_URLS.oloChecker.omgevingsloket}`, '_blank');
    } else {
      updateChecker([]);
      history.push(`/${GET_CURRENT_TOPIC()}/${PAGES.checkerLocation}`);
    }
  };

  return (
    <>
      <Helmet>
        <title>Conclusie - {GET_TEXT?.heading}</title>
      </Helmet>
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

          if (conclusionString !== '"Toestemmingsvrij"') {
            authorized = true;
            console.log('set authorized on false');
          }

          return (
            <div key={`${permit.name} - ${conclusionString}`}>
              <Heading $as="h2">
                {permit.name.replace('Conclusie', '')}: {conclusionString.replace(/['"]+/g, '')}
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
          nextText={authorized ? 'Naar het omgevingsloket' : 'Begin opnieuw'}
          formEnds
        />
        <DebugDecisionTable checker={checker} />
      </Form>
    </>
  );
};

export default ConclusionsPage;
