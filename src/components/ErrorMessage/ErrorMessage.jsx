import React from 'react';
import styles from './ErrorMessage.module.css';

const ErrorMessage = () => {
  return (
    <div className={styles.errorMessage}>
      <p>Something went wrong. Please try again later.</p>
    </div>
  );
};

export default ErrorMessage;
