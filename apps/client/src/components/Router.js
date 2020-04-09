import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { routeConfig } from "../routes";
import ScrollToTop from "./ScrollToTop";
import LoadingPage from "../pages/LoadingPage";

const Router = (props) => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<LoadingPage />}>
        <Switch>
          {routeConfig
            .filter((route) => route.component)
            .map((route, i) => (
              <Route key={i} {...route} />
            ))}
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
