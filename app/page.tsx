'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "What sound does a cat make?",
    options: ["Bhau-Bhau", "Meow-Meow", "Oink-Oink"],
    correctAnswer: "Meow-Meow"
  },
  {
    id: 2,
    question: "What would you probably find in your fridge?",
    options: ["Shoes", "Ice Cream", "Books"],
    correctAnswer: "Ice Cream"
  },
  {
    id: 3,
    question: "What color are bananas?",
    options: ["Blue", "Yellow", "Red"],
    correctAnswer: "Yellow"
  },
  {
    id: 4,
    question: "How many stars are in the sky?",
    options: ["Two", "Infinite", "One Hundred"],
    correctAnswer: "Infinite"
  }
];

const App: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const handleAnswerSelect = (answer: string): void => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answer
    });
  };

  const handleNext = (): void => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = (): void => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = (): void => {
    let finalScore = 0;
    quizQuestions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        finalScore++;
      }
    });
    setScore(finalScore);
    setShowResults(true);
  };

  const handleRestart = (): void => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const currentQ = quizQuestions[currentQuestion];
  const isFirstQuestion = currentQuestion === 0;
  const isLastQuestion = currentQuestion === quizQuestions.length - 1;
  const hasSelectedAnswer = selectedAnswers[currentQuestion] !== undefined;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-100 to-cyan-100 flex items-center justify-center p-8 font-sans">
      <AnimatePresence mode="wait">
        {!showResults ? (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative w-full max-w-5xl"
          >
            {/* Paw Character with Speech Bubble - Only on first question */}
            <AnimatePresence>
              {isFirstQuestion && (
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="absolute -left-4 bottom-32 z-10 flex flex-col items-start"
                >
                  {/* Speech Bubble */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.5, type: "spring", stiffness: 200 }}
                    className="relative bg-white rounded-2xl shadow-md px-5 py-2.5 mb-2 border-2 border-cyan-300"
                  >
                    <p className="text-base font-bold text-gray-800" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                      Best of Luck!
                    </p>
                    {/* Tail */}
                    <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white border-b-2 border-r-2 border-cyan-300 transform rotate-45"></div>
                  </motion.div>
                  
                  {/* Paw Illustration */}
                  <motion.div
                    className="ml-2"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <img 
                      src="/images/749d79faabe3ab4ee8d83233bf1b15aa4471e72b.gif"
                      alt="Cute paw" 
                      className="w-30 h-30"
                    />
                  </motion.div> 
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Quiz Card */}
            <motion.div
              className="bg-white rounded-[2.5rem] shadow-xl p-12 relative border-4 border-blue-200"
              layout
            >
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center mb-8"
              >
                <h1 className="text-5xl font-serif italic mb-2" style={{ 
                  fontFamily: 'Georgia, serif', 
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #0e7490 0%, #06b6d4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Test Your Knowledge
                </h1>
                <p className="text-sm text-gray-600">Answer all questions to see your results</p>
              </motion.div>

              {/* Progress Indicators */}
              <div className="flex justify-center items-center gap-3 mb-8">
                {quizQuestions.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === currentQuestion
                        ? 'bg-gray-900'
                        : index < currentQuestion
                        ? 'bg-gray-500'
                        : 'bg-gray-300'
                    }`}
                    initial={{ width: index === 0 ? 120 : 60 }}
                    animate={{
                      width: index === currentQuestion ? 120 : 60
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                ))}
              </div>

              {/* Question */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6"
                >
                  <div className="text-center py-4 px-6 rounded-xl bg-cyan-50 border border-cyan-200">
                    <p className="text-base text-gray-800 font-medium">
                      {currentQ.id}. {currentQ.question}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Options */}
              <motion.div className="space-y-4 mb-8 max-w-2xl mx-auto">
                <AnimatePresence mode="wait">
                  {currentQ.options.map((option, index) => {
                    const isSelected = selectedAnswers[currentQuestion] === option;
                    
                    return (
                      <motion.button
                        key={`${currentQuestion}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleAnswerSelect(option)}
                        className={`w-full py-4 px-6 rounded-xl text-center transition-all duration-200 text-base font-medium border-2 ${
                          isSelected
                            ? 'bg-gray-50 border-gray-800 text-gray-900 shadow-md'
                            : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300'
                        }`}
                      >
                        {option}
                      </motion.button>
                    );
                  })}
                </AnimatePresence>
              </motion.div>

              {/* Navigation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex justify-center items-center gap-4"
              >
                <motion.button
                  onClick={handlePrevious}
                  disabled={isFirstQuestion}
                  whileHover={!isFirstQuestion ? { scale: 1.05 } : {}}
                  whileTap={!isFirstQuestion ? { scale: 0.95 } : {}}
                  className={`p-2.5 rounded-lg transition-all duration-200 ${
                    isFirstQuestion
                      ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                      : 'bg-cyan-200 text-cyan-900 hover:bg-cyan-300 shadow-sm'
                  }`}
                  aria-label="Previous question"
                >
                  <ChevronLeft size={20} strokeWidth={2.5} />
                </motion.button>

                {isLastQuestion ? (
                  <motion.button
                    onClick={handleSubmit}
                    disabled={!hasSelectedAnswer}
                    whileHover={hasSelectedAnswer ? { scale: 1.03 } : {}}
                    whileTap={hasSelectedAnswer ? { scale: 0.97 } : {}}
                    className={`px-10 py-2.5 rounded-lg font-semibold transition-all duration-200 text-sm ${
                      hasSelectedAnswer
                        ? 'bg-cyan-200 text-gray-900 hover:bg-cyan-300 shadow-md'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Submit
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={handleNext}
                    disabled={!hasSelectedAnswer}
                    whileHover={hasSelectedAnswer ? { scale: 1.05 } : {}}
                    whileTap={hasSelectedAnswer ? { scale: 0.95 } : {}}
                    className={`p-2.5 rounded-lg transition-all duration-200 ${
                      hasSelectedAnswer
                        ? 'bg-cyan-200 text-cyan-900 hover:bg-cyan-300 shadow-sm'
                        : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                    }`}
                    aria-label="Next question"
                  >
                    <ChevronRight size={20} strokeWidth={2.5} />
                  </motion.button>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          /* Results Card */
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full max-w-5xl bg-white rounded-[2.5rem] shadow-xl p-16 text-center border-4 border-blue-200"
          >
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm text-teal-700 mb-6 font-semibold tracking-wide"
            >
              Keep Learning!
            </motion.p>
            
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-4xl font-serif italic text-teal-700 mb-10"
              style={{ fontFamily: 'Georgia, serif', fontWeight: 600 }}
            >
              Your Final score is
            </motion.h2>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 200 }}
              className="mb-12"
            >
              <motion.p
                className="text-[12rem] font-bold text-teal-700 leading-none"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                {score}
              </motion.p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRestart}
              className="px-10 py-2.5 bg-cyan-200 text-gray-900 rounded-lg font-semibold hover:bg-cyan-300 transition-all shadow-md text-sm"
            >
              Try Again
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
