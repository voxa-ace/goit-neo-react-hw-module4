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
  const [noResults, setNoResults] = useState(false); 
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setLoading(true);
      setLoadingMore(false);
      setNoResults(false); 

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

        if (response.data.results.length === 0) {
          setNoResults(true); 
          if (page === 1) {
            setImages([]); 
          }
        } else {
          if (page === 1) {
            setImages(response.data.results); 
          } else {
            setImages((prevImages) => [...prevImages, ...response.data.results]); 
          }
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err);
        setImages([]); 
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearchSubmit = (query) => {
    setQuery(query);
    setPage(1); 
    setImages([]); 
    setError(null); 
    setNoResults(false);
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

  const handleLoadMore = () => {
    setLoadingMore(true); 
    setPage((prevPage) => prevPage + 1); 
  };

  const shouldShowLoadMore = !loading && !error && images.length > 0 && !noResults;

  return (
    <div className="appContainer">
      <header className="header">
        <h1>Image Gallery</h1>
      </header>
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && !loading && <ErrorMessage />} 
      {noResults && !loading && <p className="noResultsMessage">No results found for "{query}". Please try a different search term.</p>}
      {images.length > 0 && !error && <ImageGallery images={images} onImageClick={handleImageClick} />}
      {loading && !noResults && <Loader />} 
      {shouldShowLoadMore && (
        <LoadMoreBtn onClick={handleLoadMore} loading={loadingMore} />
      )}
      <ImageModal isOpen={isModalOpen} image={selectedImage} onClose={handleCloseModal} />
      <Toaster />
    </div>
  );
};

export default App;
