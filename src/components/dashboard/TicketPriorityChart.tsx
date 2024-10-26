import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTickets } from '../../context/TicketContext';

export default function TicketPriorityChart() {
  const { tickets } = useTickets();

  const data = [
    { name: 'Basse', value: tickets.filter(t => t.priority === 'basse').length },
    { name: 'Moyenne', value: tickets.filter(t => t.priority === 'moyenne').length },
    { name: 'Haute', value: tickets.filter(t => t.priority === 'haute').length },
    { name: 'Urgente', value: tickets.filter(t => t.priority === 'urgente').length },
  ];

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#4F46E5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}