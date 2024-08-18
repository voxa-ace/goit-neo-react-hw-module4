import React from 'react';
import Modal from 'react-modal';
import styles from './ImageModal.module.css';

// Встановіть кореневий елемент для модального вікна
Modal.setAppElement('#root'); // Змініть '#root' на ваш кореневий елемент

const ImageModal = ({ isOpen, image, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
      closeTimeoutMS={300}
    >
      {image && <img className={styles.image} src={image.urls.regular} alt={image.alt_description} />}
    </Modal>
  );
};

export default ImageModal;
