export type UserRole = 'super_admin' | 'admin' | 'user';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  department: string;
  brandIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface Department {
  id: string;
  name: string;
  description: string;
}

export const departments: Department[] = [
  { id: 'marketing', name: 'Marketing Digital', description: 'Équipe marketing digital' },
  { id: 'content', name: 'Création de Contenu', description: 'Équipe de création de contenu' },
  { id: 'design', name: 'Design', description: 'Équipe design' },
  { id: 'development', name: 'Développement', description: 'Équipe développement' },
  { id: 'seo', name: 'SEO', description: 'Équipe SEO' },
  { id: 'social', name: 'Social Media', description: 'Équipe social media' },
];