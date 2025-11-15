import React, { useState, useEffect } from 'react';
import './App.css';
import Stats from './components/Stats';
import ProblemForm from './components/ProblemForm';
import ProblemCard from './components/ProblemCard';
import { getProblems, getRecentProblems, getStats, createProblem, updateProblem, deleteProblem } from './services/api';
import { Plus, Code, TrendingUp, List } from 'lucide-react';

function App() {
  const [problems, setProblems] = useState([]);
  const [stats, setStats] = useState({ total: 0, solved: 0, in_progress: 0, difficulty: {} });
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('recent');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProblems();
    fetchStats();
  }, []);

  useEffect(() => {
    fetchProblems();
  }, [activeTab]);

  const fetchProblems = async () => {
    setLoading(true);
    try {
      const data = activeTab === 'recent' ? await getRecentProblems() : await getProblems();
      setProblems(data);
    } catch (error) {
      console.error('Error fetching problems:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await getStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleSave = async (formData) => {
    try {
      if (selectedProblem) {
        await updateProblem(selectedProblem.id, formData);
      } else {
        await createProblem(formData);
      }
      await fetchProblems();
      await fetchStats();
      setShowForm(false);
      setSelectedProblem(null);
    } catch (error) {
      console.error('Error saving problem:', error);
      alert('Failed to save problem. Please try again.');
    }
  };

  const handleEdit = (problem) => {
    setSelectedProblem(problem);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this problem?')) {
      try {
        await deleteProblem(id);
        await fetchProblems();
        await fetchStats();
      } catch (error) {
        console.error('Error deleting problem:', error);
        alert('Failed to delete problem. Please try again.');
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedProblem(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                DSA Progress Tracker
              </h1>
              <p className="text-gray-600">Track your coding journey, one problem at a time</p>
            </div>
          </div>
          
          <Stats stats={stats} />

          <button
            onClick={() => setShowForm(!showForm)}
            className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
          >
            <Plus className="w-5 h-5" />
            Add New Problem
          </button>
        </div>

        {/* Form Section */}
        {showForm && (
          <ProblemForm
            problem={selectedProblem}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}

        {/* Tab Navigation */}
        <div className="bg-white rounded-t-2xl shadow-xl overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('recent')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-semibold transition-all ${
                activeTab === 'recent'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              Recent (Last 3)
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-semibold transition-all ${
                activeTab === 'all'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <List className="w-5 h-5" />
              All Problems ({stats.total})
            </button>
          </div>
        </div>

        {/* Problems Section */}
        <div className="bg-white rounded-b-2xl shadow-xl p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {problems.map((problem) => (
                <ProblemCard
                  key={problem.id}
                  problem={problem}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}

          {!loading && problems.length === 0 && (
            <div className="py-16 text-center">
              <Code className="w-20 h-20 mx-auto text-gray-300 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">
                {activeTab === 'recent' ? 'No recent problems' : 'No problems yet'}
              </h3>
              <p className="text-gray-500 text-lg">
                {activeTab === 'recent' 
                  ? 'Start solving problems to see them here!' 
                  : 'Click "Add New Problem" to get started!'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;