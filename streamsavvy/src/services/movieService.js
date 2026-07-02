import api from './api';

// --- Movie CRUD ---
export const getMovies = () => api.get('/movies');
export const getMovieById = (id) => api.get(`/movies/${id}`);
export const createMovie = (movieData) => api.post('/movies', movieData);
export const updateMovie = (id, movieData) => api.put(`/movies/${id}`, movieData);
export const deleteMovie = (id) => api.delete(`/movies/${id}`);

// --- Favorites Management ---
export const getFavorites = () => api.get('/favorites');
export const addFavorite = (favoriteData) => api.post('/favorites', favoriteData);
export const removeFavorite = (id) => api.delete(`/favorites/${id}`);