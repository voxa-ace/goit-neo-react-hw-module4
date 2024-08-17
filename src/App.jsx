import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageModal from './components/ImageModal/ImageModal';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import { Toaster } from 'react-hot-toast';
import './App.css';

const API_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const PER_PAGE = 12;

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false); 

  useEffect(() => {
    if (!query) return;

    setLoading(true);

    const fetchImages = async () => {
      try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
          params: {
            query,
            page,
            per_page: PER_PAGE,
          },
          headers: {
            Authorization: `Client-ID ${API_KEY}`,
          },
        });

        setImages((prevImages) => [...prevImages, ...response.data.results]);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearchSubmit = (query) => {
    setQuery(query);
    setImages([]);
    setPage(1);
    setError(null);
  };

  const handleImageClick = (image) => {
    if (!isModalOpen) {
      setSelectedImage(image);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const handleLoadMore = async () => {
    setLoadingMore(true); 
    setPage((prevPage) => prevPage + 1);
    setLoadingMore(false); 
  };

  return (
    <div className="appContainer">
      <header className="header">
        <h1>Image Gallery</h1>
      </header>
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <ErrorMessage />}
      {loading && <Loader />}
      {images.length > 0 && <ImageGallery images={images} onImageClick={handleImageClick} />}
      {images.length > 0 && !loading && !error && <LoadMoreBtn onClick={handleLoadMore} loading={loadingMore} />}
      <ImageModal isOpen={isModalOpen} image={selectedImage} onClose={handleCloseModal} />
      <Toaster />
    </div>
  );
};

export default App;
