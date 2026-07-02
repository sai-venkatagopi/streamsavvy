import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Contexts
import { ThemeProvider } from './context/ThemeContext';
import { PlayerProvider } from './context/PlayerContext';
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/layout/Navbar';
import MiniPlayer from './components/player/MiniPlayer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import Home from './pages/Home';
import Browse from './pages/Browse';
import MovieDetails from './pages/MovieDetails';
import AddEditMovie from './pages/AddEditMovie';
import Login from './pages/Login';
import MyList from './pages/MyList'; // <--- IMPORT MYLIST

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PlayerProvider>
          <BrowserRouter>
            <div className="min-h-screen font-sans bg-gray-100 dark:bg-dark text-gray-900 dark:text-white transition-colors duration-300">
              
              <Navbar />
              
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
                <Route path="/add" element={<AddEditMovie />} />
                <Route path="/edit-movie/:id" element={<AddEditMovie />} />
                <Route path="/login" element={<Login />} />
                
                {/* MYLIST ROUTE UPDATED */}
                <Route path="/mylist" element={<MyList />} /> 
              </Routes>

              <MiniPlayer />
              <ToastContainer position="bottom-right" theme="dark" />
            </div>
          </BrowserRouter>
        </PlayerProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;