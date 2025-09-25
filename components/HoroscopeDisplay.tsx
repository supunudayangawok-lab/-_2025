import React from 'react';
import { Horoscope, ZodiacSign } from '../types';

interface HoroscopeDisplayProps {
  sign: ZodiacSign;
  horoscope: Horoscope;
}

const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-red-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
    </svg>
);

const BriefcaseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v1H2a2 2 0 00-2 2v8a2 2 0 002 2h16a2 2 0 002-2V7a2 2 0 00-2-2h-2V4a2 2 0 00-2-2H6zm10 2H8v1h8V4zM4 6h12v8H4V6z" clipRule="evenodd" />
    </svg>
);

const HealthIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-green-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h.01a1 1 0 100-2H10zm3 0a1 1 0 000 2h.01a1 1 0 100-2H13z" clipRule="evenodd" />
    </svg>
);


const HoroscopeCard: React.FC<{ icon: React.ReactNode; title: string; text: string }> = ({ icon, title, text }) => (
    <div className="bg-gray-800/60 p-4 rounded-lg">
        <div className="flex items-center mb-2">
            {icon}
            <h3 className="text-xl font-bold text-indigo-300">{title}</h3>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed">{text}</p>
    </div>
);


const HoroscopeDisplay: React.FC<HoroscopeDisplayProps> = ({ sign, horoscope }) => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-indigo-500/20 rounded-xl p-6 w-full max-w-3xl space-y-6 animate-fade-in">
        <div className="text-center border-b border-indigo-500/20 pb-4">
            <h2 className="text-4xl font-bold text-white">{sign.name} {sign.symbol} ලග්න පලාපල</h2>
            <p className="text-indigo-200 mt-2">{horoscope.summary}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
            <HoroscopeCard icon={<HeartIcon />} title="ආදරය" text={horoscope.love} />
            <HoroscopeCard icon={<BriefcaseIcon />} title="වෘත්තීය" text={horoscope.career} />
            <HoroscopeCard icon={<HealthIcon />} title="සෞඛ්‍යය" text={horoscope.health} />
        </div>
    </div>
  );
};

export default HoroscopeDisplay;