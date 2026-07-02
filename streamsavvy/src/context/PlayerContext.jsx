import React, { createContext, useContext, useState } from 'react';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentVideo, setCurrentVideo] = useState(null);

  return (
    <PlayerContext.Provider value={{ currentVideo, setCurrentVideo }}>
      {children}
    </PlayerContext.Provider>
  );
};
export const usePlayer = () => useContext(PlayerContext);