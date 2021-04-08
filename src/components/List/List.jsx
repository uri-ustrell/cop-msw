import React from 'react';
import styles from './List.scss';

const List = ({ guardians = [] }) => (
  <ul className={`sg-text-action ${styles.list}`} data-testid="guardiansList">
    {guardians.map(
      (g) => <li data-testid={`guardiansList.item.${g.id}`} key={g.id} className={styles.listItem}>{g.name}</li>,
    )}
  </ul>
);

export default List;
