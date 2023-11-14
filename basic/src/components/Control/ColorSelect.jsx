import { useState } from 'react';

/* eslint-disable react/prop-types */
export default function ColorSelect({ value, onChange, defaultValue, ...props }) {
  const isControlled = value !== undefined;
  const [selected, setSelected] = useState(isControlled ? value : defaultValue);

  const finalValue = isControlled ? value : selected;
  // const [selected, setSelected] = useMergedValue({ value, onChange, defaultValue });
  const handleSelect = (color) => {
    setSelected(color);
    onChange?.(color);
  };

  return (
    <div
      {...props}
      style={{ display: 'flex', flexDirection: 'row', width: 200, justifyContent: 'space-around' }}
    >
      {['red', 'green', 'yellow'].map((color) => {
        return (
          <div
            key={color}
            style={{
              height: 20,
              width: 20,
              backgroundColor: color,
              ...(finalValue === color ? { transform: 'scale(1.5)' } : {}),
            }}
            onClick={() => {
              handleSelect(color);
            }}
          ></div>
        );
      })}
    </div>
  );
}
