import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, User, FileText, MessageSquare, Send, Download, Eye, Link as LinkIcon } from 'lucide-react';
import { useSubmissions } from '../../context/SubmissionContext';
import { useAuth } from '../../context/AuthContext';
import { useUsers } from '../../context/UserContext';
import { Submission, SubmissionStatus, submissionStatuses } from '../../types/submission';
import { formatFileSize } from '../../utils/formatters';

interface SubmissionDetailsProps {
  submission: Submission;
  onClose: () => void;
}

export default function SubmissionDetails({ submission, onClose }: SubmissionDetailsProps) {
  const { updateStatus, addFeedback } = useSubmissions();
  const { user } = useAuth();
  const { users } = useUsers();
  const [newFeedback, setNewFeedback] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const navigate = useNavigate();

  const canReview = user?.role === 'admin' || user?.role === 'super_admin';
  const submitter = users.find(u => u.id === submission.submittedBy);

  const handleStatusChange = (newStatus: SubmissionStatus) => {
    updateStatus(submission.id, newStatus);
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFeedback.trim()) return;

    addFeedback(submission.id, newFeedback.trim());
    setNewFeedback('');
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = submission.fileUrl;
    link.download = submission.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  return (
    <div className="space-y-6">
      <button
        onClick={onClose}
        className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Retour à la liste
      </button>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {submission.title}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {submission.description}
              </p>
            </div>
            <div className="ml-4">
              <select
                value={submission.status}
                onChange={(e) => handleStatusChange(e.target.value as SubmissionStatus)}
                className="rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                {Object.entries(submissionStatuses).map(([value, { label }]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Statut</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${submissionStatuses[submission.status].bgColor} ${submissionStatuses[submission.status].color}`}>
                  {submissionStatuses[submission.status].label}
                </span>
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Soumis par</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {submitter ? submitter.username : 'Utilisateur inconnu'}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Date de soumission</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {new Date(submission.createdAt).toLocaleDateString()}
              </dd>
            </div>
            {submission.deadline && (
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Échéance</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(submission.deadline).toLocaleDateString()}
                </dd>
              </div>
            )}
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Fichier</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <span>{submission.fileName}</span>
                    <span className="text-gray-500">({formatFileSize(submission.fileSize)})</span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleDownload}
                      className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Télécharger
                    </button>
                    <button
                      onClick={handlePreview}
                      className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Prévisualiser
                    </button>
                  </div>
                </div>
                {showPreview && (
                  <div className="mt-4">
                    <iframe
                      src={submission.fileUrl}
                      className="w-full h-96 border border-gray-300 rounded-md"
                      title="Document Preview"
                    />
                  </div>
                )}
              </dd>
            </div>
            {submission.links && submission.links.length > 0 && (
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Liens associés</dt>
                <dd className="mt-1 space-y-2">
                  {submission.links.map((link) => (
                    <div key={link.id} className="flex items-center space-x-2">
                      <LinkIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{link.title}:</span>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-indigo-600 hover:text-indigo-500"
                      >
                        {link.url}
                      </a>
                    </div>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      {/* Feedback Section */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Feedback
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {submission.feedback?.map((feedback) => (
              <li key={feedback.id} className="px-4 py-4">
                <div className="flex space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {feedback.author.username}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(feedback.createdAt).toLocaleString()}
                    </p>
                    <div className="mt-1 text-sm text-gray-900">
                      {feedback.content}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Add Feedback Form */}
          {(canReview || submission.submittedBy === user?.id) && (
            <div className="px-4 py-4">
              <form onSubmit={handleSubmitFeedback} className="flex space-x-3">
                <div className="flex-grow">
                  <textarea
                    value={newFeedback}
                    onChange={(e) => setNewFeedback(e.target.value)}
                    placeholder="Ajouter un feedback..."
                    rows={2}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="flex-shrink-0">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Envoyer
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}