import React, { useState, useEffect, useCallback, useMemo } from 'react';

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function ExamView({ questions, timeLimit = 45, passingScore = 80, onComplete }) {
  const [phase, setPhase] = useState('intro'); // intro | active | review | results
  const [shuffled, setShuffled] = useState([]);
  const [answers, setAnswers] = useState({});    // index -> selected option
  const [flagged, setFlagged] = useState(new Set());
  const [currentQ, setCurrentQ] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeLimit * 60);

  // Shuffle questions on start
  const startExam = () => {
    setShuffled(shuffleArray(questions));
    setAnswers({});
    setFlagged(new Set());
    setCurrentQ(0);
    setTimeLeft(timeLimit * 60);
    setPhase('active');
  };

  // Timer
  useEffect(() => {
    if (phase !== 'active') return;
    if (timeLeft <= 0) {
      setPhase('results');
      return;
    }
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [phase, timeLeft]);

  // Calculate score
  const score = useMemo(() => {
    if (!shuffled.length) return { correct: 0, total: 0, percentage: 0 };
    let correct = 0;
    shuffled.forEach((q, i) => {
      if (answers[i] === q.correct) correct++;
    });
    return {
      correct,
      total: shuffled.length,
      percentage: Math.round((correct / shuffled.length) * 100),
    };
  }, [shuffled, answers]);

  const handleFinish = useCallback(() => {
    setPhase('results');
    onComplete?.(score.correct, score.total);
  }, [score, onComplete]);

  // When time runs out
  useEffect(() => {
    if (phase === 'active' && timeLeft <= 0) {
      handleFinish();
    }
  }, [phase, timeLeft, handleFinish]);

  const answeredCount = Object.keys(answers).length;
  const unansweredCount = shuffled.length - answeredCount;
  const flaggedCount = flagged.size;
  const isPassing = score.percentage >= passingScore;

  // --- INTRO ---
  if (phase === 'intro') {
    return (
      <div className="text-center py-12 animate-slide-up">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-miss/10 mb-6">
          <span className="text-4xl">📋</span>
        </div>
        <h2 className="text-2xl font-display font-medium text-ink mb-4">Ready to begin?</h2>
        <div className="max-w-md mx-auto text-left space-y-3 mb-8">
          <div className="flex items-center gap-3 text-ink/80">
            <span className="text-accent">•</span>
            <span>{questions.length} questions</span>
          </div>
          <div className="flex items-center gap-3 text-ink/80">
            <span className="text-accent">•</span>
            <span>{timeLimit} minute time limit</span>
          </div>
          <div className="flex items-center gap-3 text-ink/80">
            <span className="text-accent">•</span>
            <span>{passingScore}% required to pass</span>
          </div>
          <div className="flex items-center gap-3 text-ink/80">
            <span className="text-accent">•</span>
            <span>You can flag questions for review</span>
          </div>
          <div className="flex items-center gap-3 text-ink/80">
            <span className="text-accent">•</span>
            <span>No feedback until the end</span>
          </div>
        </div>
        <button onClick={startExam} className="btn-primary text-lg px-8 py-4">
          Start Exam
        </button>
      </div>
    );
  }

  // --- REVIEW (pre-submit confirmation) ---
  if (phase === 'review') {
    return (
      <div className="py-8 animate-slide-up">
        <h2 className="text-2xl font-display font-medium text-ink mb-6 text-center">Review & Submit</h2>

        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
          <div className="card p-4 text-center">
            <div className="text-2xl font-display font-medium text-accent">{answeredCount}</div>
            <div className="text-xs text-soft">Answered</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-display font-medium text-miss">{unansweredCount}</div>
            <div className="text-xs text-soft">Unanswered</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-display font-medium text-soft">{flaggedCount}</div>
            <div className="text-xs text-soft">Flagged</div>
          </div>
        </div>

        {/* Question grid for jumping back */}
        <div className="max-w-lg mx-auto mb-8">
          <h3 className="text-sm font-medium text-soft mb-3">Click a question to go back:</h3>
          <div className="flex flex-wrap gap-2">
            {shuffled.map((_, i) => {
              const isAnswered = answers[i] !== undefined;
              const isFlagged = flagged.has(i);
              return (
                <button
                  key={i}
                  onClick={() => { setCurrentQ(i); setPhase('active'); }}
                  className={`w-9 h-9 rounded text-xs font-mono flex items-center justify-center border transition-colors ${
                    isFlagged
                      ? 'bg-miss/20 border-miss text-miss'
                      : isAnswered
                        ? 'bg-accent-soft border-accent text-accent'
                        : 'bg-paper-2 border-line text-soft'
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <button onClick={() => setPhase('active')} className="btn-secondary">
            Go Back
          </button>
          <button onClick={handleFinish} className="btn-primary">
            Submit Exam
          </button>
        </div>
      </div>
    );
  }

  // --- RESULTS ---
  if (phase === 'results') {
    // Group by domain if available
    const domainScores = {};
    shuffled.forEach((q, i) => {
      const domain = q.domain || 'General';
      if (!domainScores[domain]) domainScores[domain] = { correct: 0, total: 0 };
      domainScores[domain].total++;
      if (answers[i] === q.correct) domainScores[domain].correct++;
    });

    return (
      <div className="py-8 animate-slide-up">
        {/* Score circle */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-36 h-36 rounded-full mb-4 ${
            isPassing ? 'bg-accent-soft' : 'bg-miss/10'
          }`}>
            <span className={`text-5xl font-bold ${isPassing ? 'text-accent' : 'text-miss'}`}>
              {score.percentage}%
            </span>
          </div>
          <h2 className={`text-3xl font-display font-medium mb-2 ${isPassing ? 'text-accent' : 'text-miss'}`}>
            {isPassing ? 'PASS' : 'NOT YET'}
          </h2>
          <p className="text-soft">
            {score.correct} / {score.total} correct — {passingScore}% required
          </p>
        </div>

        {/* Domain breakdown */}
        {Object.keys(domainScores).length > 1 && (
          <div className="max-w-md mx-auto mb-8">
            <h3 className="text-lg font-display font-medium text-ink mb-3">Score by Domain</h3>
            <div className="space-y-2">
              {Object.entries(domainScores).map(([domain, ds]) => {
                const pct = Math.round((ds.correct / ds.total) * 100);
                return (
                  <div key={domain} className="flex items-center gap-3">
                    <span className="text-sm text-soft w-32 truncate">{domain}</span>
                    <div className="flex-1 h-2 bg-line rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${pct >= passingScore ? 'bg-accent' : 'bg-miss'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-sm text-ink/80 w-12 text-right">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Review explanations */}
        <div className="max-w-2xl mx-auto mb-8">
          <h3 className="text-lg font-display font-medium text-ink mb-4">Review Answers</h3>
          <div className="space-y-4">
            {shuffled.map((q, i) => {
              const userAnswer = answers[i];
              const isCorrect = userAnswer === q.correct;
              return (
                <div key={i} className={`p-4 rounded-lg border ${
                  isCorrect
                    ? 'bg-accent-soft/50 border-accent/30'
                    : 'bg-miss/5 border-miss/20'
                }`}>
                  <div className="flex items-start gap-2 mb-2">
                    <span className={`text-sm font-mono ${isCorrect ? 'text-accent' : 'text-miss'}`}>
                      Q{i + 1}
                    </span>
                    <span className="text-ink text-sm">{q.question}</span>
                  </div>
                  {!isCorrect && (
                    <div className="ml-8 text-sm">
                      <p className="text-miss">
                        Your answer: {userAnswer !== undefined ? q.options[userAnswer] : '(unanswered)'}
                      </p>
                      <p className="text-accent">
                        Correct: {q.options[q.correct]}
                      </p>
                    </div>
                  )}
                  {q.explanation && (
                    <p className="ml-8 text-xs text-soft mt-1">{q.explanation}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center">
          <button onClick={startExam} className="btn-primary">
            Retry Exam
          </button>
        </div>
      </div>
    );
  }

  // --- ACTIVE ---
  const question = shuffled[currentQ];

  return (
    <div>
      {/* Top bar: timer + progress */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-line">
        <span className="text-sm text-soft">
          Question {currentQ + 1} of {shuffled.length}
        </span>
        <div className="flex items-center gap-4">
          <span className="text-sm text-soft">
            {answeredCount}/{shuffled.length} answered
          </span>
          <span className={`font-mono text-lg font-bold ${
            timeLeft <= 300 ? 'text-miss' : timeLeft <= 600 ? 'text-accent' : 'text-ink'
          }`}>
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {/* Question */}
      <h3 className="text-xl font-display font-medium text-ink mb-6">{question.question}</h3>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, i) => {
          const isSelected = answers[currentQ] === i;
          return (
            <button
              key={i}
              onClick={() => setAnswers(prev => ({ ...prev, [currentQ]: i }))}
              className={`w-full p-4 rounded-lg text-left transition-all border-2 ${
                isSelected
                  ? 'bg-accent-soft border-accent text-ink'
                  : 'bg-paper-2 border-line text-ink/80 hover:border-soft cursor-pointer'
              }`}
            >
              <span className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-mono shrink-0 ${
                  isSelected ? 'border-accent text-accent' : 'border-line text-soft'
                }`}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span>{option}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Flag + Nav buttons */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => {
            setFlagged(prev => {
              const next = new Set(prev);
              next.has(currentQ) ? next.delete(currentQ) : next.add(currentQ);
              return next;
            });
          }}
          className={`btn-secondary flex items-center gap-2 ${
            flagged.has(currentQ) ? 'text-miss border-miss' : ''
          }`}
        >
          {flagged.has(currentQ) ? '⚑ Flagged' : '⚐ Flag'}
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
            disabled={currentQ === 0}
            className="btn-secondary"
          >
            ← Prev
          </button>
          {currentQ < shuffled.length - 1 ? (
            <button onClick={() => setCurrentQ(currentQ + 1)} className="btn-primary">
              Next →
            </button>
          ) : (
            <button onClick={() => setPhase('review')} className="btn-primary">
              Review & Submit
            </button>
          )}
        </div>
      </div>

      {/* Question palette */}
      <div className="border-t border-line pt-4">
        <div className="flex flex-wrap gap-1.5">
          {shuffled.map((_, i) => {
            const isAnswered = answers[i] !== undefined;
            const isFlagged = flagged.has(i);
            const isCurrent = i === currentQ;
            return (
              <button
                key={i}
                onClick={() => setCurrentQ(i)}
                className={`w-8 h-8 rounded text-xs font-mono flex items-center justify-center border transition-colors ${
                  isCurrent
                    ? 'bg-accent border-accent text-paper font-bold'
                    : isFlagged
                      ? 'bg-miss/20 border-miss text-miss'
                      : isAnswered
                        ? 'bg-accent-soft border-accent text-accent'
                        : 'bg-paper-2 border-line text-soft hover:border-soft'
                }`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
