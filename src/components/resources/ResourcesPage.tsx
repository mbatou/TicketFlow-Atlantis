import React, { useState } from 'react';
import { Filter, Upload, Search } from 'lucide-react';
import { useResources } from '../../context/ResourceContext';
import { useAuth } from '../../context/AuthContext';
import { ResourceCategory, resourceCategories } from '../../types/resource';
import ResourceList from './ResourceList';
import ResourceUploader from './ResourceUploader';
import ActivityLog from './ActivityLog';
import BrandSelector from './BrandSelector';

export default function ResourcesPage() {
  const { user } = useAuth();
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<ResourceCategory | 'all'>('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const canUpload = user?.role === 'admin' || user?.role === 'super_admin';

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Ressources
            </h2>
          </div>
          {canUpload && (
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Upload className="h-4 w-4 mr-2" />
                Ajouter une Ressource
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-9">
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <BrandSelector
                      selectedBrand={selectedBrand}
                      onSelectBrand={setSelectedBrand}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Rechercher une ressource..."
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="sm:w-48">
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value as ResourceCategory | 'all')}
                      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option value="all">Toutes les catégories</option>
                      {resourceCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <ResourceList
                  brandId={selectedBrand}
                  searchQuery={searchQuery}
                  categoryFilter={categoryFilter}
                />
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-3">
            <ActivityLog brandId={selectedBrand} />
          </div>
        </div>
      </div>

      <ResourceUploader
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        brandId={selectedBrand}
      />
    </div>
  );
}