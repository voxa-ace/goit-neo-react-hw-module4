import React from 'react';
import ReactModal from 'react-modal';
import styles from './ImageModal.module.css';

export default function ImageModal({ image, onClose }) {
  return (
    <ReactModal
      isOpen={!!image}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      className={styles.modal}
      overlayClassName={styles.overlay}
      ariaHideApp={false}
    >
      <div className={styles.content}>
        <img src={image.urls.regular} alt={image.alt_description} className={styles.image} />
        <button onClick={onClose} className={styles.closeButton}>Close</button>
      </div>
    </ReactModal>
  );
}
