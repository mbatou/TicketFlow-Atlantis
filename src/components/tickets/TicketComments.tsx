import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useComments } from '../../context/CommentContext';

interface TicketCommentsProps {
  ticketId: string;
}

export default function TicketComments({ ticketId }: TicketCommentsProps) {
  const { user } = useAuth();
  const { comments, addComment } = useComments();
  const [newComment, setNewComment] = useState('');

  const ticketComments = comments.filter((comment) => comment.ticketId === ticketId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    addComment({
      ticketId,
      content: newComment.trim(),
    });
    setNewComment('');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <MessageSquare className="h-5 w-5 text-gray-400" />
        <h3 className="text-lg font-medium text-gray-900">Commentaires</h3>
      </div>

      <div className="space-y-4">
        {ticketComments.map((comment) => (
          <div key={comment.id} className="flex space-x-3">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-500">
                  {comment.author.username[0].toUpperCase()}
                </span>
              </div>
            </div>
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="font-medium text-gray-900">{comment.author.username}</span>
                </div>
                <time className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </time>
              </div>
              <div className="mt-1 text-sm text-gray-700">{comment.content}</div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="flex space-x-3">
          <div className="flex-grow">
            <textarea
              rows={2}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Ajouter un commentaire..."
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div className="flex-shrink-0">
            <button
              type="submit"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <Send className="h-4 w-4 mr-1" />
              Envoyer
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}