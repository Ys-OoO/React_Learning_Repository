/* eslint-disable react/prop-types */
import { useState } from 'react';

export default function ControlledSelect({ onChange, value, ...props }) {
  const [selected, setSelected] = useState(value);
  const handleChange = (e) => {
    const value = e.target.value;
    setSelected(value);
    onChange?.(value);
  };
  return (
    <>
      <select value={selected} onChange={handleChange} {...props}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
    </>
  );
}
