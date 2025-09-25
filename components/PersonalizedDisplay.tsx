import React from 'react';
import { PersonalizedHoroscope, PersonalDetails } from '../types';

interface PersonalizedDisplayProps {
  details: PersonalDetails;
  horoscope: PersonalizedHoroscope;
}

const IntroductionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L11 12l4.293 4.293a1 1 0 01-1.414 1.414L10 13.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 12 4.293 7.707a1 1 0 011.414-1.414L10 10.586l4.293-4.293a1 1 0 011.414 0z" />
  </svg>
);

const PersonalityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const LifePathIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const PlanetsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118L2.05 10.1c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const AdviceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);


const HoroscopeSection: React.FC<{ icon: React.ReactNode; title: string; text: string }> = ({ icon, title, text }) => (
    <div className="bg-gray-800/60 p-4 rounded-lg">
        <div className="flex items-center mb-2">
            {icon}
            <h3 className="text-xl font-bold text-indigo-300">{title}</h3>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{text}</p>
    </div>
);


const PersonalizedDisplay: React.FC<PersonalizedDisplayProps> = ({ details, horoscope }) => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-indigo-500/20 rounded-xl p-6 w-full max-w-3xl space-y-6 animate-fade-in">
      <div className="text-center border-b border-indigo-500/20 pb-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white">{details.name} ගේ ජන්ම පත්‍ර විಶ್ලේෂණය</h2>
        <div className="mt-3 bg-indigo-900/40 inline-block px-4 py-1 rounded-full">
            <p className="text-xl font-semibold text-purple-300">ලග්නය: {horoscope.lagnaya}</p>
        </div>
        <p className="text-indigo-200 mt-3">ඔබේ උපන් තොරතුරු මත පදනම් වූ සත්‍ය විග්‍රහයක්</p>
      </div>
      <div className="space-y-4">
        <HoroscopeSection icon={<IntroductionIcon />} title="හැඳින්වීම" text={horoscope.introduction} />
        <HoroscopeSection icon={<PersonalityIcon />} title="පුද්ගල ලක්ෂණ" text={horoscope.personalityTraits} />
        <HoroscopeSection icon={<LifePathIcon />} title="ජීවන ගමන් මග" text={horoscope.lifePath} />
        <HoroscopeSection icon={<PlanetsIcon />} title="ග්‍රහ බලපෑම්" text={horoscope.planetaryInfluences} />
        <HoroscopeSection icon={<AdviceIcon />} title="උපදෙස්" text={horoscope.advice} />
      </div>
    </div>
  );
};

export default PersonalizedDisplay;