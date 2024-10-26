import React, { useState } from 'react';
import { Layout, Menu, Plus, LogOut, BarChart2, Settings, Ticket, Upload } from 'lucide-react';
import { Link, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import TicketList from '../tickets/TicketList';
import TicketDetailsPage from '../tickets/TicketDetailsPage';
import CreateTicketForm from '../tickets/CreateTicketForm';
import DashboardOverview from '../dashboard/DashboardOverview';
import ResourcesPage from '../resources/ResourcesPage';
import SubmissionsPage from '../submissions/SubmissionsPage';
import SettingsPage from '../settings/SettingsPage';
import Modal from '../shared/Modal';
import NotificationDropdown from '../notifications/NotificationDropdown';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <Link to="/">
                  <Layout className="h-8 w-8 text-indigo-600" />
                </Link>
                <span className="ml-2 text-xl font-semibold">TicketFlow</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/"
                  className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                    location.pathname === '/'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <BarChart2 className="h-4 w-4 mr-1" />
                  Tableau de bord
                </Link>
                <Link
                  to="/tickets"
                  className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                    location.pathname.startsWith('/tickets')
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <Ticket className="h-4 w-4 mr-1" />
                  Tickets
                </Link>
                <Link
                  to="/submissions"
                  className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                    location.pathname.startsWith('/submissions')
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <Upload className="h-4 w-4 mr-1" />
                  Soumissions
                </Link>
                <Link
                  to="/resources"
                  className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                    location.pathname.startsWith('/resources')
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <Menu className="h-4 w-4 mr-1" />
                  Ressources
                </Link>
                <Link
                  to="/settings"
                  className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                    location.pathname.startsWith('/settings')
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <Settings className="h-4 w-4 mr-1" />
                  Paramètres
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(true)}
                className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus:outline-none"
              >
                <Plus className="h-5 w-5" />
              </button>
              <div className="ml-4 flex items-center">
                <NotificationDropdown />
                <span className="text-sm text-gray-700 mx-4">
                  {user?.username}
                </span>
                <button
                  onClick={logout}
                  className="flex items-center text-gray-500 hover:text-gray-700"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-10">
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
              {location.pathname === '/' ? 'Tableau de bord' : 
               location.pathname.startsWith('/tickets') ? 'Tickets' :
               location.pathname.startsWith('/submissions') ? 'Soumissions' :
               location.pathname.startsWith('/resources') ? 'Ressources' :
               'Paramètres'}
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              <Routes>
                <Route path="/" element={<DashboardOverview />} />
                <Route path="/tickets" element={<TicketList />} />
                <Route path="/tickets/:id" element={<TicketDetailsPage />} />
                <Route path="/submissions/*" element={<SubmissionsPage />} />
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="/settings/*" element={<SettingsPage />} />
              </Routes>
            </div>
          </div>
        </main>
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