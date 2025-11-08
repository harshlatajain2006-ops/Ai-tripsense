import { useState } from 'react';
import { UtensilsCrossed, Leaf, Drumstick, Star, MapPin } from 'lucide-react';

const mockFoods = [
  {
    id: 1,
    name: 'Masala Dosa',
    description: 'Crispy rice crepe filled with spiced potato mixture, served with sambar and chutney',
    type: 'veg',
    specialty: true,
    region: 'South India',
    image: 'https://images.pexels.com/photos/5410400/pexels-photo-5410400.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 2,
    name: 'Hyderabadi Biryani',
    description: 'Aromatic rice dish layered with tender meat, herbs, and authentic spices',
    type: 'non-veg',
    specialty: true,
    region: 'Hyderabad',
    image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 3,
    name: 'Paneer Tikka',
    description: 'Grilled cottage cheese chunks marinated in yogurt and spices',
    type: 'veg',
    specialty: false,
    region: 'North India',
    image: 'https://images.pexels.com/photos/12737654/pexels-photo-12737654.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 4,
    name: 'Kerala Fish Curry',
    description: 'Traditional fish curry cooked in coconut milk with authentic Kerala spices',
    type: 'non-veg',
    specialty: true,
    region: 'Kerala',
    image: 'https://images.pexels.com/photos/8753496/pexels-photo-8753496.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 5,
    name: 'Chole Bhature',
    description: 'Spicy chickpea curry served with fluffy deep-fried bread',
    type: 'veg',
    specialty: false,
    region: 'Punjab',
    image: 'https://images.pexels.com/photos/14676397/pexels-photo-14676397.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 6,
    name: 'Goan Prawn Curry',
    description: 'Tangy and spicy prawn curry with coconut and tamarind',
    type: 'non-veg',
    specialty: true,
    region: 'Goa',
    image: 'https://images.pexels.com/photos/7613568/pexels-photo-7613568.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 7,
    name: 'Gujarati Thali',
    description: 'Complete meal with variety of sweet and savory vegetarian dishes',
    type: 'veg',
    specialty: true,
    region: 'Gujarat',
    image: 'https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 8,
    name: 'Butter Chicken',
    description: 'Creamy tomato-based curry with tender chicken pieces',
    type: 'non-veg',
    specialty: false,
    region: 'Delhi',
    image: 'https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export default function LocalFoodModule() {
  const [filter, setFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [showSpecialty, setShowSpecialty] = useState(false);

  const filteredFoods = mockFoods.filter(food => {
    if (filter !== 'all' && food.type !== filter) return false;
    if (showSpecialty && !food.specialty) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <UtensilsCrossed className="text-light-sky dark:text-dark-turquoise" size={32} />
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Local Food Explorer</h2>
      </div>

      <div className="bg-white dark:bg-dark-slate rounded-xl p-6 shadow-lg">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-light-sky to-light-jade dark:from-dark-turquoise dark:to-dark-gold text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setFilter('veg')}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                filter === 'veg'
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Leaf size={18} />
              Vegetarian
            </button>
            <button
              onClick={() => setFilter('non-veg')}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                filter === 'non-veg'
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Drumstick size={18} />
              Non-Vegetarian
            </button>
          </div>

          <label className="flex items-center gap-2 ml-auto cursor-pointer">
            <input
              type="checkbox"
              checked={showSpecialty}
              onChange={(e) => setShowSpecialty(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-light-sky dark:text-dark-turquoise focus:ring-light-sky dark:focus:ring-dark-turquoise"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
              <Star size={16} className="text-yellow-500" />
              Specialties Only
            </span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredFoods.map(food => (
          <div
            key={food.id}
            className="bg-white dark:bg-dark-slate rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 cursor-pointer group"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                {food.type === 'veg' ? (
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Leaf size={14} />
                    Veg
                  </div>
                ) : (
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Drumstick size={14} />
                    Non-Veg
                  </div>
                )}
                {food.specialty && (
                  <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Star size={14} />
                    Specialty
                  </div>
                )}
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">{food.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">{food.description}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <MapPin size={16} />
                {food.region}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredFoods.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          No dishes found matching your criteria. Try adjusting your filters.
        </div>
      )}
    </div>
  );
}
