import './App.css'; // Optional if you have custom styles
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Photos from './Components/Photos';
import Layout from './Layout';
import Favourites from './Components/Favourites';
import Header from './Components/Header';

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [favouritesPhotos, setFavouritePhotos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      let url = 'https://api.unsplash.com/photos/?client_id=ho_pSiTgNEsIs1HhE0HE77LR-eGYYsQ31WbbW4a-qCo';
      if (searchQuery) {
        url = `https://api.unsplash.com/search/photos/?client_id=vpwYTgTtMnKlJaExnJ5-d5HRHPmDRLPB7E-bxzErPrg&page=${page}&query=${searchQuery}`;
      } else {
        url += `&page=${page}`; // Append page number to URL
      }

      try {
        const response = await fetch(url);
        const data = await response.json();
        setPhotos((prevPhotos) => {
          if (searchQuery && page === 1) {
            return data.results;
          } else if (searchQuery) {
            return [...data.results, ...prevPhotos];
          } else {
            return [...data, ...prevPhotos];
          }
        }); // Append new photos to existing ones
        setLoading(false);
      } catch (error) {
        console.error('Error fetching photos:', error);
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [searchQuery, page]);

  const handleFavourites = (photo) => {
    const existingIndex = favouritesPhotos.findIndex(
      (favPhoto) => favPhoto.id === photo.id
    );

    if (existingIndex !== -1) {
      // If the photo is already in favorites, remove it
      setFavouritePhotos((prevFavorites) =>
        prevFavorites.filter((favPhoto) => favPhoto.id !== photo.id)
      );
    } else {
      // If the photo is not in favorites, add it
      setFavouritePhotos((prevFavorites) => [...prevFavorites, photo]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <Photos
                  photos={photos}
                  handleFavourites={handleFavourites}
                  favouritesPhotos={favouritesPhotos}
                  loading={loading}
                  setPage={setPage}
                  page={page}
                />
              }
            />
            <Route
              path="/favourites"
              element={<Favourites favouritesPhotos={favouritesPhotos} handleFavourites={handleFavourites} />}
            />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
