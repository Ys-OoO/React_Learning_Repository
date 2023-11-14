/* eslint-disable react/display-name */
import React from 'react';
const UncontrolledSelect = React.forwardRef((props, ref) => {
  return (
    <select ref={ref}>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
  );
});

export default UncontrolledSelect;
