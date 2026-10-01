import { Sun, BookOpen, Volume2, VolumeX, Thermometer } from 'lucide-react';

interface HeaderProps {
  activeView: 'sim' | 'quiz';
  setActiveView: (view: 'sim' | 'quiz') => void;
  tempUnit: 'F' | 'C';
  toggleTempUnit: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  onOpenTeacherGuide: () => void;
}

export function Header({
  activeView,
  setActiveView,
  tempUnit,
  toggleTempUnit,
  soundEnabled,
  toggleSound,
  onOpenTeacherGuide
}: HeaderProps) {
  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-xs">
            <Sun className="w-5 h-5 animate-[spin_16s_linear_infinite]" />
          </div>
          <div>
            <span className="text-lg font-black tracking-tight text-slate-900 block leading-tight">
              Solar Heat Lab
            </span>
            <span className="text-[10px] font-bold text-indigo-600 block leading-none">
              Third Grade Science
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl">
          <button
            onClick={() => setActiveView('sim')}
            className={`px-3.5 py-1.5 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeView === 'sim'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ☀️ Playground Simulation
          </button>
          <button
            onClick={() => setActiveView('quiz')}
            className={`px-3.5 py-1.5 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeView === 'quiz'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            📝 Science Quiz
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Unit Toggle */}
          <button
            onClick={toggleTempUnit}
            title={`Switch to °${tempUnit === 'F' ? 'C' : 'F'}`}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            <Thermometer className="w-3.5 h-3.5 text-amber-600" />
            <span>°{tempUnit}</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Mute sound' : 'Unmute sound'}
            className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            aria-label="Toggle sound"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {/* Teacher Guide */}
          <button
            onClick={onOpenTeacherGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Teacher Guide</span>
          </button>
        </div>
      </div>
    </header>
  );
}
