import { Spin } from 'antd';
import React from 'react';
import './spinner.css'

const Spinner = () => (
    <div className="spinner">
        <Spin size='large' />
    </div>
);
export default Spinner;