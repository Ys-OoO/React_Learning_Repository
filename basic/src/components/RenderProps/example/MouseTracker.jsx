/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { Card } from 'antd';
import { useState } from 'react';

export default function MouseTracker({ renderFunc, ...props }) {
  const [mousePosition, setPosition] = useState({ x: 0, y: 0 });
  function getPosition(e) {
    setPosition({
      x: e.clientX,
      y: e.clientY,
    });
  }

  return (
    <div
      onMouseMove={getPosition}
      style={{ height: 200, width: 200, backgroundColor: 'gray' }}
      {...props}
    >
      当前鼠标位置：{mousePosition?.x},{mousePosition?.y}
      {renderFunc && renderFunc(mousePosition)}
    </div>
  );
}

//尝试Hoc
// eslint-disable-next-line react-refresh/only-export-components
export const mouseTracker = (InnerComponent, renderFunc) => {
  return (props) => {
    const [mousePosition, setPosition] = useState({ x: 0, y: 0 });
    function getPosition(e) {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    }
    return (
      <InnerComponent
        onMouseMove={getPosition}
        style={{ height: 200, width: 200, backgroundColor: 'gray' }}
        {...props}
      >
        当前鼠标位置：{mousePosition?.x},{mousePosition?.y}
        {renderFunc && renderFunc(mousePosition)}
      </InnerComponent>
    );
  };
};

export const MouseTrackerHoc = mouseTracker(Card, (mousePosition) => {
  return (
    <div
      className="123"
      style={{
        height: 10,
        width: 10,
        position: 'absolute',
        top: mousePosition?.y,
        left: mousePosition?.x,
        backgroundColo: 'yellow',
      }}
    ></div>
  );
});
