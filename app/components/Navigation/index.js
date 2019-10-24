import React from 'react';
import PropTypes from 'prop-types';
import styled from '@datapunt/asc-core';
import { Button } from '@datapunt/asc-ui';
import { ChevronLeft } from '@datapunt/asc-assets';

const NavigationStyle = styled(`div`)`
  display: flex;
  // max-width: 620px; // See design system..
  height: 64px;
  margin: 20px 0;
  background-color: rgba(241, 241, 241, 1);
  justify-content: space-between;
  align-items: center;
`;

const Navigation = ({
  showPrev,
  onGoToPrev,
  showNext,
  disableNext,
  // onGoToNext
}) => (
  <NavigationStyle>
    <div>
      {showPrev && (
        <Button variant="textButton" iconLeft={<ChevronLeft />} iconSize={14} onClick={onGoToPrev}>
          Vorige
        </Button>
      )}
    </div>
    <div>
      {showNext && (
        <Button type="submit" variant="secondary" taskflow disabled={disableNext}>
          Volgende
        </Button>
      )}
    </div>
  </NavigationStyle>
);

// Navigation.defaultProps = {
// };
Navigation.propTypes = {
  showPrev: PropTypes.bool,
  onGoToPrev: PropTypes.func,
  showNext: PropTypes.bool,
  disableNext: PropTypes.bool,
  // onGoToNext: PropTypes.func,
};

export default Navigation;
