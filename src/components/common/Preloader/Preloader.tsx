import React from 'react';

import { Spin } from 'antd';
import './spin.css';

export const Preloader: React.FC = () => {
  return <Spin className="spin" tip="Loading..." />
}