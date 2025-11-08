import { useState } from 'react';
import { Languages, Mic, Camera, Type } from 'lucide-react';

export default function TranslationModule() {
  const [mode, setMode] = useState<'text' | 'voice' | 'camera'>('text');
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [fromLang, setFromLang] = useState('en');
  const [toLang, setToLang] = useState('hi');
  const [isRecording, setIsRecording] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'ta', name: 'Tamil' },
    { code: 'te', name: 'Telugu' },
    { code: 'bn', name: 'Bengali' },
    { code: 'mr', name: 'Marathi' },
    { code: 'gu', name: 'Gujarati' },
    { code: 'kn', name: 'Kannada' },
    { code: 'ml', name: 'Malayalam' },
    { code: 'pa', name: 'Punjabi' },
  ];

  const handleTranslate = () => {
    const mockTranslations: Record<string, string> = {
      'hello': 'नमस्ते',
      'thank you': 'धन्यवाद',
      'how much does this cost': 'यह कितने का है',
      'where is the bathroom': 'बाथरूम कहाँ है',
      'i need help': 'मुझे मदद चाहिए',
    };

    const translation = mockTranslations[inputText.toLowerCase()] ||
      `[Translated: ${inputText}]`;
    setTranslatedText(translation);
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setInputText('Hello, can you help me?');
        setTranslatedText('नमस्ते, क्या आप मेरी मदद कर सकते हैं?');
      }, 2000);
    }
  };

  const handleCameraCapture = () => {
    setTimeout(() => {
      setTranslatedText('Menu items detected and translated:\n\n1. Paneer Butter Masala - पनीर बटर मसाला\n2. Dal Tadka - दाल तड़का\n3. Naan - नान');
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <Languages className="text-light-sky dark:text-dark-turquoise" size={32} />
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Live Translation</h2>
      </div>

      <div className="bg-white dark:bg-dark-slate rounded-xl p-6 shadow-lg">
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setMode('text')}
            className={`flex-1 py-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
              mode === 'text'
                ? 'bg-gradient-to-r from-light-sky to-light-jade dark:from-dark-turquoise dark:to-dark-gold text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <Type size={20} />
            Text Translation
          </button>
          <button
            onClick={() => setMode('voice')}
            className={`flex-1 py-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
              mode === 'voice'
                ? 'bg-gradient-to-r from-light-sky to-light-jade dark:from-dark-turquoise dark:to-dark-gold text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <Mic size={20} />
            Voice Translation
          </button>
          <button
            onClick={() => setMode('camera')}
            className={`flex-1 py-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
              mode === 'camera'
                ? 'bg-gradient-to-r from-light-sky to-light-jade dark:from-dark-turquoise dark:to-dark-gold text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <Camera size={20} />
            Camera Translation
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">From</label>
            <select
              value={fromLang}
              onChange={(e) => setFromLang(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-navy text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-light-sky dark:focus:ring-dark-turquoise outline-none transition"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">To</label>
            <select
              value={toLang}
              onChange={(e) => setToLang(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-navy text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-light-sky dark:focus:ring-dark-turquoise outline-none transition"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
          </div>
        </div>

        {mode === 'text' && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Enter Text</label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type text to translate..."
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-navy text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-light-sky dark:focus:ring-dark-turquoise outline-none transition resize-none"
              />
            </div>
            <button
              onClick={handleTranslate}
              disabled={!inputText}
              className="w-full py-3 bg-gradient-to-r from-light-sky to-light-jade dark:from-dark-turquoise dark:to-dark-gold text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
            >
              Translate
            </button>
          </div>
        )}

        {mode === 'voice' && (
          <div className="text-center space-y-6">
            <div className="py-12">
              <button
                onClick={handleVoiceRecord}
                className={`w-24 h-24 rounded-full ${
                  isRecording
                    ? 'bg-red-500 animate-pulse'
                    : 'bg-gradient-to-r from-light-sky to-light-jade dark:from-dark-turquoise dark:to-dark-gold'
                } text-white shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center mx-auto`}
              >
                <Mic size={36} />
              </button>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                {isRecording ? 'Recording... Speak now' : 'Tap to start recording'}
              </p>
            </div>
          </div>
        )}

        {mode === 'camera' && (
          <div className="text-center space-y-6">
            <div className="py-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
              <Camera size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Point your camera at text to translate
              </p>
              <button
                onClick={handleCameraCapture}
                className="px-8 py-3 bg-gradient-to-r from-light-sky to-light-jade dark:from-dark-turquoise dark:to-dark-gold text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                Capture & Translate
              </button>
            </div>
          </div>
        )}

        {translatedText && (
          <div className="mt-6 p-6 bg-gradient-to-r from-light-sky/10 to-light-jade/10 dark:from-dark-turquoise/10 dark:to-dark-gold/10 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Translation:</h4>
            <p className="text-2xl font-semibold text-gray-800 dark:text-gray-100 whitespace-pre-line">
              {translatedText}
            </p>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-dark-slate rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Common Phrases</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { en: 'Hello', hi: 'नमस्ते' },
            { en: 'Thank you', hi: 'धन्यवाद' },
            { en: 'How much?', hi: 'कितने का है?' },
            { en: 'Where is...?', hi: 'कहाँ है...?' },
            { en: 'Help me', hi: 'मदद करें' },
            { en: 'Water please', hi: 'पानी दीजिए' },
          ].map((phrase, idx) => (
            <div key={idx} className="p-3 bg-gray-50 dark:bg-dark-navy rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-gray-800 dark:text-gray-100">{phrase.en}</div>
                  <div className="text-lg text-light-sky dark:text-dark-turquoise">{phrase.hi}</div>
                </div>
                <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Mic size={18} className="text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
