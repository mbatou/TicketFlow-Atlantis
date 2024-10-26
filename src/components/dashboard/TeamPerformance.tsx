import React from 'react';
import { useTickets } from '../../context/TicketContext';
import { useUsers } from '../../context/UserContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function TeamPerformance() {
  const { tickets } = useTickets();
  const { users } = useUsers();

  const getUserPerformance = (userId: string) => {
    const userTickets = tickets.filter(t => t.assignedTo === userId);
    const completedTickets = userTickets.filter(t => t.status === 'terminé');
    
    return {
      total: userTickets.length,
      completed: completedTickets.length,
      performance: userTickets.length > 0
        ? Math.round((completedTickets.length / userTickets.length) * 100)
        : 0,
    };
  };

  const data = users.map(user => ({
    name: user.username,
    performance: getUserPerformance(user.id).performance,
  }));

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="performance" stroke="#4F46E5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}