import { useMemo } from 'react';
import { SimpleColor } from '../types';
import { calculateTemperatureAtMinute, SIMPLE_COLORS, MAX_MINUTES } from '../utils/physics';

interface SimpleGraphProps {
  currentColor: SimpleColor;
  currentMinute: number;
  tempUnit: 'F' | 'C';
}

export function SimpleGraph({ currentColor, currentMinute, tempUnit }: SimpleGraphProps) {
  // Generate curve points for all 3 colors
  const curves = useMemo(() => {
    return SIMPLE_COLORS.map((c) => {
      const pts: { min: number; temp: number }[] = [];
      for (let m = 0; m <= MAX_MINUTES; m += 3) {
        const { tempF, tempC } = calculateTemperatureAtMinute(c.absorptivity, m);
        pts.push({ min: m, temp: tempUnit === 'F' ? tempF : tempC });
      }
      return { color: c, pts };
    });
  }, [tempUnit]);

  // Bounds
  const minY = tempUnit === 'F' ? 65 : 18;
  const maxY = tempUnit === 'F' ? 145 : 65;

  const width = 500;
  const height = 180;
  const padding = { top: 20, right: 30, bottom: 35, left: 45 };

  const plotW = width - padding.left - padding.right;
  const plotH = height - padding.top - padding.bottom;

  const getX = (min: number) => padding.left + (min / MAX_MINUTES) * plotW;
  const getY = (temp: number) => padding.top + plotH - ((temp - minY) / (maxY - minY)) * plotH;

  // Active current temp
  const { tempF, tempC } = calculateTemperatureAtMinute(currentColor.absorptivity, currentMinute);
  const activeTemp = tempUnit === 'F' ? tempF : tempC;

  return (
    <div className="bg-white rounded-3xl border-2 border-slate-200 p-4 sm:p-5 shadow-xs space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-extrabold text-slate-900 tracking-tight">
            Classroom Heat Tracker Chart
          </h4>
          <p className="text-xs text-slate-500">
            Look how fast the black line climbs compared to white!
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs font-bold">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-slate-900" />
            <span className="text-slate-700">Black (Hot)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-600" />
            <span className="text-slate-700">Red (Warm)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-slate-200 border border-slate-400" />
            <span className="text-slate-700">White (Cool)</span>
          </div>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto min-w-[380px] select-none">
          {/* Grid lines */}
          {(tempUnit === 'F' ? [70, 95, 120, 140] : [20, 35, 50, 60]).map((yVal) => {
            const yPos = getY(yVal);
            return (
              <g key={yVal}>
                <line
                  x1={padding.left}
                  y1={yPos}
                  x2={width - padding.right}
                  y2={yPos}
                  stroke="#f1f5f9"
                  strokeWidth="1.5"
                />
                <text
                  x={padding.left - 6}
                  y={yPos + 4}
                  textAnchor="end"
                  fontSize="9.5"
                  fontFamily="monospace"
                  fill="#94a3b8"
                >
                  {yVal}°
                </text>
              </g>
            );
          })}

          {/* Time axis marks */}
          {[0, 15, 30, 45, 60].map((m) => {
            const xPos = getX(m);
            return (
              <text
                key={m}
                x={xPos}
                y={height - padding.bottom + 16}
                textAnchor="middle"
                fontSize="9.5"
                fontFamily="monospace"
                fill="#64748b"
                fontWeight="bold"
              >
                {m}m
              </text>
            );
          })}

          {/* Draw all 3 reference curves */}
          {curves.map(({ color, pts }) => {
            const isSelected = color.id === currentColor.id;
            const pathD = pts
              .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${getX(pt.min).toFixed(1)} ${getY(pt.temp).toFixed(1)}`)
              .join(' ');

            return (
              <path
                key={color.id}
                d={pathD}
                fill="none"
                stroke={color.id === 'white' ? '#94a3b8' : color.hex}
                strokeWidth={isSelected ? '4' : '2'}
                strokeDasharray={color.id === 'white' ? '4 3' : 'none'}
                strokeLinecap="round"
                opacity={isSelected ? 1 : 0.45}
              />
            );
          })}

          {/* Current minute cursor indicator */}
          <line
            x1={getX(currentMinute)}
            y1={padding.top}
            x2={getX(currentMinute)}
            y2={padding.top + plotH}
            stroke="#6366f1"
            strokeWidth="2"
            strokeDasharray="3 3"
          />

          {/* Active dot */}
          <circle
            cx={getX(currentMinute)}
            cy={getY(activeTemp)}
            r="7"
            fill={currentColor.id === 'white' ? '#ffffff' : currentColor.hex}
            stroke={currentColor.id === 'white' ? '#64748b' : '#ffffff'}
            strokeWidth="2.5"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.25))"
          />
        </svg>
      </div>
    </div>
  );
}
