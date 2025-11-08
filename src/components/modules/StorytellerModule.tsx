import { useState } from 'react';
import { BookOpen, Sparkles, MapPin, Calendar } from 'lucide-react';

export default function StorytellerModule() {
  const [query, setQuery] = useState('');
  const [story, setStory] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const popularTopics = [
    'Taj Mahal',
    'Hampi Ruins',
    'Kerala Backwaters',
    'Ajanta Caves',
    'Golden Temple',
    'Holi Festival',
  ];

  const generateStory = (topic?: string) => {
    const searchTopic = topic || query;
    if (!searchTopic) return;

    setLoading(true);

    const stories: Record<string, any> = {
      'Taj Mahal': {
        title: 'The Taj Mahal: A Monument of Eternal Love',
        era: 'Built 1632-1653',
        location: 'Agra, Uttar Pradesh',
        story: `The Taj Mahal stands as one of the world's most magnificent monuments, built by Mughal Emperor Shah Jahan in memory of his beloved wife, Mumtaz Mahal, who died during childbirth in 1631.

Heartbroken by her loss, Shah Jahan commissioned the finest architects and craftsmen from across Asia to create a mausoleum worthy of his eternal love. Over 20,000 artisans worked tirelessly for 22 years to complete this masterpiece of Mughal architecture.

The structure combines elements from Persian, Islamic, and Indian architectural styles. Its perfect symmetry and the way it appears to change colors throughout the day—from pink in the morning to golden at sunset—has captivated visitors for centuries.

The complex includes beautiful gardens, a mosque, and a guest house. The main dome rises to 240 feet, and the entire structure is adorned with precious stones and intricate calligraphy from the Quran.`,
        travelTips: [
          'Visit at sunrise for the most magical views and fewer crowds',
          'Book tickets online in advance to avoid long queues',
          'The monument is closed on Fridays',
          'Photography is allowed outside but not inside the main mausoleum',
          'Plan to spend 2-3 hours exploring the entire complex',
        ],
      },
      default: {
        title: `${searchTopic}: A Journey Through Time`,
        era: 'Historical Site',
        location: 'India',
        story: `${searchTopic} represents a fascinating piece of India's rich cultural heritage. This site has witnessed centuries of history, serving as a testament to the architectural brilliance and cultural sophistication of ancient civilizations.

The story behind ${searchTopic} is woven with legends passed down through generations. Local communities have preserved tales of its origin, each adding to the mystique and allure of this remarkable place.

Visitors today can still sense the echoes of the past as they explore this historic site. The intricate details, artistic expressions, and structural marvels speak volumes about the craftsmanship and dedication of those who created it.

The significance of ${searchTopic} extends beyond its physical beauty. It represents the confluence of various cultural influences, religious beliefs, and artistic traditions that have shaped the region's identity over millennia.`,
        travelTips: [
          'Hire a local guide to understand the full historical context',
          'Visit during off-peak hours for a more intimate experience',
          'Respect local customs and dress modestly',
          'Bring water and sun protection',
          'Allow at least 2-3 hours for your visit',
        ],
      },
    };

    setTimeout(() => {
      const selectedStory = stories[searchTopic] || stories.default;
      setStory(selectedStory);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="text-light-sky dark:text-dark-turquoise" size={32} />
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">AI Storyteller & Guide</h2>
      </div>

      <div className="bg-white dark:bg-dark-slate rounded-xl p-8 shadow-lg">
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Discover the fascinating stories behind monuments, traditions, and cultural sites.
          Enter any place or tradition to uncover its rich history and travel guidance.
        </p>

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && generateStory()}
            placeholder="Enter a monument, site, or tradition..."
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-navy text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-light-sky dark:focus:ring-dark-turquoise outline-none transition"
          />
          <button
            onClick={() => generateStory()}
            disabled={loading || !query}
            className="px-8 py-3 bg-gradient-to-r from-light-sky to-light-jade dark:from-dark-turquoise dark:to-dark-gold text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
          >
            <Sparkles size={20} />
            {loading ? 'Loading...' : 'Tell Story'}
          </button>
        </div>

        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Popular Topics:</p>
          <div className="flex flex-wrap gap-2">
            {popularTopics.map(topic => (
              <button
                key={topic}
                onClick={() => {
                  setQuery(topic);
                  generateStory(topic);
                }}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>

      {story && (
        <div className="bg-white dark:bg-dark-slate rounded-xl p-8 shadow-lg animate-fade-in">
          <div className="mb-6">
            <h3 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">{story.title}</h3>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                {story.era}
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                {story.location}
              </div>
            </div>
          </div>

          <div className="prose max-w-none mb-8">
            {story.story.split('\n\n').map((paragraph: string, idx: number) => (
              <p key={idx} className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h4 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100 flex items-center gap-2">
              <Sparkles size={20} className="text-light-sunrise dark:text-dark-gold" />
              Travel Tips & Guidance
            </h4>
            <ul className="space-y-3">
              {story.travelTips.map((tip: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <span className="text-light-sky dark:text-dark-turquoise mt-1">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
