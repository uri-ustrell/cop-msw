import React from 'react';

import style from './heading.scss';

const Heading = () => (
  <header className={`${style.heading} sg-text-headline`}>
    <h1 className="sg-headline">
      CoP:
      {' '}
      <span>Mock Service Worker</span>
    </h1>
    <p>
      This simple app lets you retrieve
      <span>the list of guardians</span>
      , add more or remove some.
    </p>
  </header>
);

export default Heading;
