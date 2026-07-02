import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMovies } from '../services/movieService';
import MovieCard from '../components/movies/MovieCard';

const Home = () => {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    // Fetch movies and just take the first 4 as "Trending" for now
    getMovies().then(res => {
      setTrending(res.data.slice(0, 4));
    });
  }, []);

  return (
    <div className="pb-10">
      {/* Hero Banner */}
      <div 
        className="relative h-[70vh] w-full bg-cover bg-center flex items-center" 
        style={{ backgroundImage: "url('https://image.tmdb.org/t/p/original/9gk7admal4zl67YrxIo1IGseo9n.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        <div className="relative z-10 px-8 max-w-2xl">
          <h1 className="text-6xl font-extrabold text-white drop-shadow-lg mb-4">Inception</h1>
          <p className="text-gray-200 text-lg mb-6 drop-shadow-md">
            Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life.
          </p>
          <div className="flex gap-4">
            <Link to="/browse" className="bg-primary text-white px-8 py-3 rounded font-bold hover:bg-red-700 transition">
              Play Now
            </Link>
            <Link to="/movie/1" className="bg-gray-800/80 text-white px-8 py-3 rounded font-bold hover:bg-gray-700 transition">
              More Info
            </Link>
          </div>
        </div>
      </div>

      {/* Trending Section */}
      <div className="px-8 mt-10">
        <h2 className="text-2xl font-bold mb-6 border-l-4 border-primary pl-4 dark:text-white">Trending Now</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {trending.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;