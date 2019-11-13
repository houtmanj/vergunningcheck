import React from 'react';
import PropTypes from 'prop-types';

import Image from 'components/Image';

const ImageContainer = ({ media }) =>
  media.map(image => <Image key={`media-${image.id}`} description={image.description} url={image.url} />);

ImageContainer.propTypes = {
  media: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      description: PropTypes.string,
    }),
  ),
};

export default ImageContainer;
