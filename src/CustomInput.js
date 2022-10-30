import React from 'react';

export const CustomInput = React.forwardRef((props, ref) => {
  const { value, onChange } = props;
  return (
    <input
      className="custom-input"
      ref={ref}
      value={value}
      onChange={onChange}
    />
  );
});
