import React, { useState } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value.trim() !== '') {
      setError('');  // Clear error if input is not empty
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === '') {
      setError('Input field must be filled.'); // Show error if input is empty
      return;
    }
    onSubmit(query);
  };

  return (
    <header className={styles.header}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search images and photos"
          autoComplete="off"
          autoFocus
        />
        <button className={styles.button} type="submit">Search</button>
      </form>
      {error && <ErrorMessage message={error} />} {/* Error message now below the form */}
    </header>
  );
};

export default SearchBar;
