/* eslint-disable no-unused-vars */
/* eslint-disable no-inner-declarations */
import { useEffect, useRef, useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);
  const buttonRef = useRef(null);
  const handleClick = () => {
    countRef.current += 1;
    setCount(countRef.current); //生效
    // setCount(count + 1); //不生效
    // setCount((prevCount) => prevCount + 1); //生效
  };

  useEffect(() => {
    const buttonDom = buttonRef.current;
    if (buttonDom) {
      buttonDom.addEventListener('click', handleClick);
    }
    return () => {
      if (buttonDom) {
        buttonDom.removeEventListener('click', handleClick);
      }
    };
  }, []);
  return (
    <div>
      {count}
      <button ref={buttonRef}>count++</button>
    </div>
  );
}
