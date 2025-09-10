import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Star, Trophy, RefreshCw } from 'lucide-react';

interface QuizScreenProps {
  onBack: () => void;
}

interface Quiz {
  id: number;
  question: string;
  options: Array<{
    id: number;
    text: string;
    emoji: string;
    color: string;
    isCorrect: boolean;
  }>;
}

const quizData: Quiz[] = [
  {
    id: 1,
    question: "Which animal says 'Moo'?",
    options: [
      { id: 1, text: 'Dog', emoji: '🐕', color: 'bg-blue-400', isCorrect: false },
      { id: 2, text: 'Cow', emoji: '🐄', color: 'bg-green-400', isCorrect: true },
      { id: 3, text: 'Cat', emoji: '🐱', color: 'bg-yellow-400', isCorrect: false },
      { id: 4, text: 'Bird', emoji: '🐦', color: 'bg-red-400', isCorrect: false },
    ]
  },
  {
    id: 2,
    question: "What color do you get when you mix red and yellow?",
    options: [
      { id: 1, text: 'Purple', emoji: '🟣', color: 'bg-purple-400', isCorrect: false },
      { id: 2, text: 'Green', emoji: '🟢', color: 'bg-green-400', isCorrect: false },
      { id: 3, text: 'Orange', emoji: '🟠', color: 'bg-orange-400', isCorrect: true },
      { id: 4, text: 'Blue', emoji: '🔵', color: 'bg-blue-400', isCorrect: false },
    ]
  },
  {
    id: 3,
    question: "How many legs does a spider have?",
    options: [
      { id: 1, text: 'Six', emoji: '6️⃣', color: 'bg-blue-400', isCorrect: false },
      { id: 2, text: 'Four', emoji: '4️⃣', color: 'bg-green-400', isCorrect: false },
      { id: 3, text: 'Eight', emoji: '8️⃣', color: 'bg-yellow-400', isCorrect: true },
      { id: 4, text: 'Ten', emoji: '🔟', color: 'bg-red-400', isCorrect: false },
    ]
  }
];

export function QuizScreen({ onBack }: QuizScreenProps) {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const currentQuiz = quizData[currentQuizIndex];

  const handleOptionClick = (optionId: number) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(optionId);
    setShowFeedback(true);
    
    const selectedAnswer = currentQuiz.options.find(opt => opt.id === optionId);
    
    if (selectedAnswer?.isCorrect) {
      setScore(score + 1);
      // Generate confetti stars
      const newStars = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight
      }));
      setStars(newStars);
      
      // Clear stars after animation
      setTimeout(() => setStars([]), 3000);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuizIndex < quizData.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setScore(0);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    return (
      <div className="min-h-screen gradient-yellow p-4 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.6 }}
          className="card-playful text-center max-w-sm mx-auto"
        >
          <div className="text-8xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Great Job!</h2>
          <p className="text-xl text-gray-600 mb-6">
            You got {score} out of {quizData.length} questions right!
          </p>
          
          <div className="flex justify-center mb-6">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2 * i, duration: 0.5, type: "spring" }}
              >
                <Star 
                  className={`w-12 h-12 ${
                    i < score ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                  }`} 
                />
              </motion.div>
            ))}
          </div>
          
          <div className="space-y-3">
            <button
              onClick={resetQuiz}
              className="btn-primary-green w-full flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>
            
            <button
              onClick={onBack}
              className="btn-primary-blue w-full"
            >
              Back to Menu
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-red p-4 relative overflow-hidden">
      {/* Confetti Stars */}
      <AnimatePresence>
        {stars.map((star) => (
          <motion.div
            key={star.id}
            initial={{ opacity: 0, scale: 0, x: star.x, y: star.y }}
            animate={{ 
              opacity: [0, 1, 1, 0], 
              scale: [0, 1.5, 1, 0],
              y: star.y + 200,
              rotate: 360
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: "easeOut" }}
            className="absolute pointer-events-none"
          >
            <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between mb-6 pt-2">
        <button
          onClick={onBack}
          className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 text-white hover:bg-white/30 transition-all"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="font-semibold">Back</span>
        </button>
        <h2 className="text-2xl font-bold text-white">Fun Quiz</h2>
        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3">
          <Trophy className="w-5 h-5 text-yellow-300" />
          <span className="text-white font-bold">{score}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="max-w-sm mx-auto mb-8">
        <div className="flex justify-between text-white mb-2">
          <span>Question {currentQuizIndex + 1}</span>
          <span>{currentQuizIndex + 1} of {quizData.length}</span>
        </div>
        <div className="bg-white/20 rounded-full h-3">
          <div 
            className="bg-yellow-400 h-3 rounded-full transition-all duration-500"
            style={{ width: `${((currentQuizIndex + 1) / quizData.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <motion.div
        key={currentQuiz.id}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto"
      >
        <div className="card-playful text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            {currentQuiz.question}
          </h3>
        </div>

        {/* Answer Options */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {currentQuiz.options.map((option) => (
            <motion.button
              key={option.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 * option.id }}
              whileHover={{ scale: selectedOption === null ? 1.05 : 1 }}
              whileTap={{ scale: selectedOption === null ? 0.95 : 1 }}
              onClick={() => handleOptionClick(option.id)}
              disabled={selectedOption !== null}
              className={`
                ${option.color} hover:brightness-110 text-white p-6 rounded-2xl 
                shadow-lg transition-all duration-200 disabled:cursor-not-allowed
                ${selectedOption === option.id 
                  ? option.isCorrect 
                    ? 'ring-4 ring-green-300 bg-green-500' 
                    : 'ring-4 ring-red-300 bg-red-500'
                  : ''
                }
                ${selectedOption !== null && selectedOption !== option.id && option.isCorrect 
                  ? 'ring-4 ring-green-300 bg-green-500' 
                  : ''
                }
              `}
            >
              <div className="text-4xl mb-2">{option.emoji}</div>
              <div className="text-lg font-bold">{option.text}</div>
            </motion.button>
          ))}
        </div>

        {/* Feedback */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center mb-8"
            >
              <div className={`card-playful ${
                currentQuiz.options.find(opt => opt.id === selectedOption)?.isCorrect
                  ? 'bg-green-100 border-green-300'
                  : 'bg-red-100 border-red-300'
              }`}>
                <div className="text-6xl mb-2">
                  {currentQuiz.options.find(opt => opt.id === selectedOption)?.isCorrect ? '🎉' : '😊'}
                </div>
                <p className="text-xl font-bold text-gray-800">
                  {currentQuiz.options.find(opt => opt.id === selectedOption)?.isCorrect 
                    ? 'Awesome! You got it right!' 
                    : 'Good try! Let\'s learn together!'}
                </p>
              </div>
              
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
                onClick={handleNextQuestion}
                className="btn-primary-yellow mt-4"
              >
                {currentQuizIndex < quizData.length - 1 ? 'Next Question' : 'See Results'}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}