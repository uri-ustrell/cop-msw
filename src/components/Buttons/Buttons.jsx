import React from 'react';
import styles from './Buttons.scss';

const Buttons = ({ handlers: { handleClickList, handleClickAdd, handleClickRemove } }) => (
  <div className={styles.wrapper}>
    <button
      id="listGuardiansButton"
      type="button"
      className={`${styles.button} sg-button-square-primary`}
      onClick={handleClickList}
    >
      List
    </button>
    <button
      id="addGuardianButton"
      type="button"
      className={`${styles.button} sg-button-square-secondary`}
      onClick={handleClickAdd}
    >
      Add
    </button>
    <button
      id="removeGuardianButton"
      type="button"
      className={`${styles.button} sg-button-square-secondary`}
      onClick={handleClickRemove}
    >
      Remove
    </button>
  </div>
);

export default Buttons;
