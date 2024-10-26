export interface Brand {
  id: string;
  name: string;
  sector: string;
  website: string;
  description: string;
  logo?: string;
  primaryContact: {
    name: string;
    email: string;
    phone: string;
  };
  createdAt: string;
  updatedAt: string;
}

export const sectors = [
  { id: 'technology', name: 'Technologie' },
  { id: 'retail', name: 'Commerce de détail' },
  { id: 'healthcare', name: 'Santé' },
  { id: 'finance', name: 'Finance' },
  { id: 'education', name: 'Éducation' },
  { id: 'entertainment', name: 'Divertissement' },
  { id: 'food', name: 'Alimentation' },
  { id: 'automotive', name: 'Automobile' },
  { id: 'real_estate', name: 'Immobilier' },
  { id: 'travel', name: 'Voyage' },
  { id: 'fashion', name: 'Mode' },
  { id: 'sports', name: 'Sport' },
];