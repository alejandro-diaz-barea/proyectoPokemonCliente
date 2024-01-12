import { createContext, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setLoggedIn(true);
    setUser(userData);
  };

  const logout = () => {
    setLoggedIn(false);
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ loggedIn, user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
