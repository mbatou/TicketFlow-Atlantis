import React, { useState } from 'react';
import { Clock, MessageSquare, User, Edit2, Save, X, AlertCircle, Tag } from 'lucide-react';
import { useTickets } from '../../context/TicketContext';
import { useAuth } from '../../context/AuthContext';
import { useBrands } from '../../context/BrandContext';
import { Ticket, TicketStatus, TicketPriority } from '../../types/ticket';
import TicketStatusBadge from './TicketStatusBadge';
import TicketPriorityBadge from './TicketPriorityBadge';
import TicketCategoryBadge from './TicketCategoryBadge';
import TicketComments from './TicketComments';
import TicketAssignment from './TicketAssignment';

interface TicketDetailsProps {
  ticket: Ticket;
  onClose: () => void;
}

export default function TicketDetails({ ticket, onClose }: TicketDetailsProps) {
  const { updateTicket } = useTickets();
  const { user } = useAuth();
  const { brands } = useBrands();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTicket, setEditedTicket] = useState(ticket);

  const handleSave = () => {
    updateTicket(ticket.id, editedTicket);
    setIsEditing(false);
  };

  const handleStatusChange = (newStatus: TicketStatus) => {
    if (isEditing) {
      setEditedTicket({ ...editedTicket, status: newStatus });
    } else {
      updateTicket(ticket.id, { status: newStatus });
    }
  };

  const handlePriorityChange = (newPriority: TicketPriority) => {
    if (isEditing) {
      setEditedTicket({ ...editedTicket, priority: newPriority });
    } else {
      updateTicket(ticket.id, { priority: newPriority });
    }
  };

  const canEdit = user?.id === ticket.createdBy || user?.role === 'admin';

  const calculateSLA = () => {
    const created = new Date(ticket.createdAt).getTime();
    const now = new Date().getTime();
    const elapsed = Math.floor((now - created) / (1000 * 60 * 60)); // hours
    const slaLimit = ticket.priority === 'urgente' ? 24 : 
                    ticket.priority === 'haute' ? 48 : 
                    ticket.priority === 'moyenne' ? 72 : 96;
    
    return {
      elapsed,
      limit: slaLimit,
      status: ticket.status === 'terminé' ? 'completed' :
              elapsed > slaLimit ? 'overdue' : 'active'
    };
  };

  const sla = calculateSLA();

  const formatTimeElapsed = () => {
    const hours = sla.elapsed;
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    return remainingHours > 0 ? `${days}j ${remainingHours}h` : `${days}j`;
  };

  const getSLAColor = () => {
    if (sla.status === 'completed') return 'bg-green-100 text-green-800';
    if (sla.status === 'overdue') return 'bg-red-100 text-red-800';
    if (sla.elapsed > (sla.limit * 0.75)) return 'bg-yellow-100 text-yellow-800';
    return 'bg-blue-100 text-blue-800';
  };

  const brand = brands.find(b => b.id === ticket.brandId);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          {isEditing ? (
            <input
              type="text"
              value={editedTicket.title}
              onChange={(e) => setEditedTicket({ ...editedTicket, title: e.target.value })}
              className="text-xl font-semibold text-gray-900 bg-white border-b border-gray-300 focus:border-indigo-500 focus:ring-0"
            />
          ) : (
            <h2 className="text-xl font-semibold text-gray-900">{ticket.title}</h2>
          )}
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {new Date(ticket.createdAt).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              {ticket.createdBy}
            </div>
            {brand && (
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-1" />
                {brand.name}
              </div>
            )}
          </div>
        </div>
        {canEdit && (
          <div className="flex space-x-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                >
                  <Save className="h-4 w-4 mr-1" />
                  Sauvegarder
                </button>
                <button
                  onClick={() => {
                    setEditedTicket(ticket);
                    setIsEditing(false);
                  }}
                  className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <X className="h-4 w-4 mr-1" />
                  Annuler
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <Edit2 className="h-4 w-4 mr-1" />
                Modifier
              </button>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-4">
        <TicketCategoryBadge category={ticket.category} type={ticket.type} />
        
        <div className="flex items-center">
          <select
            value={isEditing ? editedTicket.status : ticket.status}
            onChange={(e) => handleStatusChange(e.target.value as TicketStatus)}
            className="rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="nouveau">Nouveau</option>
            <option value="en_cours">En cours</option>
            <option value="en_revue">En revue</option>
            <option value="terminé">Terminé</option>
          </select>
        </div>

        <div className="flex items-center">
          <select
            value={isEditing ? editedTicket.priority : ticket.priority}
            onChange={(e) => handlePriorityChange(e.target.value as TicketPriority)}
            className="rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="basse">Basse</option>
            <option value="moyenne">Moyenne</option>
            <option value="haute">Haute</option>
            <option value="urgente">Urgente</option>
          </select>
        </div>
        
        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSLAColor()}`}>
          <AlertCircle className="h-4 w-4 mr-1" />
          {sla.status === 'completed' 
            ? 'Résolu'
            : sla.status === 'overdue'
            ? `Dépassé de ${formatTimeElapsed()}`
            : `${formatTimeElapsed()} / ${sla.limit}h`}
        </div>
      </div>

      <div className="prose max-w-none">
        {isEditing ? (
          <textarea
            value={editedTicket.description}
            onChange={(e) => setEditedTicket({ ...editedTicket, description: e.target.value })}
            rows={4}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        ) : (
          <p className="text-gray-700">{ticket.description}</p>
        )}
      </div>

      <TicketAssignment ticket={ticket} />
      <TicketComments ticketId={ticket.id} />
    </div>
  );
}