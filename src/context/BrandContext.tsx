import React, { createContext, useContext, useState, useEffect } from 'react';
import { Brand } from '../types/brand';
import { useNotifications } from './NotificationContext';

interface BrandContextType {
  brands: Brand[];
  addBrand: (brandData: Omit<Brand, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateBrand: (id: string, data: Partial<Brand>) => void;
  deleteBrand: (id: string) => void;
}

const BrandContext = createContext<BrandContextType | null>(null);

const BRANDS_STORAGE_KEY = 'ticketflow_brands';

// Initial brands if none exist in storage
const initialBrands: Brand[] = [
  {
    id: '1',
    name: 'Shell',
    sector: 'retail',
    website: 'www.upopp.net',
    description: 'this is a brand',
    primaryContact: {
      name: 'Georges Charles',
      email: 'georgesmbatoucharles@gmail.com',
      phone: '+221 076675261',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'remix',
    sector: 'technology',
    website: 'www.upopp.net',
    description: 'rapport remix',
    primaryContact: {
      name: 'Georges Charles',
      email: 'georgesmbatoucharles@gmail.com',
      phone: '+221 076675261',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function BrandProvider({ children }: { children: React.ReactNode }) {
  const [brands, setBrands] = useState<Brand[]>(() => {
    const storedBrands = localStorage.getItem(BRANDS_STORAGE_KEY);
    return storedBrands ? JSON.parse(storedBrands) : initialBrands;
  });
  
  const { addNotification } = useNotifications();

  useEffect(() => {
    localStorage.setItem(BRANDS_STORAGE_KEY, JSON.stringify(brands));
  }, [brands]);

  const addBrand = (brandData: Omit<Brand, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newBrand: Brand = {
      ...brandData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setBrands(prev => [...prev, newBrand]);

    addNotification(
      'brand',
      'Nouvelle marque ajoutée',
      `La marque ${newBrand.name} a été ajoutée à la plateforme`,
      '/settings'
    );
  };

  const updateBrand = (id: string, data: Partial<Brand>) => {
    setBrands(prev => prev.map(brand => {
      if (brand.id === id) {
        const updatedBrand = {
          ...brand,
          ...data,
          updatedAt: new Date().toISOString(),
        };

        addNotification(
          'brand',
          'Marque mise à jour',
          `Les informations de ${brand.name} ont été mises à jour`,
          '/settings'
        );

        return updatedBrand;
      }
      return brand;
    }));
  };

  const deleteBrand = (id: string) => {
    const brand = brands.find(b => b.id === id);
    if (brand) {
      setBrands(prev => prev.filter(b => b.id !== id));
      addNotification(
        'brand',
        'Marque supprimée',
        `La marque ${brand.name} a été supprimée`,
        '/settings'
      );
    }
  };

  return (
    <BrandContext.Provider value={{ brands, addBrand, updateBrand, deleteBrand }}>
      {children}
    </BrandContext.Provider>
  );
}

export function useBrands() {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error('useBrands must be used within a BrandProvider');
  }
  return context;
}