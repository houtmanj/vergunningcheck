import React from 'react';
import PropTypes from 'prop-types';
import styled from '@datapunt/asc-core';
import { Button } from '@datapunt/asc-ui';
import { ChevronLeft } from '@datapunt/asc-assets';
import { useMatomo } from '@datapunt/matomo-tracker-react';

const NavigationStyle = styled(`div`)`
  display: flex;
  height: 64px;
  margin: 20px 0;
  background-color: rgba(241, 241, 241, 1);
  justify-content: space-between;
  align-items: center;
  flex-direction: row-reverse;
`;

const Navigation = ({ page, showPrev, onGoToPrev, showNext, disableNext }) => {
  const { trackEvent } = useMatomo();

  const handleNextClick = () => {
    trackEvent({ category: page, action: 'form-volgende-knop' });
  };
  const handlePrevClick = e => {
    trackEvent({ category: page, action: 'form-vorige-knop' });

    if (onGoToPrev) onGoToPrev(e);
  };

  return (
    <NavigationStyle>
      <div>
        {showNext && (
          <Button type="submit" variant="secondary" disabled={disableNext} onClick={handleNextClick} taskflow>
            Volgende
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
};

Navigation.propTypes = {
  page: PropTypes.string,
  showPrev: PropTypes.bool,
  onGoToPrev: PropTypes.func,
  showNext: PropTypes.bool,
  disableNext: PropTypes.bool,
};

export default Navigation;
