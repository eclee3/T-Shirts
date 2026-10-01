import { KidMood, SimpleColor } from '../types';
import { getKidStateDetails } from '../utils/physics';

interface KidCharacterProps {
  color: SimpleColor;
  tempF: number;
  tempC: number;
  tempUnit: 'F' | 'C';
  minute: number;
  mood: KidMood;
}

export function KidCharacter({
  color,
  tempF,
  tempC,
  tempUnit,
  minute,
  mood
}: KidCharacterProps) {
  const kidState = getKidStateDetails(mood, color.name);
  const displayTemp = tempUnit === 'F' ? `${tempF.toFixed(1)}°F` : `${tempC.toFixed(1)}°C`;

  // Face color shifts with heat
  let skinTone = '#ffedd5'; // default peachy
  let cheekColor = '#fecdd3'; // light blush
  if (mood === 'warm') {
    skinTone = '#fed7aa';
    cheekColor = '#fda4af';
  } else if (mood === 'hot') {
    skinTone = '#fecaca'; // flushed pink
    cheekColor = '#fb7185';
  } else if (mood === 'scorching') {
    skinTone = '#fca5a5'; // bright flushed red
    cheekColor = '#e11d48';
  }

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border-2 border-slate-200 bg-linear-to-b from-sky-200 via-sky-100 to-amber-50 shadow-sm flex flex-col items-center justify-between p-4 sm:p-6 min-h-[460px]">
      {/* Top Scene Bar: Outdoor Sun & Elapsed Time */}
      <div className="w-full flex items-center justify-between z-10">
        {/* Animated Friendly Sun */}
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-xs px-3.5 py-1.5 rounded-2xl border border-amber-200 shadow-xs">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-30" />
            <div className="relative w-8 h-8 rounded-full bg-linear-to-tr from-amber-500 to-yellow-300 flex items-center justify-center shadow-xs text-xs">
              ☀️
            </div>
          </div>
          <div>
            <div className="text-[11px] font-bold text-amber-900 leading-none">Sunny Recess</div>
            <div className="text-[10px] text-amber-700 font-medium">Bright Sunlight</div>
          </div>
        </div>

        {/* Current Time Badge */}
        <div className="bg-white/90 backdrop-blur-xs px-3.5 py-1.5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse" />
          <span className="text-xs font-bold text-slate-700">
            Time in Sun: <span className="font-mono text-indigo-700 font-extrabold">{minute} minutes</span>
          </span>
        </div>
      </div>

      {/* Speech Bubble Above Kid */}
      <div className="z-10 my-2 max-w-sm w-full animate-bounce duration-1000">
        <div className="relative bg-white rounded-2xl p-3 border-2 border-slate-300 shadow-md text-center">
          <p className="text-xs sm:text-sm font-bold text-slate-800">
            &ldquo;{kidState.speech}&rdquo;
          </p>
          {/* Bubble tail pointing down to kid's mouth */}
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b-2 border-r-2 border-slate-300 rotate-45" />
        </div>
      </div>

      {/* The Kid Character SVG Scene */}
      <div className="relative w-full max-w-[340px] h-[310px] flex items-center justify-center select-none">
        <svg
          viewBox="0 0 300 320"
          className="w-full h-full overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ground Shadow */}
          <ellipse cx="150" cy="305" rx="75" ry="12" fill="#000000" opacity="0.15" />

          {/* Heat Waves Rising Off Shirt if Hot or Scorching */}
          {(mood === 'hot' || mood === 'scorching') && (
            <g className="animate-pulse">
              {/* Left heat wave */}
              <path
                d="M 115 170 Q 110 140 120 120 T 112 90"
                fill="none"
                stroke={mood === 'scorching' ? '#dc2626' : '#ea580c'}
                strokeWidth={mood === 'scorching' ? '3.5' : '2.5'}
                strokeLinecap="round"
                opacity="0.8"
              />
              {/* Middle heat wave */}
              <path
                d="M 150 160 Q 158 130 146 110 T 154 80"
                fill="none"
                stroke={mood === 'scorching' ? '#dc2626' : '#ea580c'}
                strokeWidth={mood === 'scorching' ? '4' : '2.5'}
                strokeLinecap="round"
                opacity="0.9"
              />
              {/* Right heat wave */}
              <path
                d="M 185 170 Q 192 140 180 120 T 190 90"
                fill="none"
                stroke={mood === 'scorching' ? '#dc2626' : '#ea580c'}
                strokeWidth={mood === 'scorching' ? '3.5' : '2.5'}
                strokeLinecap="round"
                opacity="0.8"
              />
              {/* Heat Label */}
              <text
                x="150"
                y="85"
                textAnchor="middle"
                fill={mood === 'scorching' ? '#b91c1c' : '#c2410c'}
                fontSize="12"
                fontWeight="900"
                fontFamily="sans-serif"
              >
                {mood === 'scorching' ? '🔥 SUPER HOT SHIRT! 🔥' : '♨️ HEAT BUILDING UP ♨️'}
              </text>
            </g>
          )}

          {/* Flying / Dripping Sweat Droplets */}
          {(mood === 'hot' || mood === 'scorching') && (
            <g>
              {/* Left temple drop */}
              <path
                d="M 104 65 C 104 60, 96 55, 96 68 C 96 74, 104 74, 104 65 Z"
                fill="#38bdf8"
                stroke="#0284c7"
                strokeWidth="1"
                className="animate-bounce"
              />
              {/* Right temple drop */}
              <path
                d="M 196 65 C 196 60, 204 55, 204 68 C 204 74, 196 74, 196 65 Z"
                fill="#38bdf8"
                stroke="#0284c7"
                strokeWidth="1"
                className="animate-bounce"
              />
              {/* Extra sweat drops for scorching */}
              {mood === 'scorching' && (
                <>
                  <circle cx="118" cy="88" r="4" fill="#38bdf8" />
                  <circle cx="182" cy="88" r="4.5" fill="#38bdf8" />
                  <path
                    d="M 150 115 C 150 110, 146 106, 146 118 C 146 122, 150 122, 150 115 Z"
                    fill="#38bdf8"
                  />
                  {/* Sweat puddle on ground */}
                  <ellipse cx="120" cy="305" rx="14" ry="4" fill="#38bdf8" opacity="0.7" />
                  <ellipse cx="180" cy="305" rx="12" ry="3.5" fill="#38bdf8" opacity="0.7" />
                </>
              )}
            </g>
          )}

          {/* LEGS & SNEAKERS */}
          <g>
            {/* Left Pant Leg */}
            <rect x="124" y="240" width="20" height="48" rx="4" fill="#1e3a8a" />
            {/* Right Pant Leg */}
            <rect x="156" y="240" width="20" height="48" rx="4" fill="#1e3a8a" />

            {/* Left Sneaker */}
            <ellipse cx="128" cy="294" rx="16" ry="9" fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
            <path d="M 112 295 L 140 295" stroke="#ef4444" strokeWidth="2" />
            {/* Right Sneaker */}
            <ellipse cx="172" cy="294" rx="16" ry="9" fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
            <path d="M 156 295 L 184 295" stroke="#ef4444" strokeWidth="2" />
          </g>

          {/* ARMS */}
          <g>
            {mood === 'cool' ? (
              // Thumbs up pose!
              <>
                {/* Left Arm: Relaxed down */}
                <path
                  d="M 106 170 Q 90 205 92 230"
                  fill="none"
                  stroke={skinTone}
                  strokeWidth="15"
                  strokeLinecap="round"
                />
                <circle cx="92" cy="232" r="9" fill={skinTone} />

                {/* Right Arm: Raised giving thumbs up! */}
                <path
                  d="M 194 170 Q 215 190 216 160"
                  fill="none"
                  stroke={skinTone}
                  strokeWidth="15"
                  strokeLinecap="round"
                />
                {/* Hand with thumbs up */}
                <circle cx="216" cy="155" r="9" fill={skinTone} />
                <path
                  d="M 216 155 L 216 142"
                  stroke={skinTone}
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </>
            ) : mood === 'warm' ? (
              // Hands casually at sides
              <>
                <path
                  d="M 106 170 Q 88 200 96 226"
                  fill="none"
                  stroke={skinTone}
                  strokeWidth="15"
                  strokeLinecap="round"
                />
                <circle cx="96" cy="226" r="9" fill={skinTone} />

                <path
                  d="M 194 170 Q 212 200 204 226"
                  fill="none"
                  stroke={skinTone}
                  strokeWidth="15"
                  strokeLinecap="round"
                />
                <circle cx="204" cy="226" r="9" fill={skinTone} />
              </>
            ) : mood === 'hot' ? (
              // One hand wiping forehead!
              <>
                <path
                  d="M 106 170 Q 82 200 88 226"
                  fill="none"
                  stroke={skinTone}
                  strokeWidth="15"
                  strokeLinecap="round"
                />
                <circle cx="88" cy="226" r="9" fill={skinTone} />

                {/* Right hand wiping forehead */}
                <path
                  d="M 194 170 Q 220 150 188 85"
                  fill="none"
                  stroke={skinTone}
                  strokeWidth="15"
                  strokeLinecap="round"
                />
                <circle cx="188" cy="85" r="9" fill={skinTone} />
              </>
            ) : (
              // Scorching: Both arms flailing or holding melting ice pack!
              <>
                {/* Left hand flailing */}
                <path
                  d="M 106 170 Q 75 145 76 110"
                  fill="none"
                  stroke={skinTone}
                  strokeWidth="15"
                  strokeLinecap="round"
                />
                <circle cx="76" cy="110" r="9" fill={skinTone} />

                {/* Right arm waving a fan furiously */}
                <path
                  d="M 194 170 Q 225 150 220 115"
                  fill="none"
                  stroke={skinTone}
                  strokeWidth="15"
                  strokeLinecap="round"
                />
                <circle cx="220" cy="115" r="9" fill={skinTone} />
                {/* Paper Fan */}
                <polygon points="220,115 245,95 255,115" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" />
              </>
            )}
          </g>

          {/* THE SHIRT (The Star of the Simulation!) */}
          <g>
            {/* Main Shirt Body */}
            <path
              d="M 105 160 L 80 185 L 94 205 L 110 190 L 110 248 L 190 248 L 190 190 L 206 205 L 220 185 L 195 160 Q 150 145 105 160 Z"
              fill={color.hex}
              stroke={color.id === 'white' ? '#94a3b8' : '#0f172a'}
              strokeWidth="2.5"
              strokeLinejoin="round"
              filter="drop-shadow(0 4px 6px rgba(0,0,0,0.2))"
            />

            {/* Collar Cutout */}
            <path
              d="M 132 152 Q 150 168 168 152"
              fill="none"
              stroke={color.textColor}
              strokeWidth="2"
              opacity="0.5"
            />

            {/* Shirt Graphic: Color Name & Live Heat Status */}
            <text
              x="150"
              y="195"
              textAnchor="middle"
              fill={color.textColor}
              fontSize="13"
              fontWeight="bold"
              fontFamily="sans-serif"
            >
              {color.name}
            </text>
            <text
              x="150"
              y="214"
              textAnchor="middle"
              fill={color.textColor}
              fontSize="11"
              fontFamily="monospace"
              fontWeight="bold"
            >
              {displayTemp}
            </text>
            <text
              x="150"
              y="230"
              textAnchor="middle"
              fill={color.textColor}
              fontSize="9.5"
              fontFamily="sans-serif"
              opacity="0.85"
            >
              Absorbs {color.absorbPercent}% Heat
            </text>
          </g>

          {/* NECK */}
          <rect x="140" y="125" width="20" height="24" rx="4" fill={skinTone} />

          {/* HEAD & FACE */}
          <g>
            {/* Ears */}
            <circle cx="106" cy="86" r="10" fill={skinTone} />
            <circle cx="194" cy="86" r="10" fill={skinTone} />

            {/* Face Oval */}
            <ellipse
              cx="150"
              cy="84"
              rx="44"
              ry="48"
              fill={skinTone}
              stroke="#ca8a04"
              strokeWidth="1"
              strokeOpacity="0.3"
            />

            {/* Cheeks */}
            <ellipse
              cx="122"
              cy="95"
              rx={mood === 'scorching' ? 14 : 10}
              ry={mood === 'scorching' ? 9 : 6}
              fill={cheekColor}
              opacity={mood === 'cool' ? 0.4 : 0.8}
            />
            <ellipse
              cx="178"
              cy="95"
              rx={mood === 'scorching' ? 14 : 10}
              ry={mood === 'scorching' ? 9 : 6}
              fill={cheekColor}
              opacity={mood === 'cool' ? 0.4 : 0.8}
            />

            {/* Nose */}
            <path
              d="M 148 84 Q 152 89 150 91"
              fill="none"
              stroke="#b45309"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* DYNAMIC EYES BASED ON MOOD */}
            {mood === 'cool' ? (
              // Happy twinkling curved eyes 😊
              <g>
                <path
                  d="M 125 78 Q 133 70 141 78"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <path
                  d="M 159 78 Q 167 70 175 78"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </g>
            ) : mood === 'warm' ? (
              // Normal round alert eyes
              <g>
                <circle cx="133" cy="78" r="5" fill="#1e293b" />
                <circle cx="131" cy="76" r="1.5" fill="#ffffff" />
                <circle cx="167" cy="78" r="5" fill="#1e293b" />
                <circle cx="165" cy="76" r="1.5" fill="#ffffff" />
              </g>
            ) : mood === 'hot' ? (
              // Squinting stressed eyes > <
              <g>
                <path d="M 125 74 L 138 80 L 125 86" fill="none" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
                <path d="M 175 74 L 162 80 L 175 86" fill="none" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
              </g>
            ) : (
              // Scorching dizzy spirals or wide melting eyes 😵
              <g>
                {/* Left spiral eye */}
                <path
                  d="M 133 78 m -7, 0 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0"
                  fill="none"
                  stroke="#991b1b"
                  strokeWidth="2.5"
                />
                <path
                  d="M 133 78 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0"
                  fill="none"
                  stroke="#991b1b"
                  strokeWidth="2"
                />
                {/* Right spiral eye */}
                <path
                  d="M 167 78 m -7, 0 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0"
                  fill="none"
                  stroke="#991b1b"
                  strokeWidth="2.5"
                />
                <path
                  d="M 167 78 m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0"
                  fill="none"
                  stroke="#991b1b"
                  strokeWidth="2"
                />
              </g>
            )}

            {/* DYNAMIC MOUTH BASED ON MOOD */}
            {mood === 'cool' ? (
              // Big joyful open smile
              <path
                d="M 132 98 Q 150 120 168 98 Z"
                fill="#e11d48"
                stroke="#881337"
                strokeWidth="1.5"
              />
            ) : mood === 'warm' ? (
              // Gentle smile
              <path
                d="M 136 102 Q 150 114 164 102"
                fill="none"
                stroke="#1e293b"
                strokeWidth="3"
                strokeLinecap="round"
              />
            ) : mood === 'hot' ? (
              // Open panting mouth with tongue
              <g>
                <ellipse cx="150" cy="106" rx="10" ry="7" fill="#881337" />
                {/* Tongue */}
                <ellipse cx="150" cy="111" rx="6" ry="4" fill="#fb7185" />
              </g>
            ) : (
              // Scorching wide open panting cry
              <g>
                <path
                  d="M 132 100 Q 150 128 168 100 Q 150 96 132 100 Z"
                  fill="#7f1d1d"
                  stroke="#450a0a"
                  strokeWidth="2"
                />
                {/* Drooping tongue */}
                <path
                  d="M 144 108 Q 150 126 156 108 Z"
                  fill="#f43f5e"
                />
              </g>
            )}

            {/* FUN HAIR & SUN CAP */}
            <g>
              {/* Back Hair */}
              <path
                d="M 108 72 C 104 40, 196 40, 192 72 C 196 60, 204 45, 185 32 C 150 15, 120 25, 105 42 Z"
                fill="#78350f"
              />
              {/* Baseball Cap Visor */}
              <ellipse cx="150" cy="52" rx="48" ry="12" fill="#2563eb" />
              <path
                d="M 108 52 C 108 26, 192 26, 192 52 Z"
                fill="#1d4ed8"
              />
              {/* Cap Brim */}
              <path
                d="M 116 54 Q 150 42 196 58 Q 150 68 116 54 Z"
                fill="#1e40af"
              />
              {/* Little emblem on cap */}
              <circle cx="150" cy="38" r="4" fill="#facc15" />
            </g>
          </g>
        </svg>
      </div>

      {/* Bottom Mood Status Ribbon */}
      <div className="w-full z-10">
        <div className={`w-full py-2.5 px-4 rounded-2xl border text-center font-bold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-2 ${kidState.badgeColor}`}>
          <span className="text-lg">{kidState.icon}</span>
          <span>{kidState.headline}</span>
          <span className="font-mono text-xs opacity-80">({displayTemp})</span>
        </div>
      </div>
    </div>
  );
}
