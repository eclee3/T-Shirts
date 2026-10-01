import { X, BookOpen, Check, Lightbulb } from 'lucide-react';

interface TeacherGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TeacherGuideModal({ isOpen, onClose }: TeacherGuideModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Teacher&apos;s 3rd Grade Lesson Plan
              </h3>
              <p className="text-xs text-slate-500">
                NGSS Aligned: Light Energy, Heat Absorption &amp; Clothing Choices
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {/* Main takeaway for 3rd graders */}
          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 space-y-1.5">
            <div className="font-extrabold text-indigo-950 flex items-center gap-1.5 text-xs uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-indigo-600" />
              <span>Core Lesson Takeaway for 3rd Graders</span>
            </div>
            <p className="text-indigo-900 text-xs sm:text-sm">
              <strong>Black absorbs sunlight</strong> and converts it directly into heat energy (which is why our student turns red and sweats!). <strong>White bounces sunlight away</strong> like a shield, keeping them cool!
            </p>
          </div>

          {/* Quick 10-Minute Activity Flow */}
          <div>
            <h4 className="font-black text-slate-900 mb-2 uppercase tracking-wider text-xs">
              Suggested Classroom Routine (10–15 Mins)
            </h4>
            <ol className="space-y-2.5 list-decimal list-inside text-xs sm:text-sm">
              <li className="pl-1">
                <strong>Ask the Question:</strong> &quot;If you have recess outside on a 90°F sunny day, what color shirt would you choose so you don&apos;t roast?&quot;
              </li>
              <li className="pl-1">
                <strong>Test the Black Shirt:</strong> Have students select the <strong>Black Shirt</strong> and press <strong>Start Sun Exposure</strong>. Watch our cartoon student start sweating, turn red, and shout in the speech bubble as the thermometer reaches ~138°F!
              </li>
              <li className="pl-1">
                <strong>Test the White Shirt:</strong> Switch to the <strong>White Shirt</strong> and reset. Notice how the student stays cool, smiling, and comfortable around ~80°F!
              </li>
              <li className="pl-1">
                <strong>Take the Quiz:</strong> Have students complete the 3-question Science Quiz to reinforce their learning!
              </li>
            </ol>
          </div>

          {/* Real-world questions */}
          <div>
            <h4 className="font-black text-slate-900 mb-2 uppercase tracking-wider text-xs">
              Class Discussion Starters
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Why do people wear white tennis clothes or light sunhats in the summer?</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Why does black asphalt in the parking lot get hot enough to cook an egg?</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-extrabold text-white bg-slate-900 hover:bg-slate-800 rounded-2xl transition-colors cursor-pointer"
          >
            Ready to Teach!
          </button>
        </div>
      </div>
    </div>
  );
}
