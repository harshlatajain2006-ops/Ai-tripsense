import { useState } from 'react';
import { MapPin, DollarSign, Home, Heart, Sparkles } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function PlanTripModule() {
  const [formData, setFormData] = useState({
    destination: '',
    budget: '',
    accommodation: 'hotel',
    interests: [] as string[],
  });
  const [itinerary, setItinerary] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const interestOptions = [
    'Adventure', 'Culture', 'Food', 'Nature', 'History',
    'Shopping', 'Photography', 'Wellness', 'Nightlife'
  ];

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const generateItinerary = async () => {
    if (!formData.destination || !formData.budget) return;

    setLoading(true);

    const mockItinerary = {
      days: [
        {
          day: 1,
          title: 'Arrival & Exploration',
          activities: [
            { time: '10:00 AM', activity: 'Check-in at accommodation', cost: 0 },
            { time: '12:00 PM', activity: 'Local cuisine lunch', cost: 500 },
            { time: '3:00 PM', activity: 'City walking tour', cost: 300 },
            { time: '7:00 PM', activity: 'Sunset viewpoint visit', cost: 200 },
          ],
          totalCost: 1000,
        },
        {
          day: 2,
          title: 'Cultural Immersion',
          activities: [
            { time: '9:00 AM', activity: 'Historical monument visit', cost: 400 },
            { time: '1:00 PM', activity: 'Traditional lunch experience', cost: 600 },
            { time: '4:00 PM', activity: 'Local market exploration', cost: 500 },
            { time: '7:00 PM', activity: 'Cultural performance', cost: 800 },
          ],
          totalCost: 2300,
        },
        {
          day: 3,
          title: 'Adventure & Nature',
          activities: [
            { time: '8:00 AM', activity: 'Nature trek/hike', cost: 700 },
            { time: '12:00 PM', activity: 'Picnic lunch', cost: 400 },
            { time: '3:00 PM', activity: 'Adventure activity', cost: 1200 },
            { time: '6:00 PM', activity: 'Return & relax', cost: 0 },
          ],
          totalCost: 2300,
        },
      ],
      totalBudget: 5600,
      recommendations: [
        'Book accommodations in advance for better rates',
        'Try local street food for authentic flavors',
        'Carry local currency for small vendors',
        'Download offline maps',
      ],
    };

    setTimeout(async () => {
      setItinerary(mockItinerary);

      await supabase.from('trip_plans').insert({
        destination: formData.destination,
        budget: parseFloat(formData.budget),
        accommodation_type: formData.accommodation,
        interests: formData.interests,
        itinerary: mockItinerary,
      });

      setLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="text-light-sky dark:text-dark-turquoise" size={32} />
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Plan Your Perfect Trip</h2>
      </div>

      <div className="bg-white dark:bg-dark-slate rounded-xl p-8 shadow-lg">
        <div className="space-y-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <MapPin size={18} />
              Destination
            </label>
            <input
              type="text"
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              placeholder="e.g., Jaipur, Rajasthan"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-navy text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-light-sky dark:focus:ring-dark-turquoise outline-none transition"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <DollarSign size={18} />
              Budget (₹)
            </label>
            <input
              type="number"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              placeholder="e.g., 25000"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-navy text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-light-sky dark:focus:ring-dark-turquoise outline-none transition"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Home size={18} />
              Accommodation Type
            </label>
            <select
              value={formData.accommodation}
              onChange={(e) => setFormData({ ...formData, accommodation: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-navy text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-light-sky dark:focus:ring-dark-turquoise outline-none transition"
            >
              <option value="hotel">Hotel</option>
              <option value="hostel">Hostel</option>
              <option value="guesthouse">Guesthouse</option>
              <option value="resort">Resort</option>
              <option value="homestay">Homestay</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              <Heart size={18} />
              Interests
            </label>
            <div className="flex flex-wrap gap-2">
              {interestOptions.map(interest => (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    formData.interests.includes(interest)
                      ? 'bg-gradient-to-r from-light-sky to-light-jade dark:from-dark-turquoise dark:to-dark-gold text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generateItinerary}
            disabled={loading || !formData.destination || !formData.budget}
            className="w-full py-4 bg-gradient-to-r from-light-sky to-light-jade dark:from-dark-turquoise dark:to-dark-gold text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Generating Your Perfect Itinerary...' : 'Generate AI Itinerary'}
          </button>
        </div>
      </div>

      {itinerary && (
        <div className="bg-white dark:bg-dark-slate rounded-xl p-8 shadow-lg animate-fade-in">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Your Personalized Itinerary</h3>

          <div className="space-y-6">
            {itinerary.days.map((day: any) => (
              <div key={day.day} className="border-l-4 border-light-sky dark:border-dark-turquoise pl-6">
                <h4 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  Day {day.day}: {day.title}
                </h4>
                <div className="space-y-3">
                  {day.activities.map((activity: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-start bg-gray-50 dark:bg-dark-navy p-3 rounded-lg">
                      <div>
                        <span className="text-sm font-medium text-light-sky dark:text-dark-turquoise">{activity.time}</span>
                        <p className="text-gray-800 dark:text-gray-200">{activity.activity}</p>
                      </div>
                      <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">₹{activity.cost}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Day Total: ₹{day.totalCost}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-light-sky/10 to-light-jade/10 dark:from-dark-turquoise/10 dark:to-dark-gold/10 rounded-lg">
            <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Travel Recommendations</h4>
            <ul className="space-y-2">
              {itinerary.recommendations.map((rec: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <span className="text-light-sky dark:text-dark-turquoise">•</span>
                  {rec}
                </li>
              ))}
            </ul>
            <div className="mt-4 text-xl font-bold text-gray-800 dark:text-gray-100">
              Estimated Total: ₹{itinerary.totalBudget}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
