import { Button, Form } from 'antd';
import { useEffect, useRef, useState } from 'react';
import ColorSelect from './components/Control/ColorSelect';
import ControlledSelect from './components/Control/ControlledSelect';
import UncontrolledSelect from './components/Control/UncontrolledSelect';
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

  const selectRef = useRef(null);
  const consoleSelect = () => {
    console.log(selectRef.current.value);
  };

  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldValue('color', 'red');
    form.setFieldValue('num', '3');
  });
  const [num, setNum] = useState();
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
      <UncontrolledSelect ref={selectRef} />
      <Button onClick={consoleSelect}>获取select</Button>
      <ControlledSelect
        value={num}
        onChange={(v) => {
          setNum(v);
        }}
      />
      <button
        onClick={() => {
          setNum(3);
        }}
      >
        设置num为3
      </button>
      <Form form={form}>
        <Form.Item name="color">
          <ColorSelect />
        </Form.Item>
      </Form>
      <button
        onClick={() => {
          form?.setFieldValue('color', 'green');
          form?.setFieldValue('num', '1');
        }}
      >
        设置color为绿色
      </button>
      <button
        onClick={() => {
          console.log(form.getFieldsValue());
        }}
      >
        打印form信息
      </button>
    </>
  );
}

export default App;
