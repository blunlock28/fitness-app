import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const signIn = async (credentials) => {
    // Aquí iría la lógica de autenticación con tu backend
    setIsLoading(true);
    // Simulación de login
    setTimeout(() => {
      setUserToken('dummy-token');
      AsyncStorage.setItem('userToken', 'dummy-token');
      setIsLoading(false);
    }, 1000);
  };

  const signUp = async (userData) => {
    // Aquí iría la lógica de registro con tu backend
    setIsLoading(true);
    // Simulación de registro
    setTimeout(() => {
      setUserToken('dummy-token');
      AsyncStorage.setItem('userToken', 'dummy-token');
      setIsLoading(false);
    }, 1000);
  };

  const signOut = async () => {
    setIsLoading(true);
    setUserToken(null);
    await AsyncStorage.removeItem('userToken');
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let token = await AsyncStorage.getItem('userToken');
      setUserToken(token);
      setIsLoading(false);
    } catch (e) {
      console.log(`isLoggedIn error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        signOut,
        isLoading,
        userToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};