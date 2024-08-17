import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <ThreeDots color="#007bff" height={80} width={80} />
    </div>
  );
};

export default Loader;
