import { useState } from 'react';
import confetti from 'canvas-confetti';
import { playCelebrationSound, playSelectSound } from '../utils/audio';
import { CheckCircle2, XCircle, Award } from 'lucide-react';

interface QuizItem {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  funFact: string;
}

const QUESTIONS: QuizItem[] = [
  {
    id: 1,
    question: 'Which shirt made our student sweat, turn red, and melt in the hot sun?',
    options: ['The White Shirt', 'The Black Shirt', 'The Red Shirt'],
    correctIndex: 1,
    funFact: 'That’s right! The black shirt absorbs 95% of the sun’s energy and gets scorching hot!'
  },
  {
    id: 2,
    question: 'Why does the black shirt get hotter than the white shirt?',
    options: [
      'Black absorbs sunlight and turns it into heat',
      'The sun gets angry at black shirts',
      'White shirts are made of real ice'
    ],
    correctIndex: 0,
    funFact: 'Spot on! Black materials absorb sunlight photons and convert them into heat!'
  },
  {
    id: 3,
    question: 'It is a scorching hot 90°F sunny day at recess! What shirt should you wear to stay coolest?',
    options: ['A dark black shirt', 'A bright white shirt', 'A heavy dark sweatshirt'],
    correctIndex: 1,
    funFact: 'Awesome! White shirts bounce sunlight away like a mirror, keeping you cool!'
  }
];

export function ThirdGradeQuiz() {
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const handleSelect = (qId: number, optIdx: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: optIdx }));
    const q = QUESTIONS.find((item) => item.id === qId);
    if (q && optIdx === q.correctIndex) {
      playCelebrationSound();
      confetti({ particleCount: 45, spread: 55, origin: { y: 0.7 } });
    } else {
      playSelectSound();
    }
  };

  const score = QUESTIONS.filter((q) => answers[q.id] === q.correctIndex).length;

  return (
    <div className="bg-white rounded-3xl border-2 border-slate-200 p-5 sm:p-6 shadow-xs space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span>Third Grade Science Check</span>
          </h3>
          <p className="text-xs text-slate-500">
            Show what you discovered about how shirt colors absorb sun heat!
          </p>
        </div>
        <div className="text-xs font-black px-3 py-1.5 bg-amber-100 text-amber-900 rounded-xl border border-amber-300">
          Score: {score} / {QUESTIONS.length}
        </div>
      </div>

      <div className="space-y-4">
        {QUESTIONS.map((q, idx) => {
          const selected = answers[q.id];
          const hasAnswered = selected !== undefined;
          const isCorrect = selected === q.correctIndex;

          return (
            <div key={q.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="text-xs sm:text-sm font-extrabold text-slate-900">
                {idx + 1}. {q.question}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {q.options.map((opt, optIdx) => {
                  let btnStyle = 'bg-white border-slate-200 hover:border-slate-300 text-slate-700';

                  if (hasAnswered) {
                    if (optIdx === q.correctIndex) {
                      btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold';
                    } else if (selected === optIdx) {
                      btnStyle = 'bg-rose-100 border-rose-300 text-rose-800';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelect(q.id, optIdx)}
                      className={`text-left p-3 text-xs rounded-xl border-2 transition-all flex items-center justify-between gap-1 cursor-pointer ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {hasAnswered && optIdx === q.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                      {hasAnswered && selected === optIdx && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {hasAnswered && (
                <div
                  className={`p-2.5 rounded-xl text-xs flex items-center gap-2 ${
                    isCorrect ? 'bg-emerald-100/70 text-emerald-900 font-medium' : 'bg-amber-100/70 text-amber-900'
                  }`}
                >
                  <span className="text-base">{isCorrect ? '🎉' : '💡'}</span>
                  <span>{q.funFact}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
