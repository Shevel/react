import React from 'react';
import ReactDom from 'react-dom';
import MainApplication from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDom.render(<MainApplication />, div);
  ReactDom.unmountComponentAtNode(div);
});