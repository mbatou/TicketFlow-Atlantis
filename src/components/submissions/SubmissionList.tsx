import React, { useState } from 'react';
import { Search, Filter, Eye, Trash2 } from 'lucide-react';
import { useSubmissions } from '../../context/SubmissionContext';
import { useBrands } from '../../context/BrandContext';
import { useAuth } from '../../context/AuthContext';
import { Submission, SubmissionStatus, submissionStatuses, documentTypes } from '../../types/submission';
import Modal from '../shared/Modal';
import SubmissionDetails from './SubmissionDetails';

export default function SubmissionList() {
  const { submissions, updateStatus, deleteSubmission } = useSubmissions();
  const { brands } = useBrands();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<SubmissionStatus | 'all'>('all');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = 
      submission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || submission.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
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
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as SubmissionStatus | 'all')}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="all">Tous les statuts</option>
            {Object.entries(submissionStatuses).map(([value, { label }]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredSubmissions.map((submission) => (
            <li key={submission.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div 
                  className="flex-1 min-w-0 cursor-pointer"
                  onClick={() => setSelectedSubmission(submission)}
                >
                  <h4 className="text-lg font-medium text-gray-900 truncate">
                    {submission.title}
                  </h4>
                  <p className="mt-1 text-sm text-gray-500">
                    {submission.description}
                  </p>
                  <div className="mt-2 flex items-center space-x-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      submissionStatuses[submission.status].bgColor
                    } ${submissionStatuses[submission.status].color}`}>
                      {submissionStatuses[submission.status].label}
                    </span>
                    <span className="text-sm text-gray-500">
                      {documentTypes[submission.documentType]}
                    </span>
                    <span className="text-sm text-gray-500">
                      {brands.find(b => b.id === submission.brandId)?.name}
                    </span>
                    {submission.deadline && (
                      <span className="text-sm text-gray-500">
                        Échéance: {new Date(submission.deadline).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedSubmission(submission)}
                    className="p-2 text-gray-400 hover:text-gray-500"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  {(user?.role === 'admin' || user?.id === submission.submittedBy) && (
                    <button
                      onClick={() => deleteSubmission(submission.id)}
                      className="p-2 text-red-400 hover:text-red-500"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
          {filteredSubmissions.length === 0 && (
            <li className="px-4 py-8 text-center text-gray-500">
              Aucune soumission trouvée
            </li>
          )}
        </ul>
      </div>

      <Modal
        isOpen={!!selectedSubmission}
        onClose={() => setSelectedSubmission(null)}
        title="Détails de la soumission"
      >
        {selectedSubmission && (
          <SubmissionDetails
            submission={selectedSubmission}
            onClose={() => setSelectedSubmission(null)}
          />
        )}
      </Modal>
    </div>
  );
}