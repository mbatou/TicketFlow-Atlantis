import React, { createContext, useContext, useState, useEffect } from 'react';
import { Ticket } from '../types/ticket';
import { useAuth } from './AuthContext';
import { useNotifications } from './NotificationContext';

interface TicketContextType {
  tickets: Ticket[];
  createTicket: (data: Omit<Ticket, 'id' | 'createdBy' | 'createdAt' | 'updatedAt'>) => void;
  updateTicket: (id: string, data: Partial<Ticket>) => void;
  deleteTicket: (id: string) => void;
}

const TicketContext = createContext<TicketContextType | null>(null);

const TICKETS_STORAGE_KEY = 'ticketflow_tickets';

export function TicketProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const [tickets, setTickets] = useState<Ticket[]>(() => {
    const storedTickets = localStorage.getItem(TICKETS_STORAGE_KEY);
    return storedTickets ? JSON.parse(storedTickets) : [];
  });

  useEffect(() => {
    localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(tickets));
  }, [tickets]);

  const createTicket = (data: Omit<Ticket, 'id' | 'createdBy' | 'createdAt' | 'updatedAt'>) => {
    const newTicket: Ticket = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdBy: user?.id || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTickets(prev => [...prev, newTicket]);
    addNotification(
      'info',
      'Nouveau ticket créé',
      `Le ticket "${data.title}" a été créé avec succès.`,
      `/tickets/${newTicket.id}`
    );
  };

  const updateTicket = (id: string, data: Partial<Ticket>) => {
    setTickets(prev =>
      prev.map(ticket =>
        ticket.id === id
          ? { ...ticket, ...data, updatedAt: new Date().toISOString() }
          : ticket
      )
    );

    const updatedTicket = tickets.find(t => t.id === id);
    if (updatedTicket) {
      addNotification(
        'success',
        'Ticket mis à jour',
        `Le ticket "${updatedTicket.title}" a été mis à jour.`,
        `/tickets/${id}`
      );
    }
  };

  const deleteTicket = (id: string) => {
    const ticketToDelete = tickets.find(t => t.id === id);
    setTickets(prev => prev.filter(ticket => ticket.id !== id));
    
    if (ticketToDelete) {
      addNotification(
        'warning',
        'Ticket supprimé',
        `Le ticket "${ticketToDelete.title}" a été supprimé.`
      );
    }
  };

  return (
    <TicketContext.Provider value={{ tickets, createTicket, updateTicket, deleteTicket }}>
      {children}
    </TicketContext.Provider>
  );
}

export function useTickets() {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTickets must be used within a TicketProvider');
  }
  return context;
}