'use client';

import { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw,
  Trophy,
  AlertCircle
} from 'lucide-react';
import { QuizQuestion } from '@/data/curriculum';
import { useStore } from '@/lib/store';

interface QuizComponentProps {
  questions: QuizQuestion[];
  lessonId: string;
  phaseColor: string;
  onComplete: (score: number) => void;
  onClose: () => void;
}

export default function QuizComponent({
  questions,
  lessonId,
  phaseColor,
  onComplete,
  onClose
}: QuizComponentProps) {
  const { saveQuizScore, quizScores } = useStore();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleSelectAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setIsAnswered(true);
    const correct = selectedAnswer === question.correctAnswer;
    setAnswers([...answers, correct]);
    
    if (correct) {
      setCorrectAnswers(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      // Quiz complete
      const finalScore = Math.round((correctAnswers + (isCorrect ? 1 : 0)) / questions.length * 100);
      saveQuizScore(lessonId, finalScore);
      setShowResults(true);
      onComplete(finalScore);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCorrectAnswers(0);
    setShowResults(false);
    setAnswers([]);
  };

  if (showResults) {
    const finalScore = Math.round(correctAnswers / questions.length * 100);
    const bestScore = quizScores[lessonId] || 0;
    const isNewBest = finalScore > bestScore;
    
    return (
      <div className="text-center py-8">
        <div 
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: `${phaseColor}20` }}
        >
          <Trophy className="w-10 h-10" style={{ color: phaseColor }} />
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-2">Quiz Complete!</h3>
        
        <div className="text-5xl font-bold my-6" style={{ color: phaseColor }}>
          {finalScore}%
        </div>
        
        <p className="text-void-400 mb-2">
          You got {correctAnswers} out of {questions.length} questions correct
        </p>
        
        {isNewBest && finalScore > 0 && (
          <p className="text-green-400 text-sm mb-6">
            🎉 New personal best!
          </p>
        )}

        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            onClick={handleRetry}
            className="px-4 py-2 rounded-lg bg-void-800 text-void-300 hover:text-white transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Retry Quiz
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg font-medium transition-colors"
            style={{ 
              backgroundColor: phaseColor,
              color: '#0a0a0f'
            }}
          >
            Continue Lesson
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-void-400 mb-2">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="h-2 bg-void-800 rounded-full overflow-hidden">
          <div 
            className="h-full transition-all duration-300"
            style={{ 
              width: `${progress}%`,
              backgroundColor: phaseColor
            }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-white mb-4">{question.question}</h4>
        
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectAnswer = index === question.correctAnswer;
            
            let bgColor = 'bg-void-800/50 hover:bg-void-800';
            let borderColor = 'border-void-700';
            let textColor = 'text-void-300';
            
            if (isAnswered) {
              if (isCorrectAnswer) {
                bgColor = 'bg-green-500/20';
                borderColor = 'border-green-500';
                textColor = 'text-green-400';
              } else if (isSelected && !isCorrectAnswer) {
                bgColor = 'bg-red-500/20';
                borderColor = 'border-red-500';
                textColor = 'text-red-400';
              }
            } else if (isSelected) {
              bgColor = '';
              borderColor = '';
            }
            
            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={isAnswered}
                className={`w-full p-4 rounded-lg border text-left transition-all ${bgColor} ${textColor}`}
                style={
                  isSelected && !isAnswered 
                    ? { 
                        backgroundColor: `${phaseColor}20`,
                        borderColor: phaseColor
                      }
                    : { borderColor: isAnswered && (isCorrectAnswer || (isSelected && !isCorrectAnswer)) ? undefined : borderColor.replace('border-', '') }
                }
              >
                <div className="flex items-center gap-3">
                  <span 
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium border ${
                      isAnswered 
                        ? isCorrectAnswer 
                          ? 'border-green-500 text-green-500' 
                          : isSelected 
                            ? 'border-red-500 text-red-500' 
                            : 'border-void-600 text-void-600'
                        : isSelected
                          ? ''
                          : 'border-void-600 text-void-600'
                    }`}
                    style={isSelected && !isAnswered ? { borderColor: phaseColor, color: phaseColor } : {}}
                  >
                    {isAnswered && isCorrectAnswer ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : isAnswered && isSelected && !isCorrectAnswer ? (
                      <XCircle className="w-4 h-4" />
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </span>
                  <span>{option}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Explanation (shown after answering) */}
      {isAnswered && question.explanation && (
        <div 
          className={`p-4 rounded-lg mb-6 ${
            isCorrect ? 'bg-green-500/10 border border-green-500/30' : 'bg-amber-500/10 border border-amber-500/30'
          }`}
        >
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <p className={`font-medium mb-1 ${isCorrect ? 'text-green-400' : 'text-amber-400'}`}>
                {isCorrect ? 'Correct!' : 'Not quite right'}
              </p>
              <p className="text-sm text-void-300">{question.explanation}</p>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3">
        {!isAnswered ? (
          <button
            onClick={handleSubmitAnswer}
            disabled={selectedAnswer === null}
            className="px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ 
              backgroundColor: selectedAnswer !== null ? phaseColor : `${phaseColor}50`,
              color: '#0a0a0f'
            }}
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            style={{ 
              backgroundColor: phaseColor,
              color: '#0a0a0f'
            }}
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
