import React from 'react';
import { Brain, Clock, Calendar, BookOpen } from 'lucide-react';

export const ToolsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">Genius Tools</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white/40 backdrop-blur-md rounded-xl p-8 border border-white shadow-xl">
          <div className="w-12 h-12 bg-genius-orange rounded-full flex items-center justify-center mb-6">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Meditation Timer</h2>
          <p className="text-gray-800">
            A customizable timer specifically designed for Dr Joe's meditations, with preset durations and gentle bells.
          </p>
          <button className="mt-6 px-6 py-3 bg-genius-orange text-white rounded-lg hover:bg-genius-coral transition-colors">
            Coming Soon
          </button>
        </div>

        <div className="bg-white/40 backdrop-blur-md rounded-xl p-8 border border-white shadow-xl">
          <div className="w-12 h-12 bg-genius-pink rounded-full flex items-center justify-center mb-6">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Practice Journal</h2>
          <p className="text-gray-800">
            Track your meditation practice, record insights, and monitor your progress over time.
          </p>
          <button className="mt-6 px-6 py-3 bg-genius-pink text-white rounded-lg hover:bg-genius-coral transition-colors">
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
};