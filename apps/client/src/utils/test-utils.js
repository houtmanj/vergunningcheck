import React from "react";
import dotenv from "dotenv-flow";
import { render } from "@testing-library/react";
import { ApolloProvider } from "@apollo/react-hooks";
import { MatomoProvider, createInstance } from "@datapunt/matomo-tracker-react";
import { ThemeProvider } from "@datapunt/asc-ui";

import Context, { defaultValues } from "../context";
import { matamo } from "../config";
import apolloClient from "../apolloClient";

dotenv.config();

const AllTheProviders = ({ children }) => {
  return (
    <Context.Provider value={defaultValues}>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider>
          <MatomoProvider value={createInstance(matamo)}>
            {children}
          </MatomoProvider>
        </ThemeProvider>
      </ApolloProvider>
    </Context.Provider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
