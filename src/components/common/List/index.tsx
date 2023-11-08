import { ReactNode } from 'react';
import styles from './List.module.scss';

interface ListType<T = any> {
  items: T[];
  content: ((element: T) => ReactNode);
}

const List = <T extends any>({ items, content }: ListType<T>) => {
  return <ul className={styles.List} data-testid="list">
    {
      items.map((item, i) => <li key={i} data-testid="listitem">{content(item)}</li>)
    }
  </ul>;
}

export default List;