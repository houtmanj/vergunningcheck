import React from 'react';
import PropTypes from 'prop-types';

import styled from '@datapunt/asc-core';
import { breakpoint } from '@datapunt/asc-ui';

const Container = styled(`div`)`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;

  img {
    width: 100%;
    margin-bottom: 20px;

    @media screen and ${breakpoint('min-width', 'tabletS')} {
      width: 48%;
    }
  }
`;

const ImageContainer = ({ children }) => (
  <Container>
    {children}
    {/* Temp fix: */}
    <img src="https://via.placeholder.com/220x151.png" alt="" />
    <img src="https://via.placeholder.com/220x151.png" alt="" />
    <img src="https://via.placeholder.com/220x151.png" alt="" />
  </Container>
);

ImageContainer.propTypes = {
  children: PropTypes.node,
};

export default ImageContainer;
