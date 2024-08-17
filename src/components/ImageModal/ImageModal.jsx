import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './ImageModal.module.css';

const ImageModal = ({ isOpen, image, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <img src={image.urls.regular} alt={image.alt_description} />
      </div>
    </div>,
    document.body
  );
};

export default ImageModal;
