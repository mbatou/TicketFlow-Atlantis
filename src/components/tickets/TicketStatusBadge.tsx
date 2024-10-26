import React from 'react';
import { TicketStatus } from '../../types/ticket';

const statusConfig: Record<TicketStatus, { label: string; className: string }> = {
  nouveau: {
    label: 'Nouveau',
    className: 'bg-blue-100 text-blue-800',
  },
  en_cours: {
    label: 'En cours',
    className: 'bg-yellow-100 text-yellow-800',
  },
  en_revue: {
    label: 'En revue',
    className: 'bg-purple-100 text-purple-800',
  },
  terminé: {
    label: 'Terminé',
    className: 'bg-green-100 text-green-800',
  },
};

interface TicketStatusBadgeProps {
  status: TicketStatus;
}

export default function TicketStatusBadge({ status }: TicketStatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
}