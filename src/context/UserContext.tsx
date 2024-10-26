import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/auth';

interface UserContextType {
  users: User[];
  addUser: (user: User) => void;
  updateUser: (id: string, data: Partial<User>) => void;
  deleteUser: (id: string) => void;
}

const UserContext = createContext<UserContextType | null>(null);

const USERS_STORAGE_KEY = 'ticketflow_users';

const initialUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    role: 'super_admin',
    department: 'marketing',
    brandIds: ['1', '2'], // Give access to both brands
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    username: 'manager',
    email: 'manager@example.com',
    role: 'admin',
    department: 'content',
    brandIds: ['1'], // Only Shell brand
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    username: 'user',
    email: 'user@example.com',
    role: 'user',
    department: 'design',
    brandIds: ['2'], // Only remix brand
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>(() => {
    const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    return storedUsers ? JSON.parse(storedUsers) : initialUsers;
  });

  useEffect(() => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  const addUser = (user: User) => {
    setUsers(prev => [...prev, user]);
  };

  const updateUser = (id: string, data: Partial<User>) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, ...data, updatedAt: new Date().toISOString() } : user
    ));
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  return (
    <UserContext.Provider value={{ users, addUser, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
}