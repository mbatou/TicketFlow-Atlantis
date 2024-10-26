import React from 'react';
import { Clock, Upload, Edit2, Trash2 } from 'lucide-react';
import { useResources } from '../../context/ResourceContext';
import { useAuth } from '../../context/AuthContext';

interface Activity {
  id: string;
  type: 'create' | 'update' | 'delete';
  resourceId: string;
  resourceTitle: string;
  userId: string;
  timestamp: string;
}

export default function ActivityLog() {
  const { resources } = useResources();
  const { user } = useAuth();

  // Generate activities from resources
  const activities: Activity[] = resources.map(resource => ({
    id: resource.id,
    type: 'create',
    resourceId: resource.id,
    resourceTitle: resource.title,
    userId: resource.createdBy,
    timestamp: resource.createdAt,
  }));

  // Sort activities by timestamp in descending order
  const sortedActivities = activities.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  ).slice(0, 5); // Show only last 5 activities

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'create':
        return <Upload className="h-5 w-5 text-green-500" />;
      case 'update':
        return <Edit2 className="h-5 w-5 text-blue-500" />;
      case 'delete':
        return <Trash2 className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getActivityText = (activity: Activity) => {
    switch (activity.type) {
      case 'create':
        return `a créé la ressource "${activity.resourceTitle}"`;
      case 'update':
        return `a mis à jour la ressource "${activity.resourceTitle}"`;
      case 'delete':
        return `a supprimé la ressource "${activity.resourceTitle}"`;
      default:
        return `a effectué une action sur "${activity.resourceTitle}"`;
    }
  };

  if (sortedActivities.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        Aucune activité récente
      </div>
    );
  }

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {sortedActivities.map((activity, index) => (
          <li key={activity.id}>
            <div className="relative pb-8">
              {index !== sortedActivities.length - 1 && (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              )}
              <div className="relative flex space-x-3">
                <div>
                  <span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
                    {getActivityIcon(activity.type)}
                  </span>
                </div>
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-gray-900">
                        {activity.userId === user?.id ? 'Vous' : 'Un utilisateur'}
                      </span>{' '}
                      {getActivityText(activity)}
                    </p>
                  </div>
                  <div className="text-right text-sm whitespace-nowrap text-gray-500">
                    {new Date(activity.timestamp).toLocaleDateString('fr-FR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}