import React from 'react';
import { TicketPriority } from '../../types/ticket';

const priorityConfig: Record<TicketPriority, { label: string; className: string }> = {
  basse: {
    label: 'Basse',
    className: 'bg-gray-100 text-gray-800',
  },
  moyenne: {
    label: 'Moyenne',
    className: 'bg-blue-100 text-blue-800',
  },
  haute: {
    label: 'Haute',
    className: 'bg-orange-100 text-orange-800',
  },
  urgente: {
    label: 'Urgente',
    className: 'bg-red-100 text-red-800',
  },
};

interface TicketPriorityBadgeProps {
  priority: TicketPriority;
}

export default function TicketPriorityBadge({ priority }: TicketPriorityBadgeProps) {
  const config = priorityConfig[priority];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
}