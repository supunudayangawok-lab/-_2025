
import React from 'react';
import { ZODIAC_SIGNS } from '../constants';
import { ZodiacSign } from '../types';

interface ZodiacSelectorProps {
  selectedSign: ZodiacSign | null;
  onSignSelect: (sign: ZodiacSign) => void;
  disabled: boolean;
}

const ZodiacSelector: React.FC<ZodiacSelectorProps> = ({ selectedSign, onSignSelect, disabled }) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 p-4">
      {ZODIAC_SIGNS.map((sign) => {
        const isSelected = selectedSign?.name === sign.name;
        return (
          <button
            key={sign.name}
            onClick={() => onSignSelect(sign)}
            disabled={disabled}
            className={`
              flex flex-col items-center justify-center p-4 rounded-lg 
              border-2 transition-all duration-300 ease-in-out transform
              focus:outline-none focus:ring-4 focus:ring-purple-500/50
              ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-105 hover:border-purple-400'}
              ${isSelected 
                ? 'bg-indigo-900/50 border-purple-400 shadow-[0_0_15px_rgba(167,139,250,0.6)]' 
                : 'bg-gray-800/50 border-gray-700'}
            `}
          >
            <span className="text-5xl mb-2">{sign.symbol}</span>
            <span className="font-bold text-white text-sm">{sign.name}</span>
            <span className="text-xs text-indigo-300">{sign.dateRange}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ZodiacSelector;
