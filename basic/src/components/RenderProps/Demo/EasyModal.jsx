/* eslint-disable react/prop-types */
import { Button, Modal } from 'antd';
import { Fragment, useState } from 'react';

export default function EasyModal({ buttonRender, beforeOk, ...props }) {
  const [open, setOpen] = useState();
  const onOk = () => {
    if (beforeOk) beforeOk();
    setOpen(false);
  };

  return (
    <Fragment>
      {buttonRender && buttonRender(setOpen)}
      {buttonRender === undefined ? (
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          openModal
        </Button>
      ) : undefined}
      <Modal
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
        onOk={onOk}
        {...props}
      >
        {props.children}
      </Modal>
    </Fragment>
  );
}
