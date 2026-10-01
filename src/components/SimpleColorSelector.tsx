import { SimpleColor } from '../types';
import { SIMPLE_COLORS } from '../utils/physics';
import { playSelectSound } from '../utils/audio';
import { Check } from 'lucide-react';

interface SimpleColorSelectorProps {
  selectedColor: SimpleColor;
  onSelectColor: (color: SimpleColor) => void;
}

export function SimpleColorSelector({
  selectedColor,
  onSelectColor
}: SimpleColorSelectorProps) {
  const handleSelect = (color: SimpleColor) => {
    playSelectSound();
    onSelectColor(color);
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-slate-200 p-4 sm:p-5 shadow-xs space-y-3">
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-0.5">
          Step 1: Pick a Shirt
        </div>
        <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
          What color shirt should our student wear?
        </h3>
        <p className="text-xs text-slate-500">
          Click a shirt to change what they wear in the hot sun!
        </p>
      </div>

      {/* 3 Big Tactile Cards for Third Graders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {SIMPLE_COLORS.map((color) => {
          const isSelected = selectedColor.id === color.id;
          return (
            <button
              key={color.id}
              type="button"
              onClick={() => handleSelect(color)}
              className={`relative flex flex-col items-center text-center p-3.5 rounded-2xl border-3 transition-all duration-150 cursor-pointer ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/50 shadow-md ring-2 ring-indigo-300 scale-[1.02]'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {/* Checkmark badge if selected */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}

              {/* Big Shirt Swatch Preview Circle */}
              <div
                className="w-12 h-12 rounded-full border-2 border-black/15 shadow-sm flex items-center justify-center mb-2"
                style={{ backgroundColor: color.hex }}
              >
                <span className="text-lg">👕</span>
              </div>

              {/* Color Name */}
              <div className="text-sm font-extrabold text-slate-900">
                {color.name}
              </div>

              {/* Heat Absorption Badge */}
              <div
                className={`mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                  color.id === 'black'
                    ? 'bg-rose-100 text-rose-700'
                    : color.id === 'white'
                    ? 'bg-sky-100 text-sky-700'
                    : 'bg-amber-100 text-amber-700'
                }`}
              >
                {color.id === 'black'
                  ? 'Absorbs 95% Heat 🔥'
                  : color.id === 'white'
                  ? 'Reflects 88% Heat ❄️'
                  : 'Absorbs 60% Heat 🌤️'}
              </div>
            </button>
          );
        })}
      </div>

      {/* Elementary Friendly Key Fact */}
      <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-950 flex items-start gap-2.5">
        <span className="text-lg shrink-0">💡</span>
        <div>
          <span className="font-bold text-amber-900">{selectedColor.name} Science Fact: </span>
          <span>{selectedColor.simpleLesson}</span>
        </div>
      </div>
    </div>
  );
}
