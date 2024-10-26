import React, { createContext, useContext, useState } from 'react';
import { Submission, SubmissionStatus } from '../types/submission';
import { useAuth } from './AuthContext';
import { useNotifications } from './NotificationContext';

interface SubmissionContextType {
  submissions: Submission[];
  createSubmission: (data: Omit<Submission, 'id' | 'status' | 'submittedBy' | 'createdAt'>) => Promise<void>;
  updateStatus: (id: string, status: SubmissionStatus, feedback?: string) => void;
  deleteSubmission: (id: string) => void;
  addFeedback: (submissionId: string, content: string) => void;
}

const SubmissionContext = createContext<SubmissionContextType | null>(null);

const SUBMISSIONS_STORAGE_KEY = 'ticketflow_submissions';

export function SubmissionProvider({ children }: { children: React.ReactNode }) {
  const [submissions, setSubmissions] = useState<Submission[]>(() => {
    const stored = localStorage.getItem(SUBMISSIONS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });
  const { user } = useAuth();
  const { addNotification } = useNotifications();

  // Save submissions to localStorage whenever they change
  React.useEffect(() => {
    localStorage.setItem(SUBMISSIONS_STORAGE_KEY, JSON.stringify(submissions));
  }, [submissions]);

  const createSubmission = async (data: Omit<Submission, 'id' | 'status' | 'submittedBy' | 'createdAt'>) => {
    if (!user) throw new Error('User must be authenticated');

    const newSubmission: Submission = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
      submittedBy: user.id,
      createdAt: new Date().toISOString(),
      feedback: [],
    };

    setSubmissions(prev => [...prev, newSubmission]);
    addNotification(
      'info',
      'Nouvelle soumission',
      `Une nouvelle soumission "${newSubmission.title}" a été créée`,
      `/submissions/${newSubmission.id}`
    );
  };

  const updateStatus = (id: string, status: SubmissionStatus, feedback?: string) => {
    if (!user) return;

    setSubmissions(prev => prev.map(submission => {
      if (submission.id !== id) return submission;

      const updatedSubmission = {
        ...submission,
        status,
        feedback: feedback 
          ? [...(submission.feedback || []), {
              id: Math.random().toString(36).substr(2, 9),
              content: feedback,
              author: {
                id: user.id,
                username: user.username
              },
              createdAt: new Date().toISOString()
            }]
          : submission.feedback
      };

      addNotification(
        'info',
        'Statut mis à jour',
        `Le statut de la soumission "${submission.title}" a été mis à jour en ${status}`,
        `/submissions/${id}`
      );

      return updatedSubmission;
    }));
  };

  const deleteSubmission = (id: string) => {
    setSubmissions(prev => {
      const submission = prev.find(s => s.id === id);
      if (submission) {
        addNotification(
          'warning',
          'Soumission supprimée',
          `La soumission "${submission.title}" a été supprimée`
        );
      }
      return prev.filter(s => s.id !== id);
    });
  };

  const addFeedback = (submissionId: string, content: string) => {
    if (!user) return;

    setSubmissions(prev => prev.map(submission => {
      if (submission.id !== submissionId) return submission;

      const updatedSubmission = {
        ...submission,
        feedback: [...(submission.feedback || []), {
          id: Math.random().toString(36).substr(2, 9),
          content,
          author: {
            id: user.id,
            username: user.username
          },
          createdAt: new Date().toISOString()
        }]
      };

      addNotification(
        'info',
        'Nouveau feedback',
        `Un nouveau feedback a été ajouté à la soumission "${submission.title}"`,
        `/submissions/${submissionId}`
      );

      return updatedSubmission;
    }));
  };

  return (
    <SubmissionContext.Provider value={{
      submissions,
      createSubmission,
      updateStatus,
      deleteSubmission,
      addFeedback
    }}>
      {children}
    </SubmissionContext.Provider>
  );
}

export function useSubmissions() {
  const context = useContext(SubmissionContext);
  if (!context) {
    throw new Error('useSubmissions must be used within a SubmissionProvider');
  }
  return context;
}