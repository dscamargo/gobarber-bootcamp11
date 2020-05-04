import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useCallback,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface AuthContextInterface {
  user: object;
  signIn({ email, password }: SignInInterface): Promise<void>;
  signOut(): void;
  loading: boolean;
}

interface SignInInterface {
  email: string;
  password: string;
}

interface AuthState {
  token: string;
  user: object;
}

const AuthContext = createContext<AuthContextInterface>(
  {} as AuthContextInterface,
);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [user, token] = await AsyncStorage.multiGet([
        '@GoBarber:user',
        '@GoBarber:token',
      ]);

      if (token[1] && user[1]) {
        setData({ user: JSON.parse(user[1]), token: token[1] });
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, password }: SignInInterface) => {
    const response = await api.post('/sessions', { email, password });

    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ['@GoBarber:token', token],
      ['@GoBarber:user', JSON.stringify(user)],
    ]);

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:user', '@GoBarber:token']);
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ loading, user: data.user, signIn, signOut }}>
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
