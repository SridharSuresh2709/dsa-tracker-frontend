import React from 'react';
import { Target, CheckCircle, Clock, TrendingUp } from 'lucide-react';

const Stats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Problems */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium text-blue-700">Total Problems</div>
          <Target className="w-5 h-5 text-blue-600" />
        </div>
        <div className="text-3xl font-bold text-blue-900">{stats.total}</div>
      </div>

      {/* Solved */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium text-green-700">Solved</div>
          <CheckCircle className="w-5 h-5 text-green-600" />
        </div>
        <div className="text-3xl font-bold text-green-900">{stats.solved}</div>
      </div>

      {/* In Progress */}
      <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl border border-yellow-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium text-yellow-700">In Progress</div>
          <Clock className="w-5 h-5 text-yellow-600" />
        </div>
        <div className="text-3xl font-bold text-yellow-900">{stats.in_progress}</div>
      </div>

      {/* Success Rate */}
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium text-purple-700">Success Rate</div>
          <TrendingUp className="w-5 h-5 text-purple-600" />
        </div>
        <div className="text-3xl font-bold text-purple-900">
          {stats.total > 0 ? Math.round((stats.solved / stats.total) * 100) : 0}%
        </div>
      </div>
    </div>
  );
};

export default Stats;