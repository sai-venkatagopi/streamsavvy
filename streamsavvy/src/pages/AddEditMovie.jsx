import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createMovie, getMovieById, updateMovie } from '../services/movieService';
import { toast } from 'react-toastify';

const AddEditMovie = () => {
  const { id } = useParams(); // Check if we are editing
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ 
    title: '', genre: '', year: '', poster: '', description: '', isFavorite: false 
  });

  // Effect to load data if editing
  useEffect(() => {
    if (id) {
      setLoading(true);
      getMovieById(id).then(res => {
        setForm(res.data);
        setLoading(false);
      }).catch(() => {
        toast.error("Movie not found.");
        navigate('/browse');
      });
    }
  }, [id, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // UPDATE logic
        await updateMovie(id, form);
        toast.success(`'${form.title}' Updated!`);
      } else {
        // CREATE logic
        await createMovie({ ...form, id: Date.now() }); // Use Date.now() for unique ID for JSON-Server
        toast.success(`'${form.title}' Added!`);
      }
      navigate('/browse');
    } catch (error) {
      toast.error('Operation Failed. Check JSON-Server status.');
    }
  };
  
  if (id && loading) return <div className="pt-24 text-center dark:text-white">Loading Movie Data...</div>;

  return (
    <div className="pt-24 container mx-auto px-4 flex justify-center">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg h-fit">
        <h2 className="text-3xl font-bold mb-6 text-primary">{id ? 'Edit Movie' : 'Add New Movie'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required className="w-full p-3 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
          <input name="genre" value={form.genre} onChange={handleChange} placeholder="Genre" required className="w-full p-3 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
          <input name="year" type="number" name="year" value={form.year} onChange={handleChange} placeholder="Year" required className="w-full p-3 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
          <input name="poster" value={form.poster} onChange={handleChange} placeholder="Poster URL" required className="w-full p-3 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" rows="4" className="w-full p-3 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"></textarea>
          
          <button type="submit" className="w-full bg-primary text-white py-3 rounded hover:bg-red-700 font-bold">
            {id ? 'Update Movie' : 'Create Movie'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEditMovie;