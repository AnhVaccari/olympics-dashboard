// TODO: create here a typescript interface for an olympic country

import { Parcipation } from './Participation';

export interface OlympicCountry {
  id: number;
  country: string;
  participations: Parcipation[];
}
