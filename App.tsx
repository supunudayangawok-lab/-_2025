import React, { useState, useCallback, useMemo } from 'react';
import { Horoscope, ZodiacSign, PersonalDetails, PersonalizedHoroscope } from './types';
import { generateHoroscope, generatePersonalizedHoroscope } from './services/geminiService';
import Header from './Header';
import ZodiacSelector from './components/ZodiacSelector';
import HoroscopeDisplay from './components/HoroscopeDisplay';
import Loader from './components/Loader';
import PersonalizedForm from './components/PersonalizedForm';
import PersonalizedDisplay from './components/PersonalizedDisplay';

const App: React.FC = () => {
  const [mode, setMode] = useState<'daily' | 'personalized'>('daily');
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | null>(null);
  const [horoscope, setHoroscope] = useState<Horoscope | null>(null);
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({ name: '', dateOfBirth: '', timeOfBirth: '', placeOfBirth: '' });
  const [personalizedHoroscope, setPersonalizedHoroscope] = useState<PersonalizedHoroscope | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handlePersonalDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalDetails(prev => ({ ...prev, [name]: value }));
  };
  
  const isPersonalizedFormValid = useMemo(() => {
    // FIX: Added a type guard `typeof field === 'string'` to ensure that the `field` variable is a string before calling `.trim()` on it. This resolves the TypeScript error "Property 'trim' does not exist on type 'unknown'" which can occur if the compiler cannot infer the type from `Object.values()`.
    return Object.values(personalDetails).every(field => typeof field === 'string' && field.trim() !== '');
  }, [personalDetails]);

  const handleGenerateHoroscope = useCallback(async () => {
    if (!selectedSign) {
      setError("කරුණාකර පළමුව ලග්නයක් තෝරන්න.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setHoroscope(null);

    try {
      const result = await generateHoroscope(selectedSign);
      setHoroscope(result);
    } catch (err: any) {
      setError(err.message || "නොදන්නා දෝෂයක් ඇතිවිය.");
    } finally {
      setIsLoading(false);
    }
  }, [selectedSign]);

  const handleGeneratePersonalizedHoroscope = useCallback(async () => {
    if (!isPersonalizedFormValid) {
      setError("කරුණාකර සියලුම විස්තර ඇතුලත් කරන්න.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setPersonalizedHoroscope(null);

    try {
      const result = await generatePersonalizedHoroscope(personalDetails);
      setPersonalizedHoroscope(result);
    } catch (err: any) {
      setError(err.message || "නොදන්නා දෝෂයක් ඇතිවිය.");
    } finally {
      setIsLoading(false);
    }
  }, [personalDetails, isPersonalizedFormValid]);

  const handleReset = () => {
    setSelectedSign(null);
    setHoroscope(null);
    setPersonalizedHoroscope(null);
    setError(null);
    setIsLoading(false);
  }

  const isSelectionScreen = !horoscope && !personalizedHoroscope;

  const baseButtonClass = "px-8 py-3 text-white font-bold rounded-full transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-4";
  const primaryButtonClass = `${baseButtonClass} bg-purple-600 hover:bg-purple-700 focus:ring-purple-500/50 hover:scale-105`;
  const disabledButtonClass = "disabled:bg-gray-600 disabled:cursor-not-allowed disabled:scale-100";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black text-white font-sans flex flex-col items-center p-4">
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
        }
      `}</style>
      
      <div className="w-full max-w-4xl mx-auto">
        <Header />
        
        <main className="flex flex-col items-center mt-6 space-y-8">
          {isSelectionScreen && !isLoading && (
            <div className="w-full animate-fade-in">
              <div className="flex justify-center p-1 bg-gray-800/50 rounded-full mb-8 max-w-sm mx-auto">
                <button
                  onClick={() => setMode('daily')}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${mode === 'daily' ? 'bg-purple-600 text-white' : 'text-indigo-200 hover:bg-gray-700/50'}`}
                >
                  දෛනික පලාපල
                </button>
                <button
                  onClick={() => setMode('personalized')}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${mode === 'personalized' ? 'bg-purple-600 text-white' : 'text-indigo-200 hover:bg-gray-700/50'}`}
                >
                  පෞද්ගලික කේන්දරය
                </button>
              </div>

              {mode === 'daily' && (
                <div className="text-center flex flex-col items-center space-y-6">
                  <h2 className="text-2xl font-semibold text-indigo-200">ඔබේ ලග්නය තෝරන්න</h2>
                  <ZodiacSelector selectedSign={selectedSign} onSignSelect={setSelectedSign} disabled={isLoading} />
                  {selectedSign && (
                    <button
                      onClick={handleGenerateHoroscope}
                      disabled={isLoading}
                      className={`${primaryButtonClass} ${disabledButtonClass}`}
                    >
                      මගේ පලාපල බලන්න
                    </button>
                  )}
                </div>
              )}

              {mode === 'personalized' && (
                <div className="flex flex-col items-center space-y-6">
                  <PersonalizedForm details={personalDetails} onDetailsChange={handlePersonalDetailsChange} disabled={isLoading} />
                  <button onClick={handleGeneratePersonalizedHoroscope} disabled={!isPersonalizedFormValid || isLoading} className={`${primaryButtonClass} ${disabledButtonClass}`}>
                    මගේ කේන්දරය සාදන්න
                  </button>
                </div>
              )}
            </div>
          )}

          {isLoading && <Loader />}
          
          {error && !isLoading &&(
            <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg relative max-w-md text-center animate-fade-in" role="alert">
              <strong className="font-bold">අනේ! </strong>
              <span className="block sm:inline">{error}</span>
               <button onClick={handleReset} className="mt-4 px-4 py-2 bg-red-700 text-white font-semibold rounded-full hover:bg-red-800">නැවත උත්සහ කරන්න</button>
            </div>
          )}

          {horoscope && selectedSign && !isLoading && (
            <div className="w-full flex flex-col items-center space-y-6 animate-fade-in">
                <HoroscopeDisplay sign={selectedSign} horoscope={horoscope} />
                <button
                  onClick={handleReset}
                  className="px-6 py-2 bg-indigo-700 text-white font-semibold rounded-full hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition-all duration-300 ease-in-out"
                >
                  වෙනත් ලග්නයක් තෝරන්න
                </button>
            </div>
          )}

          {personalizedHoroscope && !isLoading && (
            <div className="w-full flex flex-col items-center space-y-6 animate-fade-in">
              <PersonalizedDisplay details={personalDetails} horoscope={personalizedHoroscope} />
              <button
                onClick={handleReset}
                className="px-6 py-2 bg-indigo-700 text-white font-semibold rounded-full hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition-all duration-300 ease-in-out"
              >
                වෙනත් කේන්දරයක් සාදන්න
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;