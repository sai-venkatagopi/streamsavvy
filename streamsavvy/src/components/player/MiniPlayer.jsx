import React from 'react';
import { usePlayer } from '../../context/PlayerContext';
import { FaTimes } from 'react-icons/fa';

const MiniPlayer = () => {
  const { currentVideo, setCurrentVideo } = usePlayer();

  if (!currentVideo) return null;

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-black rounded-lg shadow-2xl border border-gray-700 z-50 overflow-hidden animate-slide-up">
      <div className="relative aspect-video bg-gray-900 flex items-center justify-center">
        <button 
            onClick={() => setCurrentVideo(null)} 
            className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-red-600 z-10">
            <FaTimes size={12}/>
        </button>
        <img src={currentVideo.poster} className="w-full h-full object-cover opacity-50" />
        <div className="absolute font-bold text-white drop-shadow-md">Playing: {currentVideo.title}</div>
      </div>
    </div>
  );
};

export default MiniPlayer;