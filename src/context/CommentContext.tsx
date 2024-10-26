import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

interface Comment {
  id: string;
  ticketId: string;
  content: string;
  author: {
    id: string;
    username: string;
  };
  createdAt: string;
}

interface CommentContextType {
  comments: Comment[];
  addComment: (data: { ticketId: string; content: string }) => void;
  deleteComment: (id: string) => void;
}

const CommentContext = createContext<CommentContextType | null>(null);

export function CommentProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);

  const addComment = (data: { ticketId: string; content: string }) => {
    if (!user) return;

    const newComment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      author: {
        id: user.id,
        username: user.username,
      },
      createdAt: new Date().toISOString(),
    };

    setComments((prev) => [...prev, newComment]);
  };

  const deleteComment = (id: string) => {
    setComments((prev) => prev.filter((comment) => comment.id !== id));
  };

  return (
    <CommentContext.Provider value={{ comments, addComment, deleteComment }}>
      {children}
    </CommentContext.Provider>
  );
}

export function useComments() {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error('useComments must be used within a CommentProvider');
  }
  return context;
}