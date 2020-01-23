import React from 'react';

export default ({ value, onChange, options }) => {
  const selected = options.find(option => option.value === value);
  const formValue = selected ? selected.formValue : '';
  return (
    <select
      onChange={({ target: { value } }) => {
        const option = options.find(({ formValue }) => formValue === value);
        // setFormValue(option.formValue);
        onChange(option.value);
      }}
      value={formValue}
    >
      <option value="">Kies</option>
      {options.map(option => (
        <option key={option.formValue} value={option.formValue}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
