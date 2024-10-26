import React, { createContext, useContext, useState, useEffect } from 'react';
import { Resource } from '../types/resource';
import { useAuth } from './AuthContext';
import { useNotifications } from './NotificationContext';

interface ResourceContextType {
  resources: Resource[];
  createResource: (data: Omit<Resource, 'id' | 'createdBy' | 'createdAt' | 'updatedAt'>) => void;
  updateResource: (id: string, data: Partial<Resource>) => void;
  deleteResource: (id: string) => void;
}

const ResourceContext = createContext<ResourceContextType | null>(null);

const RESOURCES_STORAGE_KEY = 'ticketflow_resources';

export function ResourceProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const [resources, setResources] = useState<Resource[]>(() => {
    const storedResources = localStorage.getItem(RESOURCES_STORAGE_KEY);
    return storedResources ? JSON.parse(storedResources) : [];
  });

  useEffect(() => {
    localStorage.setItem(RESOURCES_STORAGE_KEY, JSON.stringify(resources));
  }, [resources]);

  const createResource = (data: Omit<Resource, 'id' | 'createdBy' | 'createdAt' | 'updatedAt'>) => {
    const newResource: Resource = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdBy: user?.id || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setResources(prev => [...prev, newResource]);
    addNotification(
      'info',
      'Nouvelle ressource créée',
      `La ressource "${data.title}" a été créée avec succès.`,
      `/resources/${newResource.id}`
    );
  };

  const updateResource = (id: string, data: Partial<Resource>) => {
    setResources(prev =>
      prev.map(resource =>
        resource.id === id
          ? { ...resource, ...data, updatedAt: new Date().toISOString() }
          : resource
      )
    );

    const updatedResource = resources.find(r => r.id === id);
    if (updatedResource) {
      addNotification(
        'success',
        'Ressource mise à jour',
        `La ressource "${updatedResource.title}" a été mise à jour.`,
        `/resources/${id}`
      );
    }
  };

  const deleteResource = (id: string) => {
    const resourceToDelete = resources.find(r => r.id === id);
    setResources(prev => prev.filter(resource => resource.id !== id));
    
    if (resourceToDelete) {
      addNotification(
        'warning',
        'Ressource supprimée',
        `La ressource "${resourceToDelete.title}" a été supprimée.`
      );
    }
  };

  return (
    <ResourceContext.Provider value={{ resources, createResource, updateResource, deleteResource }}>
      {children}
    </ResourceContext.Provider>
  );
}

export function useResources() {
  const context = useContext(ResourceContext);
  if (!context) {
    throw new Error('useResources must be used within a ResourceProvider');
  }
  return context;
}