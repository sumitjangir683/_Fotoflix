import React, { useEffect } from 'react';
import { FaDownload, FaHeart, FaShare } from 'react-icons/fa';

export default function Photos({ photos = [], handleFavourites, favouritesPhotos = [], loading, setPage }) {
  useEffect(() => {
    const handleScroll = () => {
      if (!loading && window.innerHeight + window.scrollY >= document.body.scrollHeight - 200) {
        setPage((prevPage) => prevPage + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

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

  const toggleFavourite = (photo) => {
    handleFavourites(photo);
  };

  return (
    <main className="container mx-auto py-8 bg-gray-700">
      <div className="px-4 sm:px-6 lg:px-8">
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : (
            photos.map((photo) => (
              <article key={photo.id} className="relative overflow-hidden rounded-lg shadow-lg bg-white">
                <img
                  src={photo.urls.small}
                  alt={photo.alt_description}
                  className="w-full h-auto cursor-pointer rounded-t-lg"
                />
                <div className="absolute top-0 right-0 p-2 flex items-center space-x-2 bg-gray-900 bg-opacity-75 rounded-tr-lg">
                  <button className="text-white" onClick={() => toggleFavourite(photo)}>
                    <FaHeart color={favouritesPhotos.some((favPhoto) => favPhoto.id === photo.id) ? 'red' : 'gray'} />
                  </button>
                  <div className="text-white flex items-center"><FaHeart className="mr-1" /> {photo.likes}</div>
                  <button className="text-white" onClick={() => handleShare(photo.urls.regular)}><FaShare /></button>
                  <button className="text-white" onClick={() => handleDownload(photo.urls.full, photo.id)}><FaDownload /></button>
                </div>
                <div className="absolute bottom-0 left-0 p-2 flex items-center space-x-2 bg-gray-900 bg-opacity-75 rounded-bl-lg">
                  <a href={photo.user.portfolio_url} target="_blank" rel="noopener noreferrer">
                    <img src={photo.user.profile_image.medium} alt={photo.user.name} className="w-8 h-8 rounded-full" />
                  </a>
                  <span className="text-white">{photo.user.name}</span>
                </div>
              </article>
            ))
          )}
        </section>
      </div>
    </main>
  );
}
