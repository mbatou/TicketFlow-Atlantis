export interface Brand {
  id: string;
  name: string;
  sector: string;
  website: string;
  primaryContact: {
    name: string;
    email: string;
    phone: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  role: 'admin' | 'user';
  avatar?: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  memberCount: number;
}

export interface AgencySettings {
  name: string;
  address: string;
  phone: string;
  email: string;
  language: 'fr' | 'en';
  timezone: string;
  notifications: {
    ticketUpdates: boolean;
    newBrands: boolean;
    teamChanges: boolean;
    comments: boolean;
  };
}