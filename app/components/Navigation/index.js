import React from 'react';
import PropTypes from 'prop-types';
import styled from '@datapunt/asc-core';

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
        <button type="button" onClick={onGoToPrev}>
          &lt; Vorige
        </button>
      )}
    </div>
    <div>
      {showNext && (
        <button type="button" onClick={onGoToNext}>
          Volgende &gt;
        </button>
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
