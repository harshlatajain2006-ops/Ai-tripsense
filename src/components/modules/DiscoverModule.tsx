import { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Star } from 'lucide-react';

const mockPlaces = [
  {
    id: 1,
    name: 'Hidden Waterfall Trek',
    description: 'A secret waterfall nestled in the hills, known only to locals',
    category: 'Adventure',
    location: 'Coorg, Karnataka',
    image: 'https://images.pexels.com/photos/2166927/pexels-photo-2166927.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Nature', 'Adventure', 'Hidden Gem'],
  },
  {
    id: 2,
    name: 'Ancient Temple Complex',
    description: 'UNESCO heritage site with stunning architecture dating back 1000 years',
    category: 'Culture',
    location: 'Hampi, Karnataka',
    image: 'https://images.pexels.com/photos/2449543/pexels-photo-2449543.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['History', 'Culture', 'Heritage'],
  },
  {
    id: 3,
    name: 'Sunrise Mountain Peak',
    description: 'Witness breathtaking sunrise views from this majestic peak',
    category: 'Nature',
    location: 'Munnar, Kerala',
    image: 'https://images.pexels.com/photos/1562/italian-landscape-mountains-nature.jpg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Nature', 'Adventure', 'Photography'],
  },
  {
    id: 4,
    name: 'Local Artisan Village',
    description: 'Experience traditional crafts and meet local artisans at work',
    category: 'Culture',
    location: 'Raghurajpur, Odisha',
    image: 'https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Culture', 'Art', 'Shopping'],
  },
  {
    id: 5,
    name: 'Coastal Cave Exploration',
    description: 'Explore mysterious caves carved by the sea over millennia',
    category: 'Adventure',
    location: 'Gokarna, Karnataka',
    image: 'https://images.pexels.com/photos/531321/pexels-photo-531321.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Adventure', 'Nature', 'Exploration'],
  },
  {
    id: 6,
    name: 'Traditional Music Festival',
    description: 'Annual celebration of classical music and dance performances',
    category: 'Events',
    location: 'Chennai, Tamil Nadu',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Culture', 'Events', 'Music'],
  },
];

export default function DiscoverModule() {
  const [places, setPlaces] = useState(mockPlaces);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Adventure', 'Culture', 'Nature', 'Events', 'Hidden Gem'];

  useEffect(() => {
    let filtered = mockPlaces;

    if (filter !== 'All') {
      filtered = filtered.filter(
        place => place.category === filter || place.tags.includes(filter)
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(
        place =>
          place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          place.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          place.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setPlaces(filtered);
  }, [filter, searchQuery]);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <Search className="text-light-sky dark:text-dark-turquoise" size={32} />
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Discover Amazing Places</h2>
      </div>

      <div className="bg-white dark:bg-dark-slate rounded-xl p-6 shadow-lg space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search destinations, activities, or locations..."
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-navy text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-light-sky dark:focus:ring-dark-turquoise outline-none transition"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter size={20} className="text-gray-500 dark:text-gray-400" />
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {places.map(place => (
          <div
            key={place.id}
            className="bg-white dark:bg-dark-slate rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 cursor-pointer group"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={place.image}
                alt={place.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3 bg-white/90 dark:bg-dark-slate/90 px-3 py-1 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300">
                {place.category}
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">{place.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{place.description}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                <MapPin size={16} />
                {place.location}
              </div>
              <div className="flex flex-wrap gap-2">
                {place.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {places.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          No places found matching your criteria. Try adjusting your filters.
        </div>
      )}
    </div>
  );
}
