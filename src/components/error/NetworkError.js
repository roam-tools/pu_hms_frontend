import { Button, Modal, Result } from 'antd';
import React from 'react';

export const NetworkError = ({ visible }) => (

  Modal.error({
    title: 'This is an error message',
    content: 'some messages...some messages...',
  })
  // <Modal visible={visible}>
  //   <Result
  //     status="500"
  //     title="500"
  //     subTitle="Sorry, something went wrong."
  //     extra={<Button type="primary">Reload</Button>}
  //   />
  // </Modal>
);