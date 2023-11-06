import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import styles from './Error.module.scss';

export default function ErrorComponent() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className={styles.Error}>
        <h1 className={styles.Error__title}>Oops!</h1>
        <h2 className={styles.Error__subtitle}>Error {error.status}</h2>
        <p className={styles.Error__text}>{error.statusText}</p>
        {error.data?.message && <p>{error.data.message}</p>}
      </div>
    );
  } else {
    return <div className={styles.Error__title}>Oops</div>;
  }
}