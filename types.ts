
// FIX: Updated ZodiacSignName to use Sinhala names to match the data in constants.ts and fix type errors.
export type ZodiacSignName =
  | 'මේෂ'
  | 'වෘෂභ'
  | 'මිථුන'
  | 'කටක'
  | 'සිංහ'
  | 'කන්‍යා'
  | 'තුලා'
  | 'වෘශ්චික'
  | 'ධනු'
  | 'මකර'
  | 'කුම්භ'
  | 'මීන';

export interface ZodiacSign {
  name: ZodiacSignName;
  symbol: string;
  dateRange: string;
}

export interface Horoscope {
  summary: string;
  love: string;
  career: string;
  health: string;
}

export interface PersonalDetails {
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
}

export interface PersonalizedHoroscope {
  introduction: string;
  personalityTraits: string;
  lifePath: string;
  planetaryInfluences: string;
  advice: string;
}
