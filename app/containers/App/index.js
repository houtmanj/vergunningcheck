import React, { memo } from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { Row, Column } from '@datapunt/asc-ui';

import AddressInput from 'containers/AddressInput';
import AddressInputResults from 'containers/AddressInput/Results';
import HomePage from 'containers/HomePage';
import QuestionnaireContainer from 'containers/QuestionnaireContainer';
import QuestionnaireQuestions from 'containers/QuestionnaireContainer/Questions';
import QuestionnaireBasis from 'containers/QuestionnaireContainer/Basis';
import QuestionnaireRoutes from 'containers/QuestionnaireContainer/QuestionRoutes';
import NotFoundPage from 'containers/NotFoundPage';
import Footer from 'components/Footer';
import Header from 'components/Header';
import GlobalError from 'containers/GlobalError';

import addressInputSaga from '../AddressInput/saga';
import questionnaireSaga from '../QuestionnaireContainer/saga';

// import GlobalStyles from '../../global-styles';

import './style.scss';

const addressInputKey = 'addressInput';
const questionnaireKey = 'questionnaire';

export const App = () => {
  useInjectSaga({ key: addressInputKey, saga: addressInputSaga });
  useInjectSaga({ key: questionnaireKey, saga: questionnaireSaga });

  return (
    <div className="container app-container">
      <GlobalError />
      <Header />
      <Row halign="center" valign="center">
        <Column wrap span={{ small: 1, medium: 2, big: 6, large: 12, xLarge: 11 }}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/aanbouw/inleiding" component={HomePage} />
            <Route exact path="/aanbouw/locatie" component={AddressInput} />
            <Route exact path="/aanbouw/alle-vragen" component={QuestionnaireQuestions} />
            <Route exact path="/aanbouw/alle-routes" component={QuestionnaireRoutes} />
            <Route exact path="/aanbouw/basis" component={QuestionnaireBasis} />
            <Route exact path="/aanbouw/*" component={QuestionnaireContainer} />
            <Route exact path="/adres" component={AddressInputResults} />
            <Route exact path="/health" />
            <Route path="" component={NotFoundPage} />
          </Switch>
        </Column>
      </Row>
      <Footer />
    </div>
  );
};

export default compose(memo)(App);
