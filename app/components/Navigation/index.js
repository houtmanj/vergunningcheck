import React from 'react';
import PropTypes from 'prop-types';
import styled from '@datapunt/asc-core';
import { Button } from '@datapunt/asc-ui';
import { ChevronLeft } from '@datapunt/asc-assets';

const NavigationStyle = styled(`div`)`
  display: flex;
  height: 60px;
  margin: 20px 0;
  background-color: rgba(229, 229, 229, 1);
  justify-content: space-between;
  align-items: center;
`;

const Navigation = ({ showPrev, onGoToPrev, showNext, onGoToNext }) => (
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
        <Button variant="secondary" taskflow onClick={onGoToNext}>
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
  onGoToNext: PropTypes.func,
};

export default Navigation;
