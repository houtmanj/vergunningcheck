import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { Row, Column, themeColor, themeSpacing } from '@datapunt/asc-ui';
import styled from '@datapunt/asc-core';
import { useMatomo } from '@datapunt/matomo-tracker-react';

import { useInjectSaga } from 'utils/injectSaga';
import LocationPage from 'containers/LocationPage';
import NotFoundPage from 'containers/NotFoundPage';
import Header from 'components/Header';
import Footer from 'components/Footer';
import GlobalError from 'containers/GlobalError';
import {
  GET_TEXT,
  EXTERNAL_URLS,
  PAGES,
  REDIRECT_TO_OLO,
  ALLOW_LOCATION_PAGE,
  GET_CURRENT_TOPIC,
} from '../../constants';
import questionnaireSaga from '../QuestionnaireContainer/saga';
import locationSaga from '../LocationPage/saga';
import './style.scss';

const addressInputKey = 'location';
const questionnaireKey = 'questionnaire';

const Container = styled(`div`)`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  background-color: white;
`;
const ContentContainer = styled(`div`)`
  max-width: 960px;
  width: 100%;
  margin: 0 auto;
  background-color: white;
`;
const FormTitle = styled(`h4`)`
  margin: ${themeSpacing(6, 0)};
  padding-bottom: 6px;
  border-bottom: 1px solid ${themeColor('tint', 'level5')};
  color: ${themeColor('tint', 'level5')};
`;
const Content = styled(`div`)`
  display: block;
  width: 100%;
`;

export const App = props => {
  useInjectSaga({ key: addressInputKey, saga: locationSaga });
  useInjectSaga({ key: questionnaireKey, saga: questionnaireSaga });

  const currentRoute = props.location.pathname.split('/')[1];
  const { trackPageView } = useMatomo();

  // @datapunt Track Page View
  // Docu: https://github.com/Amsterdam/matomo-tracker/tree/master/packages/react
  React.useEffect(() => {
    trackPageView();
  }, [currentRoute]);

  return (
    <Container>
      <GlobalError />
      <Header />
      <ContentContainer>
        <Row>
          <Column
            wrap
            span={{
              small: 1,
              medium: 2,
              big: 5,
              large: 9,
              xLarge: 9,
            }}
          >
            <Content />
            <Content>
              <FormTitle>{GET_TEXT?.title}</FormTitle>
            </Content>
            <Switch>
              {/* REDIRECTS */}
              {REDIRECT_TO_OLO && window.open(`${EXTERNAL_URLS.oloChecker.intro}`, '_self')}
              {ALLOW_LOCATION_PAGE && (
                <Redirect exact from={`/${GET_CURRENT_TOPIC()}`} to={`/${GET_CURRENT_TOPIC()}/${PAGES.location}`} />
              )}
              {/* ROUTES */}
              <Route exact path={`/:activityGroup/${PAGES.location}`} component={LocationPage} />
              <Route exact path="/:activityGroup/*" component={NotFoundPage} />
              <Route exact path="/health" />
              <Route exact path="/" component={Content} />
              <Route path="" component={NotFoundPage} />
            </Switch>
          </Column>
        </Row>
      </ContentContainer>
      <Footer />
    </Container>
  );
};

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default withRouter(compose(memo)(App));
