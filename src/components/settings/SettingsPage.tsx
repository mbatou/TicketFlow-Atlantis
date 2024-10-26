import React, { useState } from 'react';
import { Cog, Building2, Users, Grid, Bell } from 'lucide-react';
import BrandManagement from './BrandManagement';
import UserManagement from './UserManagement';
import DepartmentManagement from './DepartmentManagement';
import GeneralSettings from './GeneralSettings';

type SettingsTab = 'users' | 'brands' | 'departments' | 'general';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('users');

  const tabs = [
    { id: 'users', name: 'Utilisateurs', icon: Users },
    { id: 'brands', name: 'Marques', icon: Building2 },
    { id: 'departments', name: 'Départements', icon: Grid },
    { id: 'general', name: 'Paramètres Généraux', icon: Cog },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Paramètres</h1>
        </div>

        <div className="mt-6">
          <div className="sm:hidden">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value as SettingsTab)}
              className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            >
              {tabs.map((tab) => (
                <option key={tab.id} value={tab.id}>
                  {tab.name}
                </option>
              ))}
            </select>
          </div>

          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as SettingsTab)}
                      className={`
                        ${
                          activeTab === tab.id
                            ? 'border-indigo-500 text-indigo-600'
                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                        }
                        group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium
                      `}
                    >
                      <Icon
                        className={`
                          ${
                            activeTab === tab.id
                              ? 'text-indigo-500'
                              : 'text-gray-400 group-hover:text-gray-500'
                          }
                          -ml-0.5 mr-2 h-5 w-5
                        `}
                      />
                      {tab.name}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className="mt-6">
            {activeTab === 'users' && <UserManagement />}
            {activeTab === 'brands' && <BrandManagement />}
            {activeTab === 'departments' && <DepartmentManagement />}
            {activeTab === 'general' && <GeneralSettings />}
          </div>
        </div>
      </div>
    </div>
  );
}