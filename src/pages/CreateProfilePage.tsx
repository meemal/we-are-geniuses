import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileForm } from '../components/ProfileForm';
import { ArrowLeft } from 'lucide-react';

export const CreateProfilePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Directory
      </button>

      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"></div>
        <div className="px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Create Your Profile</h1>
          <ProfileForm />
        </div>
      </div>
    </div>
  );
};