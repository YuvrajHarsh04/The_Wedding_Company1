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
            {/* Cat Character with Speech Bubble - Only on first question */}
            <AnimatePresence>
              {isFirstQuestion && (
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="absolute -left-24 bottom-24 z-10"
                >
                  {/* Speech Bubble */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.5, type: "spring", stiffness: 200 }}
                    className="relative bg-white rounded-2xl shadow-lg px-5 py-3 mb-3 border-2 border-cyan-300"
                  >
                    <p className="text-lg font-bold text-gray-800" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                      Best of Luck!
                    </p>
                    {/* Tail */}
                    <div className="absolute -bottom-3 left-12 w-6 h-6 bg-white border-b-2 border-r-2 border-cyan-300 transform rotate-45"></div>
                  </motion.div>
                  
                  {/* Cat Illustration */}
                  <motion.div
                    className="ml-4"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <svg width="120" height="140" viewBox="0 0 120 140" fill="none">
                      {/* Cat Body/Head */}
                      <ellipse cx="60" cy="80" rx="45" ry="50" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="2"/>
                      
                      {/* Cat Face Features */}
                      <ellipse cx="45" cy="75" rx="6" ry="8" fill="#333"/>
                      <ellipse cx="75" cy="75" rx="6" ry="8" fill="#333"/>
                      
                      {/* Nose */}
                      <path d="M60 85 L55 90 L65 90 Z" fill="#FFB6C1"/>
                      
                      {/* Mouth */}
                      <path d="M60 90 Q50 95 45 92" stroke="#333" strokeWidth="2" fill="none"/>
                      <path d="M60 90 Q70 95 75 92" stroke="#333" strokeWidth="2" fill="none"/>
                      
                      {/* Whiskers */}
                      <line x1="30" y1="80" x2="10" y2="78" stroke="#999" strokeWidth="1.5"/>
                      <line x1="30" y1="85" x2="10" y2="87" stroke="#999" strokeWidth="1.5"/>
                      <line x1="90" y1="80" x2="110" y2="78" stroke="#999" strokeWidth="1.5"/>
                      <line x1="90" y1="85" x2="110" y2="87" stroke="#999" strokeWidth="1.5"/>
                      
                      {/* Collar */}
                      <ellipse cx="60" cy="115" rx="30" ry="8" fill="#FF6B9D"/>
                      <circle cx="60" cy="115" r="4" fill="#FFD700"/>
                    </svg>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Quiz Card */}
            <motion.div
              className="bg-white bg-opacity-90 backdrop-blur-sm rounded-[3rem] shadow-2xl p-16 relative"
              layout
            >
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center mb-12"
              >
                <h1 className="text-6xl font-serif italic text-teal-700 mb-3" style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 600 }}>
                  Test Your Knowledge
                </h1>
                <p className="text-base text-gray-600">Answer all questions to see your results</p>
              </motion.div>

              {/* Progress Indicators */}
              <div className="flex justify-center items-center gap-4 mb-10">
                {quizQuestions.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`h-1 rounded-full ${
                      index === currentQuestion
                        ? 'bg-gray-800'
                        : index < currentQuestion
                        ? 'bg-gray-400'
                        : 'bg-gray-300'
                    }`}
                    initial={{ width: index === 0 ? 128 : 80 }}
                    animate={{
                      width: index === currentQuestion ? 128 : 80
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
                  className="mb-8"
                >
                  <div className="text-center py-5 px-8 rounded-2xl bg-cyan-50 border-2 border-cyan-200">
                    <p className="text-lg text-gray-800 font-medium">
                      {currentQ.id}. {currentQ.question}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Options */}
              <motion.div className="space-y-5 mb-10 max-w-3xl mx-auto">
                <AnimatePresence mode="wait">
                  {currentQ.options.map((option, index) => {
                    const isSelected = selectedAnswers[currentQuestion] === option;
                    
                    return (
                      <motion.button
                        key={`${currentQuestion}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswerSelect(option)}
                        className={`w-full py-5 px-8 rounded-2xl text-center transition-all duration-300 text-lg font-medium ${
                          isSelected
                            ? 'bg-pink-50 border-pink-400 text-gray-800 shadow-lg'
                            : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300 hover:shadow-md'
                        }`}
                        style={{ borderWidth: isSelected ? '3px' : '2px' }}
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
                className="flex justify-center items-center gap-6"
              >
                <motion.button
                  onClick={handlePrevious}
                  disabled={isFirstQuestion}
                  whileHover={!isFirstQuestion ? { scale: 1.1 } : {}}
                  whileTap={!isFirstQuestion ? { scale: 0.9 } : {}}
                  className={`p-3 rounded-xl transition-all duration-200 ${
                    isFirstQuestion
                      ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                      : 'bg-cyan-100 text-teal-700 hover:bg-cyan-200 shadow-sm hover:shadow-md'
                  }`}
                  aria-label="Previous question"
                >
                  <ChevronLeft size={24} strokeWidth={2.5} />
                </motion.button>

                {isLastQuestion ? (
                  <motion.button
                    onClick={handleSubmit}
                    disabled={!hasSelectedAnswer}
                    whileHover={hasSelectedAnswer ? { scale: 1.05 } : {}}
                    whileTap={hasSelectedAnswer ? { scale: 0.95 } : {}}
                    className={`px-12 py-3 rounded-xl font-semibold transition-all duration-200 text-base ${
                      hasSelectedAnswer
                        ? 'bg-cyan-200 text-gray-800 hover:bg-cyan-300 shadow-md hover:shadow-lg'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Submit
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={handleNext}
                    disabled={!hasSelectedAnswer}
                    whileHover={hasSelectedAnswer ? { scale: 1.1 } : {}}
                    whileTap={hasSelectedAnswer ? { scale: 0.9 } : {}}
                    className={`p-3 rounded-xl transition-all duration-200 ${
                      hasSelectedAnswer
                        ? 'bg-cyan-100 text-teal-700 hover:bg-cyan-200 shadow-sm hover:shadow-md'
                        : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                    }`}
                    aria-label="Next question"
                  >
                    <ChevronRight size={24} strokeWidth={2.5} />
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
            className="w-full max-w-5xl bg-white bg-opacity-90 backdrop-blur-sm rounded-[3rem] shadow-2xl p-16 text-center"
          >
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base text-teal-700 mb-6 font-semibold tracking-wide"
            >
              Keep Learning!
            </motion.p>
            
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-5xl font-serif italic text-teal-700 mb-10"
              style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 600 }}
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
              className="px-12 py-3 bg-cyan-200 text-gray-800 rounded-xl font-semibold hover:bg-cyan-300 transition-all shadow-md hover:shadow-lg text-base"
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