import React, { useEffect, useState } from 'react';

import Buttons from 'components/Buttons/Buttons';
import List from 'components/List/List';
import ErrorWrapper from 'components/Error/Error';

import styles from './App.scss';

const App = () => {
  const [list, setList] = useState([]);
  const [error, setError] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleClickList = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/theguardians');
      if (response.ok && response.status === 200) {
        const guardiansList = await response.json();
        setList(guardiansList);
      } else {
        const { errorMessage } = await response.json();
        throw new Error(`Error when trying to list the guardians: ${errorMessage || response.statusText || 'unidentified error'}`);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleClickAdd = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/theguardians', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          { id: 99, name: inputValue },
        ),
      });

      if (response.ok && response.status === 201) {
        const guardiansList = await response.json();
        setList(guardiansList);
      } else {
        const { errorMessage } = await response.json();
        throw new Error(`Error when trying to add a guardian: ${errorMessage || response.statusText || 'unidentified error'}`);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleClickRemove = async (e) => {
    e.preventDefault();
    const guardian = list.find((li) => li.name === inputValue);

    try {
      const response = await fetch(`/theguardians/${guardian && guardian.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok && response.status === 200) {
        const guardiansList = await response.json();
        setList(guardiansList);
      } else {
        const { errorMessage } = await response.json();
        throw new Error(`Error when trying to remove a guardian: ${errorMessage || response.statusText || 'unidentified error'}`);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (error) {
      setError('');
    }
    if (inputValue) {
      setInputValue('');
    }
  }, [list]);

  return (
    <main className={styles.main}>
      <input
        value={inputValue}
        placeholder="Guardian to add or remove"
        className={`sg-input-border ${styles.input}`}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {error && <ErrorWrapper message={error} />}
      <div className={styles.container}>
        <Buttons handlers={{ handleClickList, handleClickAdd, handleClickRemove }} />
        <List guardians={list} />
      </div>
    </main>
  );
};

export default App;
