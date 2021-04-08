import React from 'react';
import ReactDOM from 'react-dom';

import Heading from 'components/Heading/Heading';
import App from './App';

window.render_mswCop = () => {
  ReactDOM.render(
    <>
      <Heading />
      <App />
    </>, document.getElementById('mswCop'),
  );
};
