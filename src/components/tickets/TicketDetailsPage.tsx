import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTickets } from '../../context/TicketContext';
import TicketDetails from './TicketDetails';

export default function TicketDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tickets } = useTickets();

  const ticket = tickets.find((t) => t.id === id);

  if (!ticket) {
    return (
      <div className="bg-white shadow-sm rounded-lg p-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Ticket non trouvé</h2>
          <p className="mt-2 text-gray-600">Le ticket que vous recherchez n'existe pas.</p>
          <button
            onClick={() => navigate('/tickets')}
            className="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Retour à la liste des tickets
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <button
        onClick={() => navigate('/tickets')}
        className="mb-6 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Retour à la liste des tickets
      </button>
      <TicketDetails ticket={ticket} onClose={() => navigate('/tickets')} />
    </div>
  );
}