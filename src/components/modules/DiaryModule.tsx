import { useState, useEffect } from 'react';
import { BookMarked, MapPin, Calendar, Image, Plus, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface DiaryEntry {
  id: string;
  place_name: string;
  notes: string;
  photos: string[];
  visited_date: string;
  created_at: string;
}

export default function DiaryModule() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    place_name: '',
    notes: '',
    visited_date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    const mockEntries: DiaryEntry[] = [
      {
        id: '1',
        place_name: 'Taj Mahal, Agra',
        notes: 'Absolutely breathtaking at sunrise. The marble seemed to glow pink and orange. Met a wonderful local guide who shared stories about Shah Jahan. The symmetry and craftsmanship is beyond words.',
        photos: [],
        visited_date: '2024-11-05',
        created_at: '2024-11-05',
      },
      {
        id: '2',
        place_name: 'Kerala Backwaters',
        notes: 'Peaceful houseboat journey through the canals. Tried authentic Kerala fish curry. The sunset over the water was magical. Locals were incredibly welcoming.',
        photos: [],
        visited_date: '2024-11-03',
        created_at: '2024-11-03',
      },
      {
        id: '3',
        place_name: 'Jaipur City Palace',
        notes: 'Rich history and stunning architecture. The museum collection is impressive. Spent hours exploring the courtyards. The pink city views from the palace were spectacular.',
        photos: [],
        visited_date: '2024-11-01',
        created_at: '2024-11-01',
      },
    ];

    setEntries(mockEntries);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newEntry: DiaryEntry = {
      id: Date.now().toString(),
      place_name: formData.place_name,
      notes: formData.notes,
      photos: [],
      visited_date: formData.visited_date,
      created_at: new Date().toISOString(),
    };

    setEntries([newEntry, ...entries]);

    await supabase.from('trip_diary_entries').insert({
      user_id: 'demo_user',
      place_name: formData.place_name,
      notes: formData.notes,
      visited_date: formData.visited_date,
    });

    setFormData({
      place_name: '',
      notes: '',
      visited_date: new Date().toISOString().split('T')[0],
    });
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      setEntries(entries.filter(e => e.id !== id));
      await supabase.from('trip_diary_entries').delete().eq('id', id);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <BookMarked className="text-light-sky dark:text-dark-turquoise" size={32} />
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Trip Diary</h2>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-gradient-to-r from-light-sky to-light-jade dark:from-dark-turquoise dark:to-dark-gold text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
        >
          <Plus size={20} />
          New Entry
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-dark-slate rounded-xl p-8 shadow-lg animate-fade-in">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Add New Entry</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <MapPin size={18} />
                Place Name
              </label>
              <input
                type="text"
                value={formData.place_name}
                onChange={(e) => setFormData({ ...formData, place_name: e.target.value })}
                required
                placeholder="e.g., Taj Mahal, Agra"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-navy text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-light-sky dark:focus:ring-dark-turquoise outline-none transition"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Calendar size={18} />
                Visit Date
              </label>
              <input
                type="date"
                value={formData.visited_date}
                onChange={(e) => setFormData({ ...formData, visited_date: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-navy text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-light-sky dark:focus:ring-dark-turquoise outline-none transition"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <BookMarked size={18} />
                Your Notes & Memories
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                required
                rows={6}
                placeholder="Write about your experience, what you saw, who you met, how you felt..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-navy text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-light-sky dark:focus:ring-dark-turquoise outline-none transition resize-none"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Image size={18} />
                Add Photos (Coming Soon)
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center text-gray-500 dark:text-gray-400">
                <Image size={48} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">Photo upload feature coming soon</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-gradient-to-r from-light-sky to-light-jade dark:from-dark-turquoise dark:to-dark-gold text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                Save Entry
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-6">
        {entries.length === 0 ? (
          <div className="bg-white dark:bg-dark-slate rounded-xl p-12 shadow-lg text-center">
            <BookMarked size={64} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
              Start Your Travel Journal
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Document your adventures, save memories, and relive your experiences
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="px-8 py-3 bg-gradient-to-r from-light-sky to-light-jade dark:from-dark-turquoise dark:to-dark-gold text-white font-semibold rounded-lg hover:shadow-lg transition-all inline-flex items-center gap-2"
            >
              <Plus size={20} />
              Create First Entry
            </button>
          </div>
        ) : (
          entries.map(entry => (
            <div
              key={entry.id}
              className="bg-white dark:bg-dark-slate rounded-xl p-8 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                    {entry.place_name}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      {new Date(entry.visited_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {entry.notes}
                </p>
              </div>

              {entry.photos && entry.photos.length > 0 && (
                <div className="mt-6 grid grid-cols-3 gap-4">
                  {entry.photos.map((photo, idx) => (
                    <div
                      key={idx}
                      className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden"
                    >
                      <img src={photo} alt={`Memory ${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {entries.length > 0 && (
        <div className="bg-gradient-to-r from-light-sky/10 to-light-jade/10 dark:from-dark-turquoise/10 dark:to-dark-gold/10 rounded-xl p-6 text-center">
          <p className="text-gray-700 dark:text-gray-300 font-medium">
            You have {entries.length} {entries.length === 1 ? 'memory' : 'memories'} saved in your travel diary
          </p>
        </div>
      )}
    </div>
  );
}
