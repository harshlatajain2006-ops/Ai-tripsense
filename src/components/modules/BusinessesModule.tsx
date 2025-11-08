import { useState } from 'react';
import { Store, Star, Phone, MapPin, Send } from 'lucide-react';

const mockBusinesses = [
  {
    id: 1,
    name: 'Rajasthani Handicrafts',
    category: 'Artisan Shop',
    description: 'Authentic hand-made crafts, textiles, and traditional Rajasthani art',
    contact: '+91 98765 43210',
    location: 'Jodhpur, Rajasthan',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Mountain Trekking Guide',
    category: 'Local Guide',
    description: 'Experienced guide for Himalayan treks and mountain expeditions',
    contact: '+91 98765 43211',
    location: 'Manali, Himachal Pradesh',
    rating: 4.9,
  },
  {
    id: 3,
    name: 'Pottery Workshop',
    category: 'Workshop',
    description: 'Learn traditional pottery making from master craftsmen',
    contact: '+91 98765 43212',
    location: 'Pondicherry',
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Silk Weaving Cooperative',
    category: 'Artisan Shop',
    description: 'Fair-trade silk products directly from weavers',
    contact: '+91 98765 43213',
    location: 'Kanchipuram, Tamil Nadu',
    rating: 4.6,
  },
  {
    id: 5,
    name: 'Spice Farm Tours',
    category: 'Experience',
    description: 'Guided tours of organic spice plantations',
    contact: '+91 98765 43214',
    location: 'Munnar, Kerala',
    rating: 4.9,
  },
  {
    id: 6,
    name: 'Traditional Music School',
    category: 'Cultural Experience',
    description: 'Learn classical Indian music and instruments',
    contact: '+91 98765 43215',
    location: 'Varanasi, Uttar Pradesh',
    rating: 4.8,
  },
];

export default function BusinessesModule() {
  const [filter, setFilter] = useState('All');
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const categories = ['All', 'Artisan Shop', 'Local Guide', 'Workshop', 'Experience', 'Cultural Experience'];

  const filteredBusinesses = filter === 'All'
    ? mockBusinesses
    : mockBusinesses.filter(b => b.category === filter);

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent! The business will contact you soon.');
    setFormData({ name: '', email: '', message: '' });
    setSelectedBusiness(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <Store className="text-light-sky dark:text-dark-turquoise" size={32} />
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Local Businesses & Artisans</h2>
      </div>

      <div className="bg-white dark:bg-dark-slate rounded-xl p-6 shadow-lg">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Connect with authentic local businesses, artisans, and guides. Support local communities and experience genuine cultural exchanges.
        </p>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === category
                  ? 'bg-gradient-to-r from-light-sky to-light-jade dark:from-dark-turquoise dark:to-dark-gold text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBusinesses.map(business => (
          <div
            key={business.id}
            className="bg-white dark:bg-dark-slate rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-light-sky to-light-jade dark:from-dark-turquoise dark:to-dark-gold flex items-center justify-center text-white">
                <Store size={24} />
              </div>
              <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded-full">
                <Star size={14} className="text-yellow-600 dark:text-yellow-400 fill-current" />
                <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-400">{business.rating}</span>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">{business.name}</h3>
            <div className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 mb-3">
              {business.category}
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{business.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <MapPin size={16} />
                {business.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Phone size={16} />
                {business.contact}
              </div>
            </div>

            <button
              onClick={() => setSelectedBusiness(business)}
              className="w-full py-3 bg-gradient-to-r from-light-sky to-light-jade dark:from-dark-turquoise dark:to-dark-gold text-white font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              Contact & Book
            </button>
          </div>
        ))}
      </div>

      {selectedBusiness && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-dark-slate rounded-xl p-8 max-w-2xl w-full shadow-2xl animate-fade-in">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
              Contact {selectedBusiness.name}
            </h3>

            <form onSubmit={handleContact} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-navy text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-light-sky dark:focus:ring-dark-turquoise outline-none transition"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Your Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-navy text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-light-sky dark:focus:ring-dark-turquoise outline-none transition"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  placeholder="Tell them about your interests and preferences..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-navy text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-light-sky dark:focus:ring-dark-turquoise outline-none transition resize-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedBusiness(null)}
                  className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-light-sky to-light-jade dark:from-dark-turquoise dark:to-dark-gold text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
