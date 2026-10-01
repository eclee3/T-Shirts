export interface SimpleColor {
  id: 'black' | 'red' | 'white';
  name: string;
  hex: string;
  textColor: string;
  absorptivity: number;
  absorbPercent: number;
  simpleLesson: string;
}

export type KidMood = 'cool' | 'warm' | 'hot' | 'scorching';
