import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '../config'; // Archivo de configuración

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  // Inicializar axios instance con interceptors
  const authAxios = axios.create({
    baseURL: API_URL,
  });

  authAxios.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 401) {
        signOut();
      }
      return Promise.reject(error);
    }
  );

  const signIn = async (credentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await authAxios.post('/auth/login', credentials);
      
      // Guardar token y datos de usuario
      await AsyncStorage.multiSet([
        ['userToken', data.token],
        ['userInfo', JSON.stringify(data.user)]
      ]);
      
      setUserToken(data.token);
      setUserInfo(data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Error de autenticación');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (userData) => {
    setIsLoading(true);
    try {
      const { data } = await authAxios.post('/auth/register', userData);
      
      await AsyncStorage.multiSet([
        ['userToken', data.token],
        ['userInfo', JSON.stringify(data.user)]
      ]);
      
      setUserToken(data.token);
      setUserInfo(data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Error de registro');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await authAxios.post('/auth/logout', {}, {
        headers: { Authorization: `Bearer ${userToken}` }
      });
    } catch (err) {
      console.warn('Logout error:', err);
    } finally {
      await AsyncStorage.multiRemove(['userToken', 'userInfo']);
      setUserToken(null);
      setUserInfo(null);
      setIsLoading(false);
    }
  };

  const loadUserData = useCallback(async () => {
    try {
      const [token, user] = await AsyncStorage.multiGet(['userToken', 'userInfo']);
      
      if (token[1] && user[1]) {
        setUserToken(token[1]);
        setUserInfo(JSON.parse(user[1]));
      }
    } catch (err) {
      console.warn('Failed to load user data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  return (
    <AuthContext.Provider
      value={{
        userToken,
        userInfo,
        isLoading,
        error,
        signIn,
        signUp,
        signOut,
        authAxios, // axios instance configurada
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};