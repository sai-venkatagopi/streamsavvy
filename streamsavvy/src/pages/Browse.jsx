import React, { useEffect, useState } from 'react';
import { getMovies } from '../services/movieService';
import MovieCard from '../components/movies/MovieCard';
import { useSearchParams } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce'; // <--- NEW IMPORT

const Browse = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const debouncedSearchTerm = useDebounce(query, 300); // <--- DEBOUNCE HOOK

  useEffect(() => {
    // 1. Fetch all movies initially
    getMovies().then(res => {
      setMovies(res.data);
      setLoading(false);
    }).catch(err => console.error("Error fetching movies:", err));
  }, []);

  useEffect(() => {
    // 2. Filter movies whenever the debounced search term changes
    let filtered = movies;

    if (debouncedSearchTerm) {
      filtered = movies.filter(m => 
        m.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        m.genre.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }
    setFilteredMovies(filtered);
  }, [debouncedSearchTerm, movies]);


  if (loading) return <div className="pt-24 text-center dark:text-white text-xl">Loading Entertainment Library...</div>;

  return (
    <div className="pt-24 pb-10 container mx-auto px-4 min-h-screen">
       <h2 className="text-3xl font-bold mb-6 text-primary border-l-4 pl-4">
         {query ? `Search Results for "${query}"` : 'Complete Library'}
       </h2>

       {/* Movie Grid */}
       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
         {filteredMovies.length > 0 ? (
            filteredMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))
         ) : (
            <div className="md:col-span-5 text-center text-lg py-10 dark:text-gray-400">
                No titles found matching your search.
            </div>
         )}
       </div>
    </div>
  );
};

export default Browse;