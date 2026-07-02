import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa'; // Added hamburger icons
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext'; // <--- NEW IMPORT

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth(); // <--- USE AUTH HOOK
  const [term, setTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile state
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if(term.trim()) navigate(`/browse?q=${term}`);
  };

  return (
    <nav className="fixed w-full z-50 bg-white dark:bg-black/90 px-6 py-4 shadow-md flex justify-between items-center backdrop-blur-sm">
      <Link to="/" className="text-2xl font-bold text-primary">StreamSavvy</Link>
      
      {/* Desktop Links */}
      <div className="hidden md:flex gap-6 font-medium dark:text-gray-300">
        <Link to="/" className="hover:text-primary">Home</Link>
        <Link to="/browse" className="hover:text-primary">Browse</Link>
        <Link to="/mylist" className="hover:text-primary">My List</Link>
        {user && <Link to="/add" className="hover:text-primary">Add Movie</Link>} {/* Conditional */}
      </div>

      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center bg-gray-200 dark:bg-gray-800 rounded-full px-3 py-1">
          <FaSearch className="text-gray-500"/>
          <input 
            className="bg-transparent border-none focus:outline-none px-2 text-sm w-48 dark:text-white" 
            placeholder="Search..." 
            value={term}
            onChange={(e)=>setTerm(e.target.value)}
          />
        </form>
        
        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="text-xl dark:text-yellow-400 text-gray-600">
          {theme === 'dark' ? <FaSun/> : <FaMoon/>}
        </button>

        {/* Auth Button */}
        <div className="hidden md:block">
          {user ? (
            <div className="flex items-center space-x-2">
               <span className="text-sm dark:text-white">Hi, **{user.name}**</span>
               <button onClick={logout} className="text-sm bg-primary px-3 py-1 rounded text-white hover:bg-red-700">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="bg-primary text-white px-4 py-1.5 rounded hover:bg-red-700 transition">Sign In</Link>
          )}
        </div>
        
        {/* Mobile Toggle */}
        <button className="md:hidden text-2xl dark:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      
      {/* Mobile Menu (Overlay) */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-lg p-4 flex flex-col space-y-3">
           <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
           <Link to="/browse" onClick={() => setIsMenuOpen(false)}>Browse</Link>
           <Link to="/mylist" onClick={() => setIsMenuOpen(false)}>My List</Link>
           {user && <Link to="/add" onClick={() => setIsMenuOpen(false)}>Add Movie</Link>}
           <div className="pt-2 border-t border-gray-700">
             {user ? <button onClick={logout} className="w-full text-left">Logout</button> : <Link to="/login">Sign In</Link>}
           </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;