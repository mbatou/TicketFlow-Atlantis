import React, { useState } from 'react';
import { Bell, Globe, Clock, Building } from 'lucide-react';
import { AgencySettings } from '../../types/settings';

export default function GeneralSettings() {
  const [settings, setSettings] = useState<AgencySettings>({
    name: '',
    address: '',
    phone: '',
    email: '',
    language: 'fr',
    timezone: 'Europe/Paris',
    notifications: {
      ticketUpdates: true,
      newBrands: true,
      teamChanges: true,
      comments: true,
    },
  });

  const handleNotificationChange = (key: keyof AgencySettings['notifications']) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
  };

  return (
    <div className="space-y-6 bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Informations de l'Agence
            </h3>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="agency-name" className="block text-sm font-medium text-gray-700">
                  Nom de l'Agence
                </label>
                <input
                  type="text"
                  name="agency-name"
                  id="agency-name"
                  value={settings.name}
                  onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Adresse
                </label>
                <textarea
                  name="address"
                  id="address"
                  rows={3}
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div className="pt-6">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Préférences Régionales
              </h3>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                    Langue
                  </label>
                  <select
                    id="language"
                    name="language"
                    value={settings.language}
                    onChange={(e) => setSettings({ ...settings, language: e.target.value as 'fr' | 'en' })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                    Fuseau Horaire
                  </label>
                  <select
                    id="timezone"
                    name="timezone"
                    value={settings.timezone}
                    onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="Europe/Paris">Europe/Paris</option>
                    <option value="Europe/London">Europe/London</option>
                    <option value="America/New_York">America/New_York</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Notifications
              </h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="ticket-updates"
                      name="ticket-updates"
                      type="checkbox"
                      checked={settings.notifications.ticketUpdates}
                      onChange={() => handleNotificationChange('ticketUpdates')}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="ticket-updates" className="font-medium text-gray-700">
                      Mises à jour des tickets
                    </label>
                    <p className="text-gray-500">Recevoir des notifications pour les mises à jour de tickets</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="new-brands"
                      name="new-brands"
                      type="checkbox"
                      checked={settings.notifications.newBrands}
                      onChange={() => handleNotificationChange('newBrands')}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="new-brands" className="font-medium text-gray-700">
                      Nouvelles marques
                    </label>
                    <p className="text-gray-500">Recevoir des notifications lors de l'ajout de nouvelles marques</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="team-changes"
                      name="team-changes"
                      type="checkbox"
                      checked={settings.notifications.teamChanges}
                      onChange={() => handleNotificationChange('teamChanges')}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="team-changes" className="font-medium text-gray-700">
                      Changements d'équipe
                    </label>
                    <p className="text-gray-500">Recevoir des notifications pour les modifications d'équipe</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="comments"
                      name="comments"
                      type="checkbox"
                      checked={settings.notifications.comments}
                      onChange={() => handleNotificationChange('comments')}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="comments" className="font-medium text-gray-700">
                      Commentaires
                    </label>
                    <p className="text-gray-500">Recevoir des notifications pour les nouveaux commentaires</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Enregistrer les modifications
        </button>
      </div>
    </div>
  );
}