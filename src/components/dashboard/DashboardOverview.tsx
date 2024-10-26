import React, { useState } from 'react';
import { useTickets } from '../../context/TicketContext';
import { Clock, CheckCircle, AlertCircle, Users, Plus } from 'lucide-react';
import StatCard from './StatCard';
import TicketStatusChart from './TicketStatusChart';
import TicketPriorityChart from './TicketPriorityChart';
import TicketCategoryChart from './TicketCategoryChart';
import RecentActivity from './RecentActivity';
import TeamPerformance from './TeamPerformance';
import CreateTicketForm from '../tickets/CreateTicketForm';
import Modal from '../shared/Modal';

export default function DashboardOverview() {
  const { tickets } = useTickets();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Calculate current period stats (last 7 days)
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

  // Current period tickets
  const currentPeriodTickets = tickets.filter(ticket => 
    new Date(ticket.createdAt) >= sevenDaysAgo
  );

  // Previous period tickets (7-14 days ago)
  const previousPeriodTickets = tickets.filter(ticket => 
    new Date(ticket.createdAt) >= fourteenDaysAgo &&
    new Date(ticket.createdAt) < sevenDaysAgo
  );

  // Calculate trends
  const calculateTrend = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
  };

  // Calculate resolution time trends
  const calculateResolutionTimeTrend = () => {
    const currentResolutionTimes = currentPeriodTickets
      .filter(t => t.status === 'terminé')
      .map(ticket => {
        const created = new Date(ticket.createdAt).getTime();
        const updated = new Date(ticket.updatedAt).getTime();
        return (updated - created) / (1000 * 60 * 60 * 24); // Convert to days
      });

    const previousResolutionTimes = previousPeriodTickets
      .filter(t => t.status === 'terminé')
      .map(ticket => {
        const created = new Date(ticket.createdAt).getTime();
        const updated = new Date(ticket.updatedAt).getTime();
        return (updated - created) / (1000 * 60 * 60 * 24); // Convert to days
      });

    const currentAvg = currentResolutionTimes.length > 0 
      ? currentResolutionTimes.reduce((a, b) => a + b, 0) / currentResolutionTimes.length 
      : 0;
    const previousAvg = previousResolutionTimes.length > 0
      ? previousResolutionTimes.reduce((a, b) => a + b, 0) / previousResolutionTimes.length
      : 0;

    const difference = Math.round(previousAvg - currentAvg);
    return {
      current: Math.round(currentAvg),
      trend: difference,
      direction: difference > 0 ? 'down' : 'up'
    };
  };

  const stats = {
    total: {
      current: currentPeriodTickets.length,
      previous: previousPeriodTickets.length,
      get trend() {
        return calculateTrend(this.current, this.previous);
      },
      get direction() {
        return this.trend >= 0 ? 'up' : 'down';
      }
    },
    open: {
      current: currentPeriodTickets.filter(t => t.status !== 'terminé').length,
      previous: previousPeriodTickets.filter(t => t.status !== 'terminé').length,
      get trend() {
        return calculateTrend(this.current, this.previous);
      },
      get direction() {
        return this.trend <= 0 ? 'down' : 'up';
      }
    },
    completed: {
      current: currentPeriodTickets.filter(t => t.status === 'terminé').length,
      previous: previousPeriodTickets.filter(t => t.status === 'terminé').length,
      get trend() {
        return calculateTrend(this.current, this.previous);
      },
      get direction() {
        return this.trend >= 0 ? 'up' : 'down';
      }
    },
    resolution: calculateResolutionTimeTrend()
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Créer un nouveau ticket
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Tickets Totaux"
          value={stats.total.current}
          icon={<Clock className="h-6 w-6 text-blue-600" />}
          trend={`${stats.total.trend > 0 ? '+' : ''}${stats.total.trend}%`}
          trendDirection={stats.total.direction}
        />
        <StatCard
          title="Tickets Ouverts"
          value={stats.open.current}
          icon={<AlertCircle className="h-6 w-6 text-yellow-600" />}
          trend={`${stats.open.trend > 0 ? '+' : ''}${stats.open.trend}%`}
          trendDirection={stats.open.direction}
        />
        <StatCard
          title="Tickets Terminés"
          value={stats.completed.current}
          icon={<CheckCircle className="h-6 w-6 text-green-600" />}
          trend={`${stats.completed.trend > 0 ? '+' : ''}${stats.completed.trend}%`}
          trendDirection={stats.completed.direction}
        />
        <StatCard
          title="Temps Moyen de Résolution"
          value={`${stats.resolution.current} jours`}
          icon={<Users className="h-6 w-6 text-purple-600" />}
          trend={`${stats.resolution.trend > 0 ? '+' : ''}${Math.abs(stats.resolution.trend)} jours`}
          trendDirection={stats.resolution.direction}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Distribution par Statut</h3>
          <TicketStatusChart />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Distribution par Priorité</h3>
          <TicketPriorityChart />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Distribution par Catégorie</h3>
          <TicketCategoryChart />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Activité Récente</h3>
          <RecentActivity />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Performance de l'Équipe</h3>
          <TeamPerformance />
        </div>
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Créer un nouveau ticket"
      >
        <CreateTicketForm onClose={() => setIsCreateModalOpen(false)} />
      </Modal>
    </div>
  );
}