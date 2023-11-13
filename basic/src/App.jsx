import { Button } from 'antd';
import { useState } from 'react';
import AuthButton from './components/HOC/Demo_1/withAuth';
import StyleAndLoadingModal from './components/HOC/Demo_1/withStyleAndLoading';
import EasyModal from './components/RenderProps/Demo/EasyModal';
import MouseTracker, { MouseTrackerHoc } from './components/RenderProps/example/MouseTracker';
function App() {
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };
  const pointTracker = (mousePosition) => {
    return (
      <div
        className="123"
        style={{
          height: 10,
          width: 10,
          position: 'absolute',
          top: mousePosition?.y,
          left: mousePosition?.x,
          backgroundColor: 'yellow',
        }}
      ></div>
    );
  };

  const buttonRender = (setOpen) => {
    return (
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        打开
      </Button>
    );
  };
  return (
    <>
      <AuthButton onClick={openModal}>open</AuthButton>
      <StyleAndLoadingModal open={open}></StyleAndLoadingModal>
      <MouseTracker renderFunc={pointTracker} />
      <MouseTrackerHoc />
      <EasyModal
        beforeOk={() => {
          console.log('beforeOk');
        }}
      >
        123
      </EasyModal>
      <EasyModal
        beforeOk={() => {
          console.log('beforeOk');
        }}
        buttonRender={buttonRender}
      >
        234
      </EasyModal>
    </>
  );
}

export default App;
