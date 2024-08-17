import React from 'react';
import Loader from '../Loader/Loader'; 
import styles from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onClick, loading }) => {
  return (
    <button className={styles.button} onClick={onClick} disabled={loading}>
      {loading ? <Loader /> : 'Load More'}
    </button>
  );
};

export default LoadMoreBtn;
