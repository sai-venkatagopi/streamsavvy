import React, { useEffect, useState } from 'react';
import { getFavorites, getMovieById } from '../services/movieService';
import MovieCard from '../components/movies/MovieCard';
import { toast } from 'react-toastify';
import { FaHeart } from 'react-icons/fa';

const MyList = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      // 1. Get the list of favorite entries
      const favRes = await getFavorites();
      const favoriteEntries = favRes.data;

      if (favoriteEntries.length > 0) {
        // 2. Fetch the full movie data for each favorite entry
        // We use Promise.all to fetch them all in parallel
        const moviePromises = favoriteEntries.map(entry => getMovieById(entry.movieId));
        const movieResults = await Promise.all(moviePromises);
        
        // 3. Extract the movie data
        const movies = movieResults.map(res => res.data);
        setFavoriteMovies(movies);
      } else {
        setFavoriteMovies([]);
      }
      
    } catch (error) {
      console.error(error);
      toast.error("Could not load My List.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="pt-24 text-center dark:text-white text-xl">Loading My List...</div>;

  return (
    <div className="pt-24 pb-10 container mx-auto px-4 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-primary border-l-4 pl-4 flex items-center gap-3">
        <FaHeart className="text-red-500"/> My Favorites List
      </h2>

      {favoriteMovies.length === 0 ? (
        <div className="text-center py-20 dark:text-gray-400 text-lg">
          Your list is empty! Go to "Browse" to add movies.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {favoriteMovies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      )}
    </div>
  );
};

export default MyList;