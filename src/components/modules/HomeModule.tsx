import { Plane, Compass, Shield, Award } from 'lucide-react';

export default function HomeModule() {
  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-light-sky via-light-jade to-light-sunrise dark:from-dark-navy dark:via-dark-turquoise dark:to-dark-sunset p-12 text-white shadow-2xl">
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-4 animate-float">Welcome to AI TripSense</h1>
          <p className="text-xl opacity-90 max-w-2xl">
            Your intelligent travel companion powered by AI. Plan, discover, and experience the world like never before.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-dark-slate rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="w-12 h-12 rounded-lg bg-light-sky/20 dark:bg-dark-turquoise/20 flex items-center justify-center mb-4">
            <Plane className="text-light-sky dark:text-dark-turquoise" size={24} />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">Smart Planning</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">AI-powered itineraries tailored to your preferences and budget</p>
        </div>

        <div className="bg-white dark:bg-dark-slate rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="w-12 h-12 rounded-lg bg-light-jade/20 dark:bg-dark-turquoise/20 flex items-center justify-center mb-4">
            <Compass className="text-light-jade dark:text-dark-turquoise" size={24} />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">Discover Hidden Gems</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Find authentic experiences beyond tourist spots</p>
        </div>

        <div className="bg-white dark:bg-dark-slate rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="w-12 h-12 rounded-lg bg-light-sunrise/20 dark:bg-dark-gold/20 flex items-center justify-center mb-4">
            <Award className="text-light-sunrise dark:text-dark-gold" size={24} />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">Earn Rewards</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Get badges and points for sustainable travel choices</p>
        </div>

        <div className="bg-white dark:bg-dark-slate rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="w-12 h-12 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-4">
            <Shield className="text-red-500 dark:text-red-400" size={24} />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">Stay Safe</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">24/7 safety monitoring and emergency assistance</p>
        </div>
      </div>

      <div className="bg-white dark:bg-dark-slate rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Quick Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-light-sky dark:text-dark-turquoise mb-2">190+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Countries Covered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-light-jade dark:text-dark-turquoise mb-2">24/7</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">AI Support</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-light-sunrise dark:text-dark-gold mb-2">15+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Languages</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-light-clay dark:text-dark-sunset mb-2">100%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Authentic Local</div>
          </div>
        </div>
      </div>
    </div>
  );
}
