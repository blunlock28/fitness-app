import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userGoal, setUserGoal] = useState(null);
  const [userLevel, setUserLevel] = useState('beginner');
  const [userPreferences, setUserPreferences] = useState({});
  
  return (
    <UserContext.Provider value={{
      userGoal,
      setUserGoal,
      userLevel,
      setUserLevel,
      userPreferences,
      setUserPreferences
    }}>
      {children}
    </UserContext.Provider>
  );
}