import React from 'react';
import styles from './Error.scss';

const Error = ({ message }) => (
  <div className={`sg-overline ${styles.error}`} data-testid="guardiansList.error">{message}</div>
);

export default Error;
