import type { LocationInfo } from './location-info';

export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Male' | 'Female' | 'Genderless' | 'unknown';
  origin: LocationInfo;
  location: LocationInfo;
  image: string;
  episode: string[];
  url: string;
  created: string;
}
