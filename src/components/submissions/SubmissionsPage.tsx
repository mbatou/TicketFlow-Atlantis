import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { useSubmissions } from '../../context/SubmissionContext';
import { DocumentType, documentTypes } from '../../types/submission';
import SubmissionList from './SubmissionList';
import SubmissionUploader from './SubmissionUploader';
import Modal from '../shared/Modal';

export default function SubmissionsPage() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<DocumentType | 'all'>('all');
  const { submissions } = useSubmissions();

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = submission.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || submission.documentType === typeFilter;
    return matchesSearch && matchesType;
  });

  const documentTypeOptions = Object.entries(documentTypes).map(([value, label]) => ({
    value: value as DocumentType,
    label
  }));

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Soumissions</h1>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            <Plus className="h-5 w-5 mr-2" />
            Nouvelle Soumission
          </button>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher une soumission..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as DocumentType | 'all')}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="all">Tous les types</option>
              {documentTypeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6">
          <SubmissionList submissions={filteredSubmissions} />
        </div>
      </div>

      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Nouvelle Soumission"
      >
        <SubmissionUploader onClose={() => setIsUploadModalOpen(false)} />
      </Modal>
    </div>
  );
}