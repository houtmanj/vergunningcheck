import React from 'react';

const AddressInputResult = ({ title, loading, loadingText = 'Laden...', children }) => (
  <div>
    {title && <h4>{title}</h4>}
    {loading && <div>{loadingText}</div>}
    {children && !loading && <div>{children}</div>}
  </div>
);

export default AddressInputResult;
