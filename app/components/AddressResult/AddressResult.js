import React from 'react';
import PropTypes from 'prop-types';

import { Heading } from '@datapunt/asc-ui';

const AddressResult = ({ title, loading, loadingText, children }) => (
  <div>
    {title && <Heading $as="h4">{title}</Heading>}
    {loading && <div>{loadingText}</div>}
    {children && !loading && <div>{children}</div>}
  </div>
);

AddressResult.defaultProps = {
  loadingText: 'Laden...',
};

AddressResult.propTypes = {
  title: PropTypes.string,
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
  children: PropTypes.node,
};

export default AddressResult;
