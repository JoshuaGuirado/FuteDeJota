import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { quizData, Question } from '../data/quizData';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, CheckCircle2, XCircle } from 'lucide-react';

type Category = keyof typeof quizData;

export const Quiz: React.FC = () => {
  const { t } = useLanguage();
  const [category, setCategory] = useState<Category | null>(null);
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleCategorySelect = (cat: Category) => {
    setCategory(cat);
    const shuffled = [...quizData[cat]].sort(() => Math.random() - 0.5).slice(0, 10);
    setCurrentQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  const handleAnswer = (option: string, index: number) => {
    if (isAnswered || !category) return;
    
    setSelectedAnswer(index);
    setIsAnswered(true);
    
    if (option === currentQuestions[currentQuestionIndex].correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (!category) return;
    
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCategory(null);
  };

  if (!category) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          {t('quiz.selectCategory')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(Object.keys(quizData) as Category[]).map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCategorySelect(cat)}
              className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 hover:border-green-500 dark:hover:border-green-500 transition-colors text-center"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {t(`quiz.categories.${cat}`)}
              </h3>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  const currentQuestion = currentQuestions[currentQuestionIndex];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-800">
        <div className="flex justify-between items-center mb-8">
          <span className="text-sm font-bold text-green-600 dark:text-green-400 uppercase tracking-wider">
            {t(`quiz.categories.${category}`)}
          </span>
          <span className="text-gray-500 dark:text-gray-400 font-medium">
            {currentQuestionIndex + 1} / {currentQuestions.length}
          </span>
        </div>

        {showResult ? (
          <div className="text-center py-8">
            <Trophy className="w-20 h-20 mx-auto text-yellow-500 mb-6" />
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {t('quiz.finish')}
            </h3>
            <p className="text-2xl text-gray-600 dark:text-gray-400 mb-8">
              {t('quiz.score')}: <span className="font-bold text-green-600 dark:text-green-400">{score}</span> / {currentQuestions.length}
            </p>
            <button
              onClick={resetQuiz}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl transition-colors"
            >
              {t('quiz.playAgain')}
            </button>
          </div>
        ) : (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              {currentQuestion?.text}
            </h3>
            
            <div className="space-y-3 mb-8">
              {currentQuestion?.options.map((option, index) => {
                const isCorrect = option === currentQuestion.correctAnswer;
                const isSelected = index === selectedAnswer;
                
                let buttonClass = "w-full text-left p-4 rounded-xl border-2 transition-all font-medium text-lg flex justify-between items-center ";
                
                if (!isAnswered) {
                  buttonClass += "border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200";
                } else {
                  if (isCorrect) {
                    buttonClass += "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400";
                  } else if (isSelected && !isCorrect) {
                    buttonClass += "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400";
                  } else {
                    buttonClass += "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-gray-400 dark:text-gray-600 opacity-50";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option, index)}
                    disabled={isAnswered}
                    className={buttonClass}
                  >
                    <span>{option}</span>
                    {isAnswered && isCorrect && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                    {isAnswered && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-red-500" />}
                  </button>
                );
              })}
            </div>

            <AnimatePresence>
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-end"
                >
                  <button
                    onClick={nextQuestion}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl transition-colors"
                  >
                    {currentQuestionIndex < currentQuestions.length - 1 ? t('quiz.next') : t('quiz.finish')}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};
