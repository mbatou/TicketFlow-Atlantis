import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useTickets } from '../../context/TicketContext';

const COLORS = [
  '#3B82F6', '#EC4899', '#8B5CF6', '#EF4444', 
  '#10B981', '#6366F1', '#F59E0B', '#06B6D4',
  '#F97316', '#14B8A6', '#F43F5E', '#84CC16',
  '#6B7280'
];

const categoryLabels = {
  content_creation: 'Création de Contenu',
  graphic_design: 'Design Graphique',
  social_media: 'Médias Sociaux',
  digital_advertising: 'Publicité Digitale',
  seo: 'SEO',
  web_development: 'Développement Web',
  email_marketing: 'Email Marketing',
  market_research: 'Étude de Marché',
  brand_strategy: 'Stratégie de Marque',
  pr_outreach: 'Relations Publiques',
  video_production: 'Production Vidéo',
  data_analysis: 'Analyse de Données',
  project_management: 'Gestion de Projet',
};

export default function TicketCategoryChart() {
  const { tickets } = useTickets();

  const data = Object.entries(categoryLabels).map(([key, label]) => ({
    name: label,
    value: tickets.filter(t => t.category === key).length,
  })).filter(item => item.value > 0);

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}