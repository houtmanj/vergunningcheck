import React, { memo } from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';

import AddressInput from 'containers/AddressInput';
import QuestionnaireContainer from 'containers/QuestionnaireContainer';
import NotFoundPage from 'containers/NotFoundPage';
import Footer from 'components/Footer';
import Header from 'components/Header';
import GlobalError from 'containers/GlobalError';

import addressInputSaga from '../AddressInput/saga';

// import GlobalStyles from '../../global-styles';

import './style.scss';

const addressInputKey = 'addressInput';

export const App = () => {
  useInjectSaga({ key: addressInputKey, saga: addressInputSaga });

  return (
    <div className="container app-container">
      <GlobalError />
      <Header />
      <div className="content container">
        <Switch>
          <Route exact path="/" component={QuestionnaireContainer} />
          <Route exact path="/adres" component={AddressInput} />
          <Route exact path="/health" />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default compose(memo)(App);
