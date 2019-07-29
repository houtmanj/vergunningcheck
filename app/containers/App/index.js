import React, { memo } from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';

import AddressInput from 'containers/AddressInput';
import Questionnaire from 'containers/Questionnaire';
import NotFoundPage from 'containers/NotFoundPage';
import Footer from 'components/Footer';
import MainMenu from 'components/MainMenu';
import HeaderContainer from 'containers/HeaderContainer';
import GlobalError from 'containers/GlobalError';

import addressInputSaga from '../AddressInput/saga';

import GlobalStyles from '../../global-styles';

const addressInputKey = 'addressInput';

export const App = () => {
  useInjectSaga({ key: addressInputKey, saga: addressInputSaga });

  return (
    <div className="container app-container">
      <GlobalError />
      <div className="container">
        <HeaderContainer />
      </div>
      <div className="container-fluid">
        <MainMenu />
      </div>
      <div className="content container">
        <Switch>
          <Route exact path="/" component={Questionnaire} />
          <Route exact path="/adres" component={AddressInput} />
          <Route exact path="/health" />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </div>
      <div className="container-fluid">
        <Footer />
      </div>

      <GlobalStyles />
    </div>
  );
};

export default compose(memo)(App);
