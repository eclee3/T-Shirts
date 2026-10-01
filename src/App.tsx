import { useState, useEffect, useRef } from 'react';
import { SimpleColor } from './types';
import { SIMPLE_COLORS, calculateTemperatureAtMinute, getKidMood, MAX_MINUTES } from './utils/physics';
import { setSoundEnabled, playCelebrationSound } from './utils/audio';
import { Header } from './components/Header';
import { KidCharacter } from './components/KidCharacter';
import { Thermometer } from './components/Thermometer';
import { SimpleColorSelector } from './components/SimpleColorSelector';
import { SimpleTimeControls } from './components/SimpleTimeControls';
import { SimpleGraph } from './components/SimpleGraph';
import { ThirdGradeQuiz } from './components/ThirdGradeQuiz';
import { TeacherGuideModal } from './components/TeacherGuideModal';
import { Flame, ShieldCheck, Sparkles } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<'sim' | 'quiz'>('sim');

  // Exactly 3 color choices for 3rd graders; start with Black to showcase heat absorption!
  const [selectedColor, setSelectedColor] = useState<SimpleColor>(SIMPLE_COLORS[0]);
  const [minute, setMinute] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [tempUnit, setTempUnit] = useState<'F' | 'C'>('F');
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [isTeacherGuideOpen, setIsTeacherGuideOpen] = useState<boolean>(false);

  // Sound sync
  const toggleSound = () => {
    const nextState = !soundOn;
    setSoundOn(nextState);
    setSoundEnabled(nextState);
  };

  const toggleTempUnit = () => {
    setTempUnit((prev) => (prev === 'F' ? 'C' : 'F'));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setMinute(0);
  };

  // Playback timer loop
  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isPlaying) {
      lastTimeRef.current = null;
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      return;
    }

    const animate = (time: number) => {
      if (lastTimeRef.current != null) {
        const delta = time - lastTimeRef.current;
        // 1 simulation minute every 400ms (1 full hour in ~24 seconds)
        if (delta >= 400) {
          lastTimeRef.current = time;
          setMinute((prev) => {
            if (prev >= MAX_MINUTES) {
              setIsPlaying(false);
              playCelebrationSound();
              return MAX_MINUTES;
            }
            return prev + 1;
          });
        }
      } else {
        lastTimeRef.current = time;
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying]);

  // Real-time calculations
  const { tempF, tempC } = calculateTemperatureAtMinute(selectedColor.absorptivity, minute);
  const mood = getKidMood(tempF);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Bar */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        tempUnit={tempUnit}
        toggleTempUnit={toggleTempUnit}
        soundEnabled={soundOn}
        toggleSound={toggleSound}
        onOpenTeacherGuide={() => setIsTeacherGuideOpen(true)}
      />

      {/* Main Sandbox Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6">
        {activeView === 'sim' ? (
          <div className="space-y-6">
            {/* Third Grade Science Prompt Banner */}
            <div className="bg-white rounded-3xl border-2 border-slate-200 p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <span>☀️</span>
                  <span>Does Shirt Color Change How Hot You Get at Recess?</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                  Change the shirt color, let the sun shine, and watch what happens to our student!
                </p>
              </div>

              {/* Fast 1-Click Comparison Presets */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedColor(SIMPLE_COLORS[0]); // Black
                    setIsPlaying(true);
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-black text-white bg-slate-900 hover:bg-slate-800 rounded-2xl transition-all shadow-xs cursor-pointer"
                >
                  <Flame className="w-3.5 h-3.5 text-rose-400" />
                  <span>Try Black Shirt (Max Heat)</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedColor(SIMPLE_COLORS[2]); // White
                    setIsPlaying(true);
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-black text-slate-800 bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 rounded-2xl transition-all cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
                  <span>Try White Shirt (Coolest)</span>
                </button>
              </div>
            </div>

            {/* Split Screen 2-Zone Sandbox */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Zone: The Animated Kid Character & Time Slider (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <KidCharacter
                  color={selectedColor}
                  tempF={tempF}
                  tempC={tempC}
                  tempUnit={tempUnit}
                  minute={minute}
                  mood={mood}
                />

                <SimpleTimeControls
                  minute={minute}
                  setMinute={setMinute}
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                  onReset={handleReset}
                />

                <SimpleGraph
                  currentColor={selectedColor}
                  currentMinute={minute}
                  tempUnit={tempUnit}
                />
              </div>

              {/* Right Zone: Big Thermometer & 3-Choice Shirt Selector (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                {/* Physical Glass Thermometer */}
                <Thermometer
                  tempF={tempF}
                  tempC={tempC}
                  tempUnit={tempUnit}
                  mood={mood}
                />

                {/* 3 Clear Color Cards for 3rd Graders */}
                <SimpleColorSelector
                  selectedColor={selectedColor}
                  onSelectColor={setSelectedColor}
                />

                {/* Third Grade Big Discovery Box */}
                <div className="bg-white rounded-3xl border-2 border-slate-200 p-5 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-indigo-900 font-black text-xs uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span>The Big Science Rule</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    🔥 <strong>Black absorbs sunlight</strong> and turns it directly into heat. That&apos;s why our student turns red and sweats like crazy!
                  </p>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    ❄️ <strong>White bounces sunlight away</strong> like a shield, so the student stays happy and cool!
                  </p>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveView('quiz')}
                      className="text-xs font-black text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
                    >
                      Ready for the Science Quiz? →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <ThirdGradeQuiz />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-slate-200 mt-12 py-4 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-medium">
            <span className="font-bold text-slate-800">Solar Heat Lab</span>
            <span>·</span>
            <span>Elementary School Science (3rd Grade)</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsTeacherGuideOpen(true)}
              className="text-slate-600 hover:text-slate-900 font-bold transition-colors cursor-pointer"
            >
              Teacher Guide
            </button>
            <button
              onClick={handleReset}
              className="text-slate-600 hover:text-slate-900 font-bold transition-colors cursor-pointer"
            >
              Reset Simulation
            </button>
          </div>
        </div>
      </footer>

      {/* Teacher Guide Modal */}
      <TeacherGuideModal
        isOpen={isTeacherGuideOpen}
        onClose={() => setIsTeacherGuideOpen(false)}
      />
    </div>
  );
}
