import React from 'react';
import PropTypes from 'prop-types';
import styled from '@datapunt/asc-core';
import { Button } from '@datapunt/asc-ui';
import { ChevronLeft } from '@datapunt/asc-assets';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import { GET_CURRENT_TOPIC } from '../../constants';

const NavigationStyle = styled(`div`)`
  display: flex;
  height: 64px;
  margin: 20px 0 40px;
  background-color: rgba(241, 241, 241, 1);
  justify-content: space-between;
  align-items: center;
  flex-direction: row-reverse;
`;

const Navigation = ({ page, showPrev, onGoToPrev, showNext, disableNext, nextText, formEnds }) => {
  const { trackEvent } = useMatomo();

  const handleNextClick = () => {
    trackEvent({ category: page, action: 'form-volgende-knop', name: GET_CURRENT_TOPIC() });
  };
  const handlePrevClick = e => {
    trackEvent({ category: page, action: 'form-vorige-knop', name: GET_CURRENT_TOPIC() });

    if (onGoToPrev) onGoToPrev(e);
  };

  return (
    <NavigationStyle>
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
    </NavigationStyle>
  );
};

Navigation.defaultProps = {
  page: 'undefined-page',
  nextText: 'Volgende',
  formEnds: false,
};

Navigation.propTypes = {
  page: PropTypes.string,
  showPrev: PropTypes.bool,
  onGoToPrev: PropTypes.func,
  showNext: PropTypes.bool,
  nextText: PropTypes.string,
  formEnds: PropTypes.bool,
  disableNext: PropTypes.bool,
};

export default Navigation;
