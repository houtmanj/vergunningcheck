import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";

import { MatomoProvider, createInstance } from "@datapunt/matomo-tracker-react";
import { GlobalStyle, ThemeProvider, themeColor } from "@datapunt/asc-ui";
import Context, { defaultValues } from "./context";
import { createGlobalStyle } from "@datapunt/asc-core";

import { matamo } from "./config";
import apolloClient from "./apolloClient";
import * as serviceWorker from "./serviceWorker";

import Router from "./components/Router";

import "@datapunt/asc-assets/lib/assets/fonts.css";

const AppGlobalStyle = createGlobalStyle`
  body {
    min-height: 100vh;
    background-color: ${themeColor("tint", "level3")};
  }
`;

ReactDOM.render(
  <Context.Provider value={defaultValues}>
    <ApolloProvider client={apolloClient}>
      <ThemeProvider>
        <GlobalStyle />
        <AppGlobalStyle />
        <MatomoProvider value={createInstance(matamo)}>
          <Router />
        </MatomoProvider>
      </ThemeProvider>
    </ApolloProvider>
  </Context.Provider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
