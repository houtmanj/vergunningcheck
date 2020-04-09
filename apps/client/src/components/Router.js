import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { routeConfig } from "../routes";
import ScrollToTop from "./ScrollToTop";

const Loading = () => <p>laden</p>;
const Router = (props) => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<Loading />}>
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
