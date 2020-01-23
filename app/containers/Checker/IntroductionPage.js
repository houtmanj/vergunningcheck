import React from 'react';
import { Heading, Paragraph } from '@datapunt/asc-ui';
import history from 'utils/history';
import Form from 'components/Form/Form';
import Navigation from 'components/Navigation';
import { GET_CURRENT_TOPIC, GET_TEXT, PAGES } from '../../constants';

const IntroductionText = () => (
  <>
    <Heading $as="h3">Introductie</Heading>
    <Paragraph gutterBottom={8}>U gaat nu beginnen aan de checker voor {GET_TEXT?.topic}.</Paragraph>
    <Paragraph gutterBottom={8}>Deze tekst moet worden aangevuld</Paragraph>
  </>
);

const IntroductionPage = () => (
  <>
    <Form
      onSubmit={e => {
        e.preventDefault();
        history.push(`/${GET_CURRENT_TOPIC()}/${PAGES.checkerLocation}`);
      }}
    >
      <IntroductionText />
      <Navigation page={`checker-${PAGES.checkerIntroduction}`} showNext />
    </Form>
  </>
);

export default IntroductionPage;
