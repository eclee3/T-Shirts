import { Play, Pause, RotateCcw, Clock } from 'lucide-react';
import { MAX_MINUTES } from '../utils/physics';

interface SimpleTimeControlsProps {
  minute: number;
  setMinute: (min: number) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  onReset: () => void;
}

export function SimpleTimeControls({
  minute,
  setMinute,
  isPlaying,
  setIsPlaying,
  onReset
}: SimpleTimeControlsProps) {
  return (
    <div className="bg-white rounded-3xl border-2 border-slate-200 p-4 sm:p-5 shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-0.5">
            Step 2: Let the Sun Shine!
          </div>
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
            How long are they outside?
          </h3>
        </div>

        {/* Current Time Display */}
        <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-xl text-xs font-bold text-slate-700">
          <Clock className="w-3.5 h-3.5 text-indigo-600" />
          <span>{minute} / {MAX_MINUTES} minutes</span>
        </div>
      </div>

      {/* Slider */}
      <div className="py-2">
        <input
          type="range"
          min="0"
          max={MAX_MINUTES}
          step="1"
          value={minute}
          onChange={(e) => setMinute(Number(e.target.value))}
          className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
        {/* Kid-friendly milestones */}
        <div className="flex justify-between text-[11px] font-bold text-slate-400 mt-1.5 select-none">
          <span>0m (Just Started)</span>
          <span>15m (Playing)</span>
          <span>30m (Recess)</span>
          <span>60m (1 Full Hour)</span>
        </div>
      </div>

      {/* Play / Pause / Reset Buttons */}
      <div className="flex items-center justify-between pt-1 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold text-white transition-all shadow-sm cursor-pointer ${
              isPlaying
                ? 'bg-amber-600 hover:bg-amber-700'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-white" />
                <span>Pause Time</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>{minute >= MAX_MINUTES ? 'Replay Sun Time' : 'Start Sun Exposure'}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to 0 min</span>
          </button>
        </div>

        {/* Quick jump */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setMinute(Math.min(MAX_MINUTES, minute + 15))}
            disabled={minute >= MAX_MINUTES}
            className="px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 rounded-xl transition-colors cursor-pointer"
          >
            +15 mins
          </button>
        </div>
      </div>
    </div>
  );
}
