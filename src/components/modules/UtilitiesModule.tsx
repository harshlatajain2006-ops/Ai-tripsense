import { useState } from 'react';
import { ArrowRightLeft, Award, Bus, TrendingUp } from 'lucide-react';

export default function UtilitiesModule() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [amount, setAmount] = useState('');
  const [converted, setConverted] = useState<number | null>(null);

  const [distance, setDistance] = useState('');
  const [transportType, setTransportType] = useState('auto');
  const [fare, setFare] = useState<number | null>(null);

  const currencies = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'AUD', 'CAD', 'CNY'];

  const exchangeRates: Record<string, number> = {
    'USD-INR': 83.12,
    'EUR-INR': 90.45,
    'GBP-INR': 105.23,
    'INR-USD': 0.012,
    'USD-EUR': 0.92,
    'USD-GBP': 0.79,
  };

  const bestExchangeOffers = [
    { provider: 'State Bank of India', rate: 83.25, type: 'Bank', badge: 'Best Rate' },
    { provider: 'HDFC Bank', rate: 83.15, type: 'Bank', badge: '' },
    { provider: 'Thomas Cook', rate: 83.00, type: 'Exchange Office', badge: '' },
    { provider: 'ICICI Bank ATM', rate: 82.90, type: 'ATM', badge: 'Most Convenient' },
  ];

  const handleConvert = () => {
    const key = `${fromCurrency}-${toCurrency}`;
    const rate = exchangeRates[key] || 1;
    setConverted(parseFloat(amount) * rate);
  };

  const calculateFare = () => {
    const rates: Record<string, number> = {
      auto: 15,
      taxi: 25,
      bus: 5,
      metro: 10,
    };
    const baseFare: Record<string, number> = {
      auto: 30,
      taxi: 50,
      bus: 10,
      metro: 20,
    };

    const dist = parseFloat(distance);
    const fareAmount = baseFare[transportType] + (dist * rates[transportType]);
    setFare(fareAmount);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <ArrowRightLeft className="text-light-sky dark:text-dark-turquoise" size={32} />
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Travel Utilities</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-dark-slate rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <ArrowRightLeft size={24} />
            Currency Converter
          </h3>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-navy text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-light-sky dark:focus:ring-dark-turquoise outline-none transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">From</label>
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-navy text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-light-sky dark:focus:ring-dark-turquoise outline-none transition"
                >
                  {currencies.map(curr => (
                    <option key={curr} value={curr}>{curr}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">To</label>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-navy text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-light-sky dark:focus:ring-dark-turquoise outline-none transition"
                >
                  {currencies.map(curr => (
                    <option key={curr} value={curr}>{curr}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleConvert}
              disabled={!amount}
              className="w-full py-3 bg-gradient-to-r from-light-sky to-light-jade dark:from-dark-turquoise dark:to-dark-gold text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
            >
              Convert
            </button>

            {converted !== null && (
              <div className="mt-4 p-4 bg-gradient-to-r from-light-sky/10 to-light-jade/10 dark:from-dark-turquoise/10 dark:to-dark-gold/10 rounded-lg text-center">
                <div className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                  {converted.toFixed(2)} {toCurrency}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-dark-slate rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <Bus size={24} />
            Transport Fare Calculator
          </h3>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Distance (km)</label>
              <input
                type="number"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                placeholder="Enter distance"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-navy text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-light-sky dark:focus:ring-dark-turquoise outline-none transition"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Transport Type</label>
              <select
                value={transportType}
                onChange={(e) => setTransportType(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-navy text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-light-sky dark:focus:ring-dark-turquoise outline-none transition"
              >
                <option value="auto">Auto Rickshaw</option>
                <option value="taxi">Taxi</option>
                <option value="bus">Bus</option>
                <option value="metro">Metro</option>
              </select>
            </div>

            <button
              onClick={calculateFare}
              disabled={!distance}
              className="w-full py-3 bg-gradient-to-r from-light-sky to-light-jade dark:from-dark-turquoise dark:to-dark-gold text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
            >
              Calculate Fare
            </button>

            {fare !== null && (
              <div className="mt-4 p-4 bg-gradient-to-r from-light-sky/10 to-light-jade/10 dark:from-dark-turquoise/10 dark:to-dark-gold/10 rounded-lg text-center">
                <div className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                  ₹{fare.toFixed(2)}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Estimated fare</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-dark-slate rounded-xl p-8 shadow-lg">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <TrendingUp size={24} />
          Best Exchange Rates (USD to INR)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {bestExchangeOffers.map((offer, idx) => (
            <div
              key={idx}
              className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-light-sky dark:hover:border-dark-turquoise transition-colors relative"
            >
              {offer.badge && (
                <div className="absolute -top-3 left-4 px-3 py-1 bg-gradient-to-r from-light-sunrise to-light-jade dark:from-dark-gold dark:to-dark-turquoise text-white text-xs font-semibold rounded-full">
                  {offer.badge}
                </div>
              )}
              <div className="text-center">
                <div className="text-2xl font-bold text-light-sky dark:text-dark-turquoise mb-1">
                  ₹{offer.rate}
                </div>
                <div className="font-semibold text-gray-800 dark:text-gray-100 mb-1">{offer.provider}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{offer.type}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
