/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import history from 'utils/history';
import { Question } from 'components/Questionnaire';
import Navigation from 'components/Navigation';

const HomePageText = () => (
  <>
    <p>
      Met de vergunningchecker ziet u snel of u een omgevingsvergunning moet aanvragen. Ook kunt u kijken waar uw
      bouwwerk aan moet voldoen zodat u geen vergunning nodig heeft voor uw bouwwerk.
    </p>
    <ul>
      <li>Als u een omgevingsvergunning moet aanvragen, ziet u wat uw vervolgstappen zijn.</li>
      <li>
        Als u geen omgevingsvergunning hoeft aan te vragen, kunt u direct aan Verklaring Vergunningsvrij aanvragen
        (gratis en online).
      </li>
    </ul>
  </>
);

const HomePage = () => (
  <Question headingDataId="bestemmingsplan" heading="Inleiding" onSubmit={() => history.push('/aanbouw/locatie')}>
    <HomePageText />
    <Navigation showNext />
  </Question>
);

export default HomePage;
