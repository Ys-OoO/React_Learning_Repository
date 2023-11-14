import { useState } from 'react';

export default function useMergedValue({ value, onChange, defaultValue }) {
  const isControlled = value !== undefined;
  const [v, setV] = useState(value ?? defaultValue);
  const finalValue = isControlled ? value : v;

  const update = (value) => {
    setV(value);
    onChange?.(value);
  };
  return [finalValue, update];
}
