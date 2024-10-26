import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useTickets } from '../../context/TicketContext';

const COLORS = ['#3B82F6', '#FBBF24', '#8B5CF6', '#10B981'];

export default function TicketStatusChart() {
  const { tickets } = useTickets();

  const data = [
    { name: 'Nouveau', value: tickets.filter(t => t.status === 'nouveau').length },
    { name: 'En Cours', value: tickets.filter(t => t.status === 'en_cours').length },
    { name: 'En Revue', value: tickets.filter(t => t.status === 'en_revue').length },
    { name: 'Terminé', value: tickets.filter(t => t.status === 'terminé').length },
  ].filter(item => item.value > 0);

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