import styles from './Card.module.scss';
import { ReactNode } from 'react';

interface CardType {
  title?: ReactNode
  children: ReactNode;
}

const Card = ({ title, children }: CardType) => {
  return (
    <div className={styles.Card}>
      {
        title && <>
          <div className={styles.Card__title} data-testid="card-title">
            {title}
          </div>
          <hr />
        </>
      }
      <div className={styles.Card__content} data-testid="card-content">
        {children}
      </div>
    </div>
  );
}

export default Card;
