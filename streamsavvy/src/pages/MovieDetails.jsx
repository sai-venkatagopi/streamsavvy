import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieById, deleteMovie, getFavorites, addFavorite, removeFavorite } from '../services/movieService';
import { toast } from 'react-toastify';
import { FaPlay, FaHeart, FaTrash, FaEdit } from 'react-icons/fa';
import { usePlayer } from '../context/PlayerContext';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setCurrentVideo } = usePlayer();
  
  const [movie, setMovie] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // 1. Fetch Movie Details
    getMovieById(id)
      .then(res => setMovie(res.data))
      .catch(() => navigate('/404'));
    
    // 2. Check if already in Favorites
    checkFavoriteStatus();
  }, [id, navigate]);

  const checkFavoriteStatus = async () => {
    try {
      const res = await getFavorites();
      // Check if this movie ID exists in the favorites list
      const favoriteItem = res.data.find(fav => fav.movieId === parseInt(id) || fav.movieId === id);
      setIsFavorite(!!favoriteItem);
    } catch (error) {
      console.error("Error checking favorites", error);
    }
  };

  const handleToggleFavorite = async () => {
    try {
      if (isFavorite) {
        // Remove from favorites
        const favoritesRes = await getFavorites();
        const favItem = favoritesRes.data.find(fav => fav.movieId === parseInt(id) || fav.movieId === id);
        if (favItem) {
          await removeFavorite(favItem.id);
          toast.info(`${movie.title} removed from My List.`);
        }
      } else {
        // Add to favorites (Mocking userId: 1)
        await addFavorite({ movieId: movie.id, userId: 1 });
        toast.success(`${movie.title} added to My List!`);
      }
      setIsFavorite(!isFavorite); // Toggle state UI
    } catch (error) {
      toast.error("Could not update My List.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${movie.title}?`)) {
      await deleteMovie(id);
      toast.info(`${movie.title} deleted successfully.`);
      navigate('/browse');
    }
  };

  if (!movie) return <div className="pt-24 text-center dark:text-white">Loading...</div>;

  return (
    <div className="pt-24 min-h-screen dark:bg-dark">
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Poster */}
          <img src={movie.poster} alt={movie.title} className="w-full h-auto object-cover rounded-lg shadow-xl" />
          
          {/* Details */}
          <div className="md:col-span-2 dark:text-gray-200">
            <h1 className="text-5xl font-extrabold mb-4 text-primary">{movie.title}</h1>
            <p className="text-xl mb-4">{movie.year} | {movie.genre}</p>
            <p className="mb-6 text-lg">{movie.description}</p>
            
            {/* User Actions */}
            <div className="flex flex-wrap gap-4 mb-8">
              <button 
                onClick={() => setCurrentVideo(movie)}
                className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition"
              >
                <FaPlay /> Watch Now
              </button>
              
              <button 
                onClick={handleToggleFavorite}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition ${
                  isFavorite ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}
              >
                <FaHeart /> {isFavorite ? 'In My List' : 'Add to My List'}
              </button>
            </div>

            {/* Admin Actions */}
            <div className="flex gap-4 border-t border-gray-700 pt-4 mt-4">
              <button 
                onClick={() => navigate(`/edit-movie/${movie.id}`)}
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium"
              >
                <FaEdit /> Edit
              </button>
              <button 
                onClick={handleDelete}
                className="flex items-center gap-2 text-red-500 hover:text-red-400 font-medium"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;