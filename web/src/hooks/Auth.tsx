import React, { useState, createContext, useContext, useCallback } from 'react';

import api from '../services/api';

interface User {
  avatar_url: string;
  id: string;
  name: string;
}

interface AuthContextInterface {
  user: User;
  signIn({ email, password }: SignInInterface): Promise<void>;
  signOut(): void;
}

interface SignInInterface {
  email: string;
  password: string;
}

interface AuthState {
  token: string;
  user: User;
}

const AuthContext = createContext<AuthContextInterface>(
  {} as AuthContextInterface,
);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const user = localStorage.getItem('@GoBarber:user');
    const token = localStorage.getItem('@GoBarber:token');

    if (user && token) {
      return {
        token,
        user: JSON.parse(user),
      };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }: SignInInterface) => {
    const response = await api.post('/sessions', { email, password });

    const { token, user } = response.data;

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));
    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:user');
    localStorage.removeItem('@GoBarber:token');
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextInterface {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
