import { useState } from 'react';
import { Shield, AlertTriangle, Phone, MapPin, Navigation, AlertCircle } from 'lucide-react';

export default function SafetyModule() {
  const [alertActive, setAlertActive] = useState(false);
  const [emergencyMode, setEmergencyMode] = useState(false);

  const emergencyContacts = [
    { name: 'Police', number: '100', icon: Shield },
    { name: 'Ambulance', number: '108', icon: AlertCircle },
    { name: 'Fire Service', number: '101', icon: AlertTriangle },
    { name: 'Tourist Helpline', number: '1363', icon: Phone },
  ];

  const nearbyHelp = [
    { name: 'City Police Station', distance: '0.8 km', type: 'Police' },
    { name: 'District Hospital', distance: '1.2 km', type: 'Medical' },
    { name: 'Tourist Information Center', distance: '0.5 km', type: 'Tourist Help' },
    { name: 'Embassy Office', distance: '3.2 km', type: 'Embassy' },
  ];

  const handleSOS = () => {
    setEmergencyMode(true);
    setTimeout(() => {
      setAlertActive(true);
    }, 500);
  };

  const cancelSOS = () => {
    setEmergencyMode(false);
    setAlertActive(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="text-red-500" size={32} />
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Safety Alert System</h2>
      </div>

      <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-8 border-2 border-red-200 dark:border-red-800">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="text-red-600 dark:text-red-400" size={24} />
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Emergency SOS</h3>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          In case of emergency, press the SOS button. This will alert nearby authorities and emergency contacts.
        </p>

        {!emergencyMode ? (
          <button
            onClick={handleSOS}
            className="w-full py-6 bg-gradient-to-r from-red-500 to-red-600 text-white text-xl font-bold rounded-xl hover:shadow-2xl transition-all hover:scale-105 flex items-center justify-center gap-3"
          >
            <AlertCircle size={28} />
            PRESS FOR EMERGENCY SOS
          </button>
        ) : (
          <button
            onClick={cancelSOS}
            className="w-full py-6 bg-gray-600 text-white text-xl font-bold rounded-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3"
          >
            Cancel Emergency Alert
          </button>
        )}
      </div>

      {alertActive && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white dark:bg-dark-slate rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl animate-pulse">
            <div className="text-center">
              <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
                <AlertCircle size={48} className="text-white" />
              </div>
              <h3 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-4">EMERGENCY ALERT ACTIVE</h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                Emergency services have been notified. Help is on the way.
              </p>

              <div className="bg-gray-50 dark:bg-dark-navy rounded-xl p-6 mb-6">
                <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">Your Location Shared With:</h4>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <Shield size={18} className="text-blue-500" />
                    <span>Local Police (0.8 km away)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle size={18} className="text-red-500" />
                    <span>Emergency Medical Services</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={18} className="text-green-500" />
                    <span>Tourist Helpline</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {emergencyContacts.slice(0, 2).map((contact) => {
                  const Icon = contact.icon;
                  return (
                    <a
                      key={contact.name}
                      href={`tel:${contact.number}`}
                      className="p-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-xl transition-all flex flex-col items-center gap-2"
                    >
                      <Icon size={24} />
                      <span className="font-semibold">{contact.name}</span>
                      <span className="text-sm">{contact.number}</span>
                    </a>
                  );
                })}
              </div>

              <button
                onClick={cancelSOS}
                className="mt-6 px-8 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-all"
              >
                Cancel Alert
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {emergencyContacts.map((contact) => {
          const Icon = contact.icon;
          return (
            <a
              key={contact.name}
              href={`tel:${contact.number}`}
              className="bg-white dark:bg-dark-slate rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-center group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Icon className="text-red-600 dark:text-red-400" size={28} />
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">{contact.name}</h3>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">{contact.number}</div>
            </a>
          );
        })}
      </div>

      <div className="bg-white dark:bg-dark-slate rounded-xl p-8 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <MapPin className="text-light-sky dark:text-dark-turquoise" size={24} />
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Nearby Help Centers</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {nearbyHelp.map((place, idx) => (
            <div key={idx} className="p-4 bg-gray-50 dark:bg-dark-navy rounded-lg hover:shadow-md transition-all group cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">{place.name}</h4>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{place.type}</div>
                  <div className="flex items-center gap-2 text-sm text-light-sky dark:text-dark-turquoise">
                    <Navigation size={14} />
                    {place.distance}
                  </div>
                </div>
                <button className="px-4 py-2 bg-light-sky dark:bg-dark-turquoise text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all opacity-0 group-hover:opacity-100">
                  Navigate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-dark-slate rounded-xl p-8 shadow-lg">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Safety Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-800 dark:text-gray-100">General Safety</h4>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-light-sky dark:text-dark-turquoise">•</span>
                Keep emergency contacts saved in your phone
              </li>
              <li className="flex items-start gap-2">
                <span className="text-light-sky dark:text-dark-turquoise">•</span>
                Share your location with trusted contacts
              </li>
              <li className="flex items-start gap-2">
                <span className="text-light-sky dark:text-dark-turquoise">•</span>
                Keep copies of important documents
              </li>
              <li className="flex items-start gap-2">
                <span className="text-light-sky dark:text-dark-turquoise">•</span>
                Stay aware of your surroundings
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-gray-800 dark:text-gray-100">In Case of Emergency</h4>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-light-sky dark:text-dark-turquoise">•</span>
                Use the SOS button immediately
              </li>
              <li className="flex items-start gap-2">
                <span className="text-light-sky dark:text-dark-turquoise">•</span>
                Contact local authorities (100)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-light-sky dark:text-dark-turquoise">•</span>
                Seek help from nearby establishments
              </li>
              <li className="flex items-start gap-2">
                <span className="text-light-sky dark:text-dark-turquoise">•</span>
                Stay calm and follow official guidance
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
