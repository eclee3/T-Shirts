import { KidMood } from '../types';

interface ThermometerProps {
  tempF: number;
  tempC: number;
  tempUnit: 'F' | 'C';
  mood: KidMood;
}

export function Thermometer({ tempF, tempC, tempUnit, mood }: ThermometerProps) {
  const displayVal = tempUnit === 'F' ? tempF : tempC;

  // Percentage height (Range: 65°F to 145°F)
  const minF = 65;
  const maxF = 145;
  const clampedF = Math.max(minF, Math.min(maxF, tempF));
  const mercuryPct = ((clampedF - minF) / (maxF - minF)) * 100;

  // Liquid color based on mood
  let liquidColor = '#0284c7'; // Cool blue
  if (mood === 'warm') liquidColor = '#eab308'; // Warm yellow-amber
  if (mood === 'hot') liquidColor = '#ea580c'; // Hot orange
  if (mood === 'scorching') liquidColor = '#dc2626'; // Scorching red

  return (
    <div className="bg-white rounded-3xl border-2 border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col items-center justify-between">
      <div className="w-full text-center mb-1">
        <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
          Shirt Temperature
        </div>
        <div className="text-3xl sm:text-4xl font-black font-mono tabular-nums text-slate-900 tracking-tight">
          {displayVal.toFixed(1)}°{tempUnit}
        </div>
        <div className="text-xs font-semibold text-slate-400">
          ({tempUnit === 'F' ? `${tempC.toFixed(1)}°C` : `${tempF.toFixed(1)}°F`})
        </div>
      </div>

      {/* Thermometer Stem & Bulb */}
      <div className="relative my-4 flex items-center gap-6">
        <div className="relative flex flex-col items-center">
          {/* Glass Top Tip */}
          <div className="w-6 h-3 rounded-t-full bg-slate-200 border-t border-x border-slate-300" />

          {/* Tube */}
          <div className="relative w-6 h-52 bg-slate-100 rounded-t-none border-x-2 border-slate-300 overflow-hidden flex flex-col justify-end shadow-inner">
            {/* Ticks */}
            <div className="absolute inset-y-0 right-0 w-2.5 flex flex-col justify-between py-2 text-[8px] font-mono text-slate-400 select-none pointer-events-none">
              <span className="border-t-2 border-slate-300 w-full" />
              <span className="border-t-2 border-slate-300 w-full" />
              <span className="border-t-2 border-slate-300 w-full" />
              <span className="border-t-2 border-slate-300 w-full" />
              <span className="border-t-2 border-slate-300 w-full" />
            </div>

            {/* Rising Liquid Column */}
            <div
              className="w-full transition-all duration-300 ease-out rounded-t-sm"
              style={{
                height: `${Math.max(8, mercuryPct)}%`,
                backgroundColor: liquidColor
              }}
            />
          </div>

          {/* Bulb */}
          <div
            className="w-11 h-11 rounded-full border-2 border-slate-300 -mt-2.5 z-10 flex items-center justify-center shadow-md transition-colors duration-300"
            style={{ backgroundColor: liquidColor }}
          >
            <div className="w-4 h-4 rounded-full bg-white/40" />
          </div>
        </div>

        {/* Third-Grade Friendly Temperature Scale Labels */}
        <div className="flex flex-col justify-between h-56 py-2 text-xs font-extrabold text-slate-600">
          <div className="flex items-center gap-2">
            <span className="text-base">🌋</span>
            <span className={mood === 'scorching' ? 'text-rose-600 font-black scale-105' : 'text-slate-400'}>
              138°F (Roasting!)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base">🥵</span>
            <span className={mood === 'hot' ? 'text-orange-600 font-black scale-105' : 'text-slate-400'}>
              108°F (Hot!)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base">🌤️</span>
            <span className={mood === 'warm' ? 'text-amber-600 font-black scale-105' : 'text-slate-400'}>
              88°F (Warm)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base">😊</span>
            <span className={mood === 'cool' ? 'text-sky-600 font-black scale-105' : 'text-slate-400'}>
              72°F (Nice &amp; Cool)
            </span>
          </div>
        </div>
      </div>

      {/* Elementary Summary Note */}
      <div className="w-full text-center text-xs font-bold text-slate-500 bg-slate-50 py-2 px-3 rounded-xl border border-slate-100">
        {tempF > 110 ? (
          <span className="text-rose-600">🚨 Black absorbed almost all the sun&apos;s heat!</span>
        ) : tempF > 90 ? (
          <span className="text-amber-600">☀️ Medium heat absorbed!</span>
        ) : (
          <span className="text-sky-600">❄️ White bounced the sun away!</span>
        )}
      </div>
    </div>
  );
}
