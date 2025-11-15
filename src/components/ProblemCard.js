import React from 'react';
import { Edit2, Trash2, Code, AlertCircle, BookOpen, CheckCircle, Clock, Calendar } from 'lucide-react';

const ProblemCard = ({ problem, onEdit, onDelete }) => {
  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: 'bg-green-100 text-green-800 border-green-300',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      hard: 'bg-red-100 text-red-800 border-red-300'
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getStatusConfig = (status) => {
    const configs = {
      solved: {
        icon: <CheckCircle className="w-5 h-5 text-green-600" />,
        color: 'text-green-600',
        bg: 'bg-green-50',
        border: 'border-green-200'
      },
      in_progress: {
        icon: <Clock className="w-5 h-5 text-blue-600" />,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        border: 'border-blue-200'
      },
      not_started: {
        icon: <AlertCircle className="w-5 h-5 text-gray-400" />,
        color: 'text-gray-400',
        bg: 'bg-gray-50',
        border: 'border-gray-200'
      }
    };
    return configs[status] || configs.not_started;
  };

  const statusConfig = getStatusConfig(problem.status);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-all p-6 border-2 ${statusConfig.border}`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <div className={`p-2 rounded-lg ${statusConfig.bg}`}>
              {statusConfig.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-800">{problem.title}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(problem.difficulty)}`}>
              {problem.difficulty.toUpperCase()}
            </span>
            {problem.category && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-300">
                {problem.category}
              </span>
            )}
          </div>
          {problem.updated_at && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Calendar className="w-3 h-3" />
              <span>Last updated: {formatDate(problem.updated_at)}</span>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(problem)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
            title="Edit"
          >
            <Edit2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(problem.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
            title="Delete"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Code Solution */}
      {problem.code && (
        <div className="mb-4">
          <h4 className="font-bold text-gray-700 mb-2 flex items-center gap-2">
            <Code className="w-4 h-4 text-blue-600" />
            Code Solution
          </h4>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm border-2 border-gray-700 shadow-inner">
            <code>{problem.code}</code>
          </pre>
        </div>
      )}

      {/* Mistakes & Learnings */}
      {problem.mistakes && (
        <div className="mb-4">
          <h4 className="font-bold text-gray-700 mb-2 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600" />
            Mistakes & Learnings
          </h4>
          <div className="bg-red-50 p-4 rounded-lg text-gray-700 border-2 border-red-100">
            {problem.mistakes}
          </div>
        </div>
      )}

      {/* Notes */}
      {problem.notes && (
        <div>
          <h4 className="font-bold text-gray-700 mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-green-600" />
            Notes
          </h4>
          <div className="bg-blue-50 p-4 rounded-lg text-gray-700 border-2 border-blue-100">
            {problem.notes}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProblemCard;