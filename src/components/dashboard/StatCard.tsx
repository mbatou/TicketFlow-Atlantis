import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend: string;
  trendDirection: 'up' | 'down';
}

export default function StatCard({ title, value, icon, trend, trendDirection }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div className="flex-shrink-0">{icon}</div>
        <div className={`flex items-center text-sm ${
          trendDirection === 'up' ? 'text-green-600' : 'text-red-600'
        }`}>
          {trendDirection === 'up' ? (
            <TrendingUp className="h-4 w-4 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 mr-1" />
          )}
          {trend}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-900">{value}</h3>
        <p className="text-sm text-gray-500">{title}</p>
      </div>
    </div>
  );
}