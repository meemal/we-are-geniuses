import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Brain, UserPlus, Wrench, ArrowRight } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="mb-8">
          <img
            src="/logo.svg"
            alt="We Are Geniuses"
            className="h-32 w-auto mx-auto"
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Connect with just the genius you are looking for!
        </h1>
        <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
          This is a directory of dedicated Dr Joe Dispenza practitioners,
          connected heart-centered individuals who are committed to personal
          transformation and spiritual growth through meditation to manifesting
          their reality. Let's connect and raise each other up on our journeys!
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {/* Directory Card */}
        <div className="group bg-white/40 backdrop-blur-md rounded-xl p-8 border border-white shadow-xl hover:transform hover:scale-[1.02] transition-all">
          <div className="flex flex-col items-center text-center h-full">
            <div className="w-16 h-16 bg-genius-orange rounded-full flex items-center justify-center mb-6 group-hover:bg-genius-orange/90 transition-colors">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Directory</h3>
            <p className="text-gray-700 mb-8 flex-grow">
              Connect with just the Genius you are looking for. Who knows where
              your journey will go!
            </p>
            <Link
              to="/directory"
              className="inline-flex items-center px-6 py-3 bg-genius-orange text-white rounded-lg hover:bg-genius-coral transition-colors group-hover:bg-genius-coral"
            >
              <span>Browse Directory</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>

        {/* Register Card */}
        <div className="group bg-white/40 backdrop-blur-md rounded-xl p-8 border border-white shadow-xl hover:transform hover:scale-[1.02] transition-all">
          <div className="flex flex-col items-center text-center h-full">
            <div className="w-16 h-16 bg-genius-pink rounded-full flex items-center justify-center mb-6 group-hover:bg-genius-pink/90 transition-colors">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Register</h3>
            <p className="text-gray-700 mb-8 flex-grow">
              Join our directory, open yourself up to new possibilities and
              connections.
            </p>
            <Link
              to="/create-profile"
              className="inline-flex items-center px-6 py-3 bg-genius-pink text-white rounded-lg hover:bg-genius-coral transition-colors group-hover:bg-genius-coral"
            >
              <span>Create Profile</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>

        {/* Tools Card */}
        <div className="group bg-white/40 backdrop-blur-md rounded-xl p-8 border border-white shadow-xl hover:transform hover:scale-[1.02] transition-all md:col-span-2 lg:col-span-1">
          <div className="flex flex-col items-center text-center h-full">
            <div className="w-16 h-16 bg-genius-coral rounded-full flex items-center justify-center mb-6 group-hover:bg-genius-coral/90 transition-colors">
              <Wrench className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Genius Tools
            </h3>
            <p className="text-gray-700 mb-8 flex-grow">
              Some little tools to help you with your practice and enhance your
              meditation journey.
            </p>
            <Link
              to="/tools"
              className="inline-flex items-center px-6 py-3 bg-genius-coral text-white rounded-lg hover:bg-genius-orange transition-colors group-hover:bg-genius-orange"
            >
              <span>Explore Tools</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="bg-white/40 backdrop-blur-md rounded-xl p-8 border border-white shadow-xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Join Our Community?
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Connect with fellow practitioners, share experiences, and grow
            together in your spiritual journey.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-genius-orange rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Connect</h3>
            <p className="text-gray-700">
              Find like-minded practitioners in your area
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-genius-pink rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Learn</h3>
            <p className="text-gray-700">
              Share experiences and deepen your practice
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-genius-coral rounded-full flex items-center justify-center mx-auto mb-4">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Grow</h3>
            <p className="text-gray-700">
              Access tools and resources for your journey
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
