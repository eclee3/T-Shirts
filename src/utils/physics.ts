import { SimpleColor, KidMood } from '../types';

export const AMBIENT_TEMP_F = 72;
export const AMBIENT_TEMP_C = 22.2;
export const MAX_MINUTES = 60;
export const THERMAL_TIME_CONSTANT = 18;

// Exactly 3 clear color choices for third graders:
// 1. Black (Absorbs the most heat!)
// 2. Red (Medium heat)
// 3. White (Reflects heat and stays cool!)
export const SIMPLE_COLORS: SimpleColor[] = [
  {
    id: 'black',
    name: 'Black Shirt',
    hex: '#18181b',
    textColor: '#FFFFFF',
    absorptivity: 0.95,
    absorbPercent: 95,
    simpleLesson: 'Black absorbs almost ALL the sun’s light and turns it into heat!'
  },
  {
    id: 'red',
    name: 'Red Shirt',
    hex: '#dc2626',
    textColor: '#FFFFFF',
    absorptivity: 0.60,
    absorbPercent: 60,
    simpleLesson: 'Red absorbs some colors of light, so it gets medium warm.'
  },
  {
    id: 'white',
    name: 'White Shirt',
    hex: '#ffffff',
    textColor: '#0f172a',
    absorptivity: 0.12,
    absorbPercent: 12,
    simpleLesson: 'White bounces the sunlight away like a mirror to keep you cool!'
  }
];

export function fahrenheitToCelsius(f: number): number {
  return ((f - 32) * 5) / 9;
}

export function calculateTemperatureAtMinute(absorptivity: number, minutes: number): { tempF: number; tempC: number } {
  const maxRiseF = 70 * absorptivity;
  const rise = maxRiseF * (1 - Math.exp(-minutes / THERMAL_TIME_CONSTANT));
  const tempF = Math.round((AMBIENT_TEMP_F + rise) * 10) / 10;
  const tempC = Math.round(fahrenheitToCelsius(tempF) * 10) / 10;
  return { tempF, tempC };
}

export function getKidMood(tempF: number): KidMood {
  if (tempF < 82) return 'cool';
  if (tempF < 98) return 'warm';
  if (tempF < 118) return 'hot';
  return 'scorching';
}

export function getKidStateDetails(mood: KidMood, colorName: string): {
  headline: string;
  speech: string;
  faceBg: string;
  badgeColor: string;
  icon: string;
} {
  switch (mood) {
    case 'cool':
      return {
        headline: 'Cool & Happy! 😊',
        speech: 'Ahhh! I feel so nice and cool in the sun!',
        faceBg: '#fed7aa', // healthy skin tone
        badgeColor: 'bg-sky-100 text-sky-800 border-sky-300',
        icon: '😎'
      };
    case 'warm':
      return {
        headline: 'Getting Warm 🌤️',
        speech: 'It’s starting to warm up outside!',
        faceBg: '#fecba1',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
        icon: '☀️'
      };
    case 'hot':
      return {
        headline: 'Sweating & Hot! 🥵',
        speech: `Whew! My ${colorName} is soaking up heat! I need some shade!`,
        faceBg: '#fca5a5', // pink flushed
        badgeColor: 'bg-orange-100 text-orange-800 border-orange-300',
        icon: '🔥'
      };
    case 'scorching':
      return {
        headline: 'MELTING HOT! 🆘',
        speech: `YIKES! My black shirt absorbed SO MUCH sun heat! I’m roasting!`,
        faceBg: '#f87171', // bright red flushed
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 animate-pulse',
        icon: '🌋'
      };
  }
}
