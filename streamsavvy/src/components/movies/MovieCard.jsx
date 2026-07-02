import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import { usePlayer } from '../../context/PlayerContext';

const MovieCard = ({ movie }) => {
  const { setCurrentVideo } = usePlayer();

  return (
    <div className="group relative bg-gray-800 rounded-lg overflow-hidden transition-transform hover:scale-105 duration-300 shadow-lg">
      <img src={movie.poster} alt={movie.title} className="w-full h-64 object-cover" />
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center transition-opacity p-4 text-center">
        <h3 className="font-bold text-white text-lg">{movie.title}</h3>
        <p className="text-gray-300 text-sm mb-3">{movie.genre} • {movie.year}</p>
        <div className="flex gap-2">
            <button onClick={() => setCurrentVideo(movie)} className="bg-primary text-white p-3 rounded-full hover:bg-red-700">
                <FaPlay size={14} />
            </button>
            <Link to={`/movie/${movie.id}`} className="bg-gray-600 text-white px-4 py-2 rounded text-sm hover:bg-gray-500">
                Details
            </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;