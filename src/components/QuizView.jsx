import React, { useState } from 'react';

export default function QuizView({ questions, onComplete }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  
  const question = questions[currentQ];
  const score = answers.filter((a, i) => a === questions[i].correct).length;
  
  const handleSelect = (index) => {
    if (showResult) return;
    setSelected(index);
  };
  
  const handleSubmit = () => {
    if (selected === null) return;
    setShowResult(true);
    setAnswers([...answers, selected]);
  };
  
  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setFinished(true);
      onComplete?.(score, questions.length);
    }
  };
  
  const handleRetry = () => {
    setCurrentQ(0);
    setSelected(null);
    setShowResult(false);
    setAnswers([]);
    setFinished(false);
  };
  
  // Quiz completed view
  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);
    const isPassing = percentage >= 70;
    
    return (
      <div className="text-center py-12 animate-slide-up">
        <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full mb-6 ${
          isPassing ? 'bg-accent-soft' : 'bg-miss/10'
        }`}>
          <span className={`text-4xl font-bold ${
            isPassing ? 'text-accent' : 'text-miss'
          }`}>
            {percentage}%
          </span>
        </div>
        
        <h3 className="text-2xl font-display font-medium text-ink mb-2">
          {isPassing ? '🎉 Great job!' : 'Quiz Complete!'}
        </h3>
        
        <p className="text-soft mb-2">
          You got {score} out of {questions.length} correct
        </p>

        {!isPassing && (
          <p className="text-accent text-sm mb-6">
            Tip: Review the material and try again to improve your score
          </p>
        )}
        
        <button onClick={handleRetry} className="btn-primary">
          Retry Quiz
        </button>
      </div>
    );
  }
  
  return (
    <div>
      {/* Progress indicator */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-soft">
          Question {currentQ + 1} of {questions.length}
        </span>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i < currentQ
                  ? 'bg-accent'
                  : i === currentQ
                  ? 'bg-accent'
                  : 'bg-line'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Question */}
      <h3 className="text-xl font-display font-medium text-ink mb-6">
        {question.question}
      </h3>
      
      {/* Options */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, i) => {
          let classes = 'w-full p-4 rounded-lg text-left transition-all border-2 ';
          
          if (showResult) {
            if (i === question.correct) {
              classes += 'bg-accent-soft border-accent text-accent';
            } else if (i === selected && i !== question.correct) {
              classes += 'bg-miss/10 border-miss text-miss';
            } else {
              classes += 'bg-paper-2 border-line text-soft';
            }
          } else {
            classes += selected === i
              ? 'bg-accent-soft border-accent text-ink'
              : 'bg-paper-2 border-line text-ink/80 hover:border-soft cursor-pointer';
          }
          
          return (
            <button 
              key={i} 
              onClick={() => handleSelect(i)} 
              className={classes}
              disabled={showResult}
            >
              <span className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-mono shrink-0 ${
                  showResult && i === question.correct
                    ? 'border-accent text-accent'
                    : showResult && i === selected
                    ? 'border-miss text-miss'
                    : selected === i
                    ? 'border-accent text-accent'
                    : 'border-line text-soft'
                }`}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span>{option}</span>
              </span>
            </button>
          );
        })}
      </div>
      
      {/* Explanation */}
      {showResult && (
        <div className={`p-4 rounded-lg mb-6 animate-slide-up ${
          selected === question.correct
            ? 'bg-accent-soft border border-accent/40'
            : 'bg-miss/10 border border-miss/30'
        }`}>
          <p className={`font-medium mb-1 ${
            selected === question.correct ? 'text-accent' : 'text-miss'
          }`}>
            {selected === question.correct ? '✓ Correct!' : '✗ Not quite'}
          </p>
          <p className="text-ink/80 text-sm">{question.explanation}</p>
        </div>
      )}
      
      {/* Action button */}
      <div className="flex justify-end">
        {!showResult ? (
          <button
            onClick={handleSubmit}
            disabled={selected === null}
            className="btn-primary"
          >
            Check Answer
          </button>
        ) : (
          <button onClick={handleNext} className="btn-primary">
            {currentQ < questions.length - 1 ? 'Next Question' : 'See Results'}
          </button>
        )}
      </div>
    </div>
  );
}
