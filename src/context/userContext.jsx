import { createContext, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const pikachuPhotos = [
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/10080.png',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/10081.png',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/10083.png',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/10085.png',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/10084.png',
  ];

  const login = (userData) => {
    setLoggedIn(true);
    setUser({
      ...userData,
      pikachuPhoto: pikachuPhotos[0], // Tomamos la primera foto como predeterminada
    });
  };

  const logout = () => {
    setLoggedIn(false);
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ loggedIn, user, login, logout, setUser, pikachuPhotos }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
