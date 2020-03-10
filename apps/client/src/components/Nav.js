import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Button } from "@datapunt/asc-ui";
import { ChevronLeft } from "@datapunt/asc-assets";
import { useMatomo } from "@datapunt/matomo-tracker-react";
import { NavStyle } from "./NavStyle";
import { useRouteMatch } from "react-router-dom";
import { routeConfig } from "../routes";
import Context from "../context";

const Nav = ({
  showPrev,
  onGoToPrev,
  showNext,
  disableNext,
  nextText,
  formEnds
}) => {
  const {
    topic: { slug: name }
  } = useContext(Context);
  const { trackEvent } = useMatomo();
  const { path } = useRouteMatch();
  const route = routeConfig.find(route => route.path === path);
  const category = route.matamoPage || route.name;

  const handleNextClick = () => {
    trackEvent({
      category,
      action: "form-volgende-knop",
      name
    });
  };
  const handlePrevClick = e => {
    trackEvent({
      category,
      action: "form-vorige-knop",
      name
    });
    if (onGoToPrev) onGoToPrev(e);
  };

  return (
    <NavStyle>
      <div>
        {showNext && (
          <Button
            type="submit"
            variant="secondary"
            disabled={disableNext}
            onClick={handleNextClick}
            taskflow={!formEnds}
            style={{ marginRight: formEnds ? 10 : 25 }}
          >
            {nextText}
          </Button>
        )}
      </div>
      <div>
        {showPrev && (
          <Button
            variant="textButton"
            iconLeft={<ChevronLeft />}
            iconSize={14}
            style={{ marginLeft: 10 }}
            onClick={handlePrevClick}
            type="button"
          >
            Vorige
          </Button>
        )}
      </div>
    </NavStyle>
  );
};

Nav.defaultProps = {
  page: "undefined-page",
  nextText: "Volgende",
  formEnds: false
};

Nav.propTypes = {
  page: PropTypes.string,
  showPrev: PropTypes.bool,
  onGoToPrev: PropTypes.func,
  showNext: PropTypes.bool,
  nextText: PropTypes.string,
  formEnds: PropTypes.bool,
  disableNext: PropTypes.bool
};

export default Nav;