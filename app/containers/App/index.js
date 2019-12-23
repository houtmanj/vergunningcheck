import React, { memo } from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'redux';

import { Row, Column, Button, themeColor, themeSpacing } from '@datapunt/asc-ui';
import styled from '@datapunt/asc-core';
import { ChevronLeft } from '@datapunt/asc-assets';

import { useInjectSaga } from 'utils/injectSaga';

import HomePage from 'containers/HomePage';
import LocationPage from 'containers/LocationPage';
import QuestionnaireContainer from 'containers/QuestionnaireContainer';
import AllQuestions from 'containers/QuestionnaireContainer/AllQuestions';
import QuestionnaireRoutes from 'containers/QuestionnaireContainer/QuestionRoutes';
import Header from 'components/Header';
import Footer from 'components/Footer';
import GlobalError from 'containers/GlobalError';
import questionnaireSaga from '../QuestionnaireContainer/saga';
import locationSaga from '../LocationPage/saga';

import './style.scss';

const addressInputKey = 'location';
const questionnaireKey = 'questionnaire';

const BackgroundFullWidth = styled(`div`)`
  background-color: ${themeColor('tint', 'level3')};
`;
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
const StyledButton = styled(Button)`
  margin-top: 15px;
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

export const App = () => {
  useInjectSaga({ key: addressInputKey, saga: locationSaga });
  useInjectSaga({ key: questionnaireKey, saga: questionnaireSaga });

  return (
    <BackgroundFullWidth>
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
              <Content>
                <StyledButton variant="textButton" iconLeft={<ChevronLeft />} iconSize={14} onClick={() => {}}>
                  Terug naar pagina Aanbouw en uitbouw
                </StyledButton>
              </Content>
              <Content>
                <FormTitle>Vergunningchecker Aanbouw</FormTitle>
              </Content>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/:werkzaamheid/inleiding" component={HomePage} />
                <Route exact path="/:werkzaamheid/locatie" component={LocationPage} />
                <Route exact path="/:werkzaamheid/alle-vragen" component={AllQuestions} />
                <Route exact path="/:werkzaamheid/alle-routes" component={QuestionnaireRoutes} />
                <Route exact path="/:werkzaamheid/*" component={QuestionnaireContainer} />
                <Route
                  path=""
                  component={() => {
                    window.location.href =
                      'https://www.omgevingsloket.nl/Particulier/particulier/home/checken?init=true&clear-case=true';
                    return null;
                  }}
                />
              </Switch>
            </Column>
          </Row>
        </ContentContainer>
        <Footer />
      </Container>
    </BackgroundFullWidth>
  );
};

export default compose(memo)(App);
