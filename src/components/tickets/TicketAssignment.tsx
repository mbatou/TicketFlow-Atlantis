import React, { useState } from 'react';
import { User, Users } from 'lucide-react';
import { useTickets } from '../../context/TicketContext';
import { useUsers } from '../../context/UserContext';
import { Ticket } from '../../types/ticket';

interface TicketAssignmentProps {
  ticket: Ticket;
}

export default function TicketAssignment({ ticket }: TicketAssignmentProps) {
  const { updateTicket } = useTickets();
  const { users } = useUsers();
  const [isAssigning, setIsAssigning] = useState(false);

  const assignedUser = users.find((user) => user.id === ticket.assignedTo);

  const handleAssign = (userId: string | null) => {
    updateTicket(ticket.id, { assignedTo: userId });
    setIsAssigning(false);
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <Users className="h-5 w-5 text-gray-400" />
        <span className="text-sm font-medium text-gray-700">Assigné à:</span>
      </div>
      
      {isAssigning ? (
        <select
          value={ticket.assignedTo || ''}
          onChange={(e) => handleAssign(e.target.value || null)}
          className="rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Non assigné</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
      ) : (
        <button
          onClick={() => setIsAssigning(true)}
          className="inline-flex items-center space-x-2 text-sm text-gray-500 hover:text-gray-700"
        >
          <User className="h-4 w-4" />
          <span>{assignedUser ? assignedUser.username : 'Non assigné'}</span>
        </button>
      )}
    </div>
  );
}