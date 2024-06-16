import React, { useState } from 'react';
import { FaHeart, FaShare, FaDownload } from 'react-icons/fa';



export default function Favourites({ favouritesPhotos = [], handleFavourites }) {
  const toggleFavourite = (photo) => {
    handleFavourites(photo);
  };
  
  const handleShare = (photoUrl) => {
    const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`Checkout this awesome photo: ${photoUrl}`)}`;
    window.open(shareUrl, '_blank');
  };

  const handleDownload = (photoUrl, photoId) => {
    const link = document.createElement('a');
    link.href = photoUrl;
    link.download = `photo_${photoId}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); 
  };

  return (
    <main className="container mx-auto py-8 bg-gray-700 px-4 sm:px-6 lg:px-8">
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {favouritesPhotos.length === 0 ? (
          <p className="text-center text-gray-200">No favourite photos available</p>
        ) : (
          favouritesPhotos.map((photo, index) => (
            <article key={photo.id} className="relative overflow-hidden rounded-lg shadow-md bg-white">
              <img
                src={photo.urls.small}
                alt={photo.alt_description}
                className="w-full h-auto cursor-pointer rounded-lg"
               
              />
              <div className="absolute top-0 right-0 p-2 flex items-center space-x-2 bg-gray-800 bg-opacity-75 rounded-tr-lg">
                <button onClick={() => toggleFavourite(photo)}>
                  <FaHeart color='red' />
                </button>
                <div className="text-white"><FaHeart /> {photo.likes}</div>
                <button className="text-white" onClick={() => handleShare(photo.urls.regular)}><FaShare /></button>
                <button className="text-white" onClick={() => handleDownload(photo.urls.full, photo.id)}><FaDownload /></button>
              </div>
              <div className="absolute bottom-0 left-0 p-2 flex items-center space-x-2 bg-gray-800 bg-opacity-75 rounded-bl-lg">
                <a href={photo.user.portfolio_url} target="_blank" rel="noopener noreferrer">
                  <img src={photo.user.profile_image.medium} alt={photo.user.name} className="w-8 h-8 rounded-full" />
                </a>
                <span className="text-white">{photo.user.name}</span>
              </div>
            </article>
          ))
        )}
      </section>
      {/* {isLightboxOpen && (
        <Lightbox
        slides={favouritesPhotos.map(photo => ({ src: photo.urls.full }))}
        currentIndex={lightboxIndex}
        close={closeLightbox}
      />
      
      )} */}
    </main>
  );
}
