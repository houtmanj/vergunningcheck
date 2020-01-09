import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';
import 'leaflet/dist/leaflet';

// Import from @datapunt
import { GlobalStyle as AmsterdamGlobalStyle, ThemeProvider, themeColor } from '@datapunt/asc-ui';
import { createGlobalStyle } from '@datapunt/asc-core';
import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react';

import App from 'containers/App';
import { MATOMO_CONFIG } from './constants';
import configureStore from './configureStore';
// Load the favicon and the .htaccess fil
import '!file-loader?name=[name].[ext]!./images/favicon.png';
import 'file-loader?name=.htaccess!./.htaccess'; // eslint-disable-line import/extensions

// Set Matomo tracker from @datapunt
const instance = createInstance({
  urlBase: MATOMO_CONFIG.BASE_URL,
  siteId: MATOMO_CONFIG.SITE_ID,
});

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const AppGlobalStyle = createGlobalStyle`
  body {
    min-height: 100vh;
    background-color: ${themeColor('tint', 'level3')};
  }
`;

ReactDOM.render(
  <MatomoProvider value={instance}>
    <ThemeProvider>
      <AmsterdamGlobalStyle />
      <AppGlobalStyle />
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    </ThemeProvider>
  </MatomoProvider>,
  MOUNT_NODE,
);
// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
