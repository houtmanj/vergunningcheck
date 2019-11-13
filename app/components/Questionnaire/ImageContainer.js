import React from 'react';
import PropTypes from 'prop-types';
import { Paragraph } from '@datapunt/asc-ui';
import styled from '@datapunt/asc-core';

const Container = styled(`div`)`
  display: flex;
  flex-direction: 'row';
`;

const SingleImageContainer = styled(`div`)`
  width: 30%;
  margin: 5px;
`;

const ImageContainer = ({ media }) => (
  <Container>
    {media.map((image, index) => (
      <SingleImageContainer key={image.id} style={index === 0 ? { marginLeft: 0 } : null}>
        <img src={image.url} alt={image.description} style={{ maxWidth: '100%' }} />
        <Paragraph>{image.description}</Paragraph>
      </SingleImageContainer>
    ))}
  </Container>
);

ImageContainer.propTypes = {
  media: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      description: PropTypes.string,
    }),
  ),
};

export default ImageContainer;
