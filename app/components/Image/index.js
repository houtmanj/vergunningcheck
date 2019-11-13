import React from 'react';
import PropTypes from 'prop-types';
import { Column, Paragraph } from '@datapunt/asc-ui';

const Image = ({ url, description }) => (
  <Column>
    <img src={url} alt={description} style={{ width: '100%' }} />{' '}
    <div>
      <Paragraph>{description}</Paragraph>
    </div>
  </Column>
);

Image.propTypes = {
  url: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default Image;
