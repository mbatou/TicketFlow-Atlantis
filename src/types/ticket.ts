// Previous ticket types remain the same...

export interface TicketAttachment {
  id: string;
  ticketId: string;
  type: 'image' | 'video';
  url: string;
  name: string;
  size: number;
  createdAt: string;
}

export interface Ticket {
  id: string;
  brandId: string;  // Add brandId
  title: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  category: TicketCategory;
  type: TicketType[TicketCategory];
  assignedTo: string | null;
  createdBy: string;
  attachments: TicketAttachment[];  // Add attachments
  createdAt: string;
  updatedAt: string;
}