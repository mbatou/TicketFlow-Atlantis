import React from 'react';
import { useTickets } from '../../context/TicketContext';
import { useComments } from '../../context/CommentContext';
import { Clock, MessageSquare } from 'lucide-react';

export default function RecentActivity() {
  const { tickets } = useTickets();
  const { comments } = useComments();

  const activities = [
    ...tickets.map(ticket => ({
      type: 'ticket',
      id: ticket.id,
      title: ticket.title,
      date: new Date(ticket.createdAt),
      status: ticket.status,
    })),
    ...comments.map(comment => ({
      type: 'comment',
      id: comment.id,
      ticketId: comment.ticketId,
      content: comment.content,
      date: new Date(comment.createdAt),
      author: comment.author.username,
    })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime())
   .slice(0, 5);

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {activities.map((activity, index) => (
          <li key={activity.id}>
            <div className="relative pb-8">
              {index !== activities.length - 1 && (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              )}
              <div className="relative flex space-x-3">
                <div>
                  <span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
                    {activity.type === 'ticket' ? (
                      <Clock className="h-4 w-4 text-gray-500" />
                    ) : (
                      <MessageSquare className="h-4 w-4 text-gray-500" />
                    )}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div>
                    <div className="text-sm">
                      {activity.type === 'ticket' ? (
                        <span className="font-medium text-gray-900">
                          Nouveau ticket créé: {activity.title}
                        </span>
                      ) : (
                        <span className="font-medium text-gray-900">
                          {activity.author} a commenté
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      {activity.date.toLocaleDateString()} à {activity.date.toLocaleTimeString()}
                    </p>
                  </div>
                  {activity.type === 'comment' && (
                    <p className="mt-2 text-sm text-gray-700">{activity.content}</p>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}