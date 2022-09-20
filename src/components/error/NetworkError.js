import { Button, Result } from 'antd';
import React from 'react';

export const NetworkError = () => (
  <Result
    status="500"
    title="500"
    subTitle="Sorry, something went wrong."
    extra={<Button type="primary">Reload</Button>}
  />
);