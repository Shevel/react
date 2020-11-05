import React from 'react';
import spin from '../../../assets/icon/Spin.svg';
import './spin.css';

const Preloader: React.FC = () => {
  return <img className='spin' src={spin} alt='spin-loader' />
}
export default Preloader;