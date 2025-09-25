import React from 'react';
import { PersonalDetails } from '../types';

interface PersonalizedFormProps {
  details: PersonalDetails;
  onDetailsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

const PersonalizedForm: React.FC<PersonalizedFormProps> = ({ details, onDetailsChange, disabled }) => {
  const inputStyle = "w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition disabled:opacity-50";

  return (
    <div className="w-full max-w-md p-6 bg-gray-800/50 border border-gray-700 rounded-lg space-y-4 animate-fade-in text-left">
      <h2 className="text-xl font-semibold text-center text-indigo-200 mb-4">ඔබේ විස්තර ඇතුලත් කරන්න</h2>
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-indigo-300 mb-1">නම</label>
        <input type="text" id="name" name="name" value={details.name} onChange={onDetailsChange} className={inputStyle} disabled={disabled} required />
      </div>

      <div>
        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-indigo-300 mb-1">උපන් දිනය</label>
        <input type="date" id="dateOfBirth" name="dateOfBirth" value={details.dateOfBirth} onChange={onDetailsChange} className={inputStyle} disabled={disabled} required />
      </div>

      <div>
        <label htmlFor="timeOfBirth" className="block text-sm font-medium text-indigo-300 mb-1">උපන් වේලාව</label>
        <input type="time" id="timeOfBirth" name="timeOfBirth" value={details.timeOfBirth} onChange={onDetailsChange} className={inputStyle} disabled={disabled} required />
      </div>
      
      <div>
        <label htmlFor="placeOfBirth" className="block text-sm font-medium text-indigo-300 mb-1">උපන් ස්ථානය</label>
        <input type="text" id="placeOfBirth" name="placeOfBirth" value={details.placeOfBirth} onChange={onDetailsChange} className={inputStyle} placeholder="උදා: කොළඹ, ශ්‍රී ලංකාව" disabled={disabled} required />
      </div>
    </div>
  );
};

export default PersonalizedForm;
