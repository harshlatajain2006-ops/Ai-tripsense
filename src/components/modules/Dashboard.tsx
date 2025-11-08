import { useState } from 'react';
import {
  Home, Plane, Compass, Wrench, UtensilsCrossed,
  BookOpen, Languages, Award, Store, Shield, BookMarked,
  Moon, Sun, Menu, X
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import HomeModule from './modules/HomeModule';
import PlanTripModule from './modules/PlanTripModule';
import DiscoverModule from './modules/DiscoverModule';
import UtilitiesModule from './modules/UtilitiesModule';
import LocalFoodModule from './modules/LocalFoodModule';
import StorytellerModule from './modules/StorytellerModule';
import TranslationModule from './modules/TranslationModule';
import RewardsModule from './modules/RewardsModule';
import BusinessesModule from './modules/BusinessesModule';
import SafetyModule from './modules/SafetyModule';
import DiaryModule from './modules/DiaryModule';

const modules = [
  { id: 'home', name: 'Home', icon: Home, component: HomeModule },
  { id: 'plan', name: 'Plan Trip', icon: Plane, component: PlanTripModule },
  { id: 'discover', name: 'Discover', icon: Compass, component: DiscoverModule },
  { id: 'utilities', name: 'Utilities', icon: Wrench, component: UtilitiesModule },
  { id: 'food', name: 'Local Food', icon: UtensilsCrossed, component: LocalFoodModule },
  { id: 'storyteller', name: 'AI Storyteller', icon: BookOpen, component: StorytellerModule },
  { id: 'translation', name: 'Translation', icon: Languages, component: TranslationModule },
  { id: 'rewards', name: 'Rewards', icon: Award, component: RewardsModule },
  { id: 'businesses', name: 'Local Businesses', icon: Store, component: BusinessesModule },
  { id: 'safety', name: 'Safety Alert', icon: Shield, component: SafetyModule },
  { id: 'diary', name: 'Trip Diary', icon: BookMarked, component: DiaryModule },
];

export default function Dashboard() {
  const [activeModule, setActiveModule] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const ActiveComponent = modules.find(m => m.id === activeModule)?.component || HomeModule;

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-white via-light-sky/10 to-light-jade/20 dark:from-dark-slate dark:via-dark-navy dark:to-dark-navy/90 transition-colors duration-300">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-dark-slate/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-light-sky to-light-jade dark:from-dark-turquoise dark:to-dark-gold bg-clip-text text-transparent">
              AI TripSense
            </h1>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </div>

      <div className="flex pt-16">
        <aside className={`
          fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white/90 dark:bg-dark-slate/90 backdrop-blur-md
          border-r border-gray-200 dark:border-gray-700 overflow-y-auto transform transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          z-40
        `}>
          <nav className="p-4 space-y-2">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <button
                  key={module.id}
                  onClick={() => {
                    setActiveModule(module.id);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                    ${activeModule === module.id
                      ? 'bg-gradient-to-r from-light-sky to-light-jade dark:from-dark-turquoise dark:to-dark-gold text-white shadow-lg'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }
                  `}
                >
                  <Icon size={20} />
                  <span className="font-medium">{module.name}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto animate-fade-in">
            <ActiveComponent />
          </div>
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
