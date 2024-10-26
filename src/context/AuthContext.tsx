import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setState(prev => ({
        ...prev,
        user: JSON.parse(storedUser),
        isAuthenticated: true,
        isLoading: false,
      }));
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      // Simulate API call
      const mockUser: User = {
        id: '1',
        username: email.split('@')[0],
        email,
        role: 'user',
      };
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      setState(prev => ({
        ...prev,
        user: mockUser,
        isAuthenticated: true,
        error: null,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Échec de la connexion. Veuillez réessayer.',
      }));
      throw new Error('Échec de la connexion. Veuillez réessayer.');
    }
  };

  const register = async (username: string, email: string, password: string): Promise<void> => {
    try {
      // Simulate API call
      const mockUser: User = {
        id: '1',
        username,
        email,
        role: 'user',
      };
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      setState(prev => ({
        ...prev,
        user: mockUser,
        isAuthenticated: true,
        error: null,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: "Échec de l'inscription. Veuillez réessayer.",
      }));
      throw new Error("Échec de l'inscription. Veuillez réessayer.");
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}