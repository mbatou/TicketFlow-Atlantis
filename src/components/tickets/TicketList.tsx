import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { useTickets } from '../../context/TicketContext';
import { useBrands } from '../../context/BrandContext';
import { TicketStatus, TicketPriority, TicketCategory } from '../../types/ticket';
import TicketStatusBadge from './TicketStatusBadge';
import TicketPriorityBadge from './TicketPriorityBadge';
import TicketCategoryBadge from './TicketCategoryBadge';

export default function TicketList() {
  const navigate = useNavigate();
  const { tickets, updateTicket } = useTickets();
  const { brands } = useBrands();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<TicketStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<TicketPriority | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<TicketCategory | 'all'>('all');
  const [brandFilter, setBrandFilter] = useState<string | 'all'>('all');

  const filteredTickets = tickets.filter(ticket => {
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || ticket.category === categoryFilter;
    const matchesBrand = brandFilter === 'all' || ticket.brandId === brandFilter;
    const matchesSearch = searchQuery === '' || 
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesPriority && matchesCategory && matchesBrand && matchesSearch;
  });

  const handleStatusChange = (ticketId: string, newStatus: TicketStatus) => {
    updateTicket(ticketId, { status: newStatus });
  };

  const handlePriorityChange = (ticketId: string, newPriority: TicketPriority) => {
    updateTicket(ticketId, { priority: newPriority });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Tickets</h3>
        <div className="mt-3 sm:mt-0 sm:ml-4 flex flex-wrap gap-2">
          <select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            className="rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="all">Toutes les marques</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as TicketCategory | 'all')}
            className="rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="all">Toutes les catégories</option>
            <option value="content_creation">Création de Contenu</option>
            <option value="graphic_design">Design Graphique</option>
            <option value="social_media">Médias Sociaux</option>
            <option value="digital_advertising">Publicité Digitale</option>
            <option value="seo">SEO</option>
            <option value="web_development">Développement Web</option>
            <option value="email_marketing">Email Marketing</option>
            <option value="market_research">Étude de Marché</option>
            <option value="brand_strategy">Stratégie de Marque</option>
            <option value="pr_outreach">Relations Publiques</option>
            <option value="video_production">Production Vidéo</option>
            <option value="data_analysis">Analyse de Données</option>
            <option value="project_management">Gestion de Projet</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as TicketStatus | 'all')}
            className="rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="nouveau">Nouveau</option>
            <option value="en_cours">En cours</option>
            <option value="en_revue">En revue</option>
            <option value="terminé">Terminé</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as TicketPriority | 'all')}
            className="rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="all">Toutes les priorités</option>
            <option value="basse">Basse</option>
            <option value="moyenne">Moyenne</option>
            <option value="haute">Haute</option>
            <option value="urgente">Urgente</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Titre
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Marque
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Catégorie
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priorité
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTickets.map((ticket) => (
              <tr
                key={ticket.id}
                className="hover:bg-gray-50 cursor-pointer"
              >
                <td 
                  className="px-6 py-4 whitespace-nowrap"
                  onClick={() => navigate(`/tickets/${ticket.id}`)}
                >
                  <div className="text-sm font-medium text-gray-900">{ticket.title}</div>
                  <div className="text-sm text-gray-500">{ticket.description}</div>
                </td>
                <td 
                  className="px-6 py-4 whitespace-nowrap"
                  onClick={() => navigate(`/tickets/${ticket.id}`)}
                >
                  <div className="text-sm text-gray-900">
                    {brands.find(b => b.id === ticket.brandId)?.name || 'N/A'}
                  </div>
                </td>
                <td 
                  className="px-6 py-4 whitespace-nowrap"
                  onClick={() => navigate(`/tickets/${ticket.id}`)}
                >
                  <TicketCategoryBadge category={ticket.category} type={ticket.type} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={ticket.status}
                    onChange={(e) => handleStatusChange(ticket.id, e.target.value as TicketStatus)}
                    onClick={(e) => e.stopPropagation()}
                    className="rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="nouveau">Nouveau</option>
                    <option value="en_cours">En cours</option>
                    <option value="en_revue">En revue</option>
                    <option value="terminé">Terminé</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={ticket.priority}
                    onChange={(e) => handlePriorityChange(ticket.id, e.target.value as TicketPriority)}
                    onClick={(e) => e.stopPropagation()}
                    className="rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="basse">Basse</option>
                    <option value="moyenne">Moyenne</option>
                    <option value="haute">Haute</option>
                    <option value="urgente">Urgente</option>
                  </select>
                </td>
                <td 
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  onClick={() => navigate(`/tickets/${ticket.id}`)}
                >
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}