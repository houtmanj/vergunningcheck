import React from 'react';

// eslint-disable-next-line react/prop-types
export default ({ value: inputValue, onChange, options }) => {
  // eslint-disable-next-line react/prop-types
  const selected = options.find(option => option.value === inputValue);
  const formInputValue = selected ? selected.formValue : '';
  return (
    <select
      onChange={({ target: { value } }) => {
        // eslint-disable-next-line react/prop-types
        const option = options.find(({ formValue }) => formValue === value);
        onChange(option.value);
      }}
      value={formInputValue}
    >
      <option value="">Kies</option>
      {/* eslint-disable-next-line react/prop-types */}
      {options.map(option => (
        <option key={option.formValue} value={option.formValue}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
