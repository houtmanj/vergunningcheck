import React from 'react';
import PropTypes from 'prop-types';
import styled from '@datapunt/asc-core';
import { Button } from '@datapunt/asc-ui';
import { ChevronLeft } from '@datapunt/asc-assets';

const NavigationStyle = styled(`div`)`
  display: flex;
  height: 64px;
  margin: 20px 0;
  background-color: rgba(241, 241, 241, 1);
  justify-content: space-between;
  align-items: center;
`;

const Navigation = ({ showPrev, onGoToPrev, showNext, disableNext }) => (
  <NavigationStyle>
    <div>
      {showPrev && (
        <Button
          variant="textButton"
          iconLeft={<ChevronLeft />}
          iconSize={14}
          onClick={onGoToPrev}
          style={{ marginLeft: 10 }}
        >
          Vorige
        </Button>
      )}
    </div>
    <div>
      {showNext && (
        <Button type="submit" variant="secondary" disabled={disableNext} taskflow>
          Volgende
        </Button>
      )}
    </div>
  </NavigationStyle>
);

Navigation.propTypes = {
  showPrev: PropTypes.bool,
  onGoToPrev: PropTypes.func,
  showNext: PropTypes.bool,
  disableNext: PropTypes.bool,
};

export default Navigation;
