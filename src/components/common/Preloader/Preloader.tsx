import React from 'react';

import { Spin } from 'antd';
import './spin.css';

const Preloader: React.FC = () => {
  return <Spin className="spin" size="large"/>
}

export default Preloader;