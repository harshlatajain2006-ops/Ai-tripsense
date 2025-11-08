import { useState, useEffect } from 'react';
import { Award, Trophy, Star, Leaf, Users, Camera } from 'lucide-react';

export default function RewardsModule() {
  const [points, setPoints] = useState(1250);
  const [level, setLevel] = useState(3);

  const badges = [
    { id: 1, name: 'First Journey', icon: Award, earned: true, description: 'Complete your first trip' },
    { id: 2, name: 'Eco Warrior', icon: Leaf, earned: true, description: 'Choose 5 eco-friendly options' },
    { id: 3, name: 'Local Support', icon: Users, earned: true, description: 'Support 10 local businesses' },
    { id: 4, name: 'Explorer', icon: Camera, earned: false, description: 'Visit 15 unique places' },
    { id: 5, name: 'Master Traveler', icon: Trophy, earned: false, description: 'Reach Level 10' },
    { id: 6, name: 'Culture Enthusiast', icon: Star, earned: true, description: 'Experience 5 cultural events' },
  ];

  const recentActivities = [
    { action: 'Supported local artisan shop', points: 50, date: '2 hours ago' },
    { action: 'Used eco-friendly transport', points: 30, date: '1 day ago' },
    { action: 'Visited hidden gem location', points: 40, date: '3 days ago' },
    { action: 'Completed cultural experience', points: 60, date: '5 days ago' },
  ];

  const challenges = [
    { title: 'Weekend Explorer', description: 'Visit 3 new places this weekend', reward: 100, progress: 1, total: 3 },
    { title: 'Green Travel', description: 'Use public transport 5 times', reward: 75, progress: 3, total: 5 },
    { title: 'Food Adventure', description: 'Try 5 local specialties', reward: 80, progress: 2, total: 5 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <Award className="text-light-sky dark:text-dark-turquoise" size={32} />
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Travel Rewards</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-light-sky to-light-jade dark:from-dark-turquoise dark:to-dark-gold rounded-xl p-8 text-white shadow-lg">
          <Trophy size={48} className="mb-4 opacity-90" />
          <div className="text-5xl font-bold mb-2">{points}</div>
          <div className="text-lg opacity-90">Total Points</div>
        </div>

        <div className="bg-gradient-to-br from-light-sunrise to-light-clay dark:from-dark-sunset dark:to-dark-gold rounded-xl p-8 text-white shadow-lg">
          <Star size={48} className="mb-4 opacity-90" />
          <div className="text-5xl font-bold mb-2">Level {level}</div>
          <div className="text-lg opacity-90">Traveler Level</div>
        </div>

        <div className="bg-gradient-to-br from-light-jade to-light-sky dark:from-dark-turquoise dark:to-dark-navy rounded-xl p-8 text-white shadow-lg">
          <Award size={48} className="mb-4 opacity-90" />
          <div className="text-5xl font-bold mb-2">{badges.filter(b => b.earned).length}</div>
          <div className="text-lg opacity-90">Badges Earned</div>
        </div>
      </div>

      <div className="bg-white dark:bg-dark-slate rounded-xl p-8 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Level Progress</h3>
          <span className="text-sm text-gray-600 dark:text-gray-400">350 points to Level {level + 1}</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-light-sky to-light-jade dark:from-dark-turquoise dark:to-dark-gold rounded-full transition-all duration-500"
            style={{ width: '65%' }}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-dark-slate rounded-xl p-8 shadow-lg">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Your Badges</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map(badge => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-xl text-center transition-all ${
                  badge.earned
                    ? 'bg-gradient-to-br from-light-sky/20 to-light-jade/20 dark:from-dark-turquoise/20 dark:to-dark-gold/20 hover:shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 opacity-50'
                }`}
              >
                <Icon
                  size={32}
                  className={`mx-auto mb-2 ${
                    badge.earned
                      ? 'text-light-sky dark:text-dark-turquoise'
                      : 'text-gray-400 dark:text-gray-600'
                  }`}
                />
                <div className={`font-semibold text-sm ${
                  badge.earned
                    ? 'text-gray-800 dark:text-gray-100'
                    : 'text-gray-500 dark:text-gray-500'
                }`}>
                  {badge.name}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">{badge.description}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-dark-slate rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Active Challenges</h3>
          <div className="space-y-4">
            {challenges.map((challenge, idx) => (
              <div key={idx} className="p-4 bg-gray-50 dark:bg-dark-navy rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-100">{challenge.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{challenge.description}</p>
                  </div>
                  <div className="bg-light-sunrise dark:bg-dark-gold text-white px-3 py-1 rounded-full text-sm font-semibold">
                    +{challenge.reward}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Progress</span>
                    <span>{challenge.progress}/{challenge.total}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-light-sky to-light-jade dark:from-dark-turquoise dark:to-dark-gold rounded-full transition-all"
                      style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-dark-slate rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-dark-navy rounded-lg">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-light-sky to-light-jade dark:from-dark-turquoise dark:to-dark-gold flex items-center justify-center text-white font-semibold">
                  +{activity.points}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800 dark:text-gray-100">{activity.action}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{activity.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-light-sky/10 to-light-jade/10 dark:from-dark-turquoise/10 dark:to-dark-gold/10 rounded-xl p-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">How to Earn Points</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <Leaf className="text-light-jade dark:text-dark-turquoise flex-shrink-0" size={20} />
            <div>
              <div className="font-medium text-gray-800 dark:text-gray-100">Eco-Friendly Choices</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Use sustainable transport</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Users className="text-light-sky dark:text-dark-turquoise flex-shrink-0" size={20} />
            <div>
              <div className="font-medium text-gray-800 dark:text-gray-100">Support Locals</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Shop from local businesses</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Camera className="text-light-sunrise dark:text-dark-gold flex-shrink-0" size={20} />
            <div>
              <div className="font-medium text-gray-800 dark:text-gray-100">Explore More</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Discover hidden gems</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
