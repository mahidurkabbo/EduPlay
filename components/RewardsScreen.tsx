import { motion } from 'motion/react';
import { ArrowLeft, Star, Trophy, Award, Zap, Heart, Target } from 'lucide-react';

interface RewardsScreenProps {
  onBack: () => void;
}

const badges = [
  {
    id: 1,
    name: 'Quiz Master',
    description: 'Completed 5 quizzes!',
    icon: Trophy,
    color: 'bg-yellow-400',
    earned: true,
    progress: 100
  },
  {
    id: 2,
    name: 'Explorer',
    description: 'Discovered 10 objects!',
    icon: Target,
    color: 'bg-green-400',
    earned: true,
    progress: 100
  },
  {
    id: 3,
    name: 'Chatterbox',
    description: 'Had 3 voice conversations!',
    icon: Heart,
    color: 'bg-pink-400',
    earned: false,
    progress: 67
  },
  {
    id: 4,
    name: 'Speed Learner',
    description: 'Learn 20 new things!',
    icon: Zap,
    color: 'bg-purple-400',
    earned: false,
    progress: 45
  },
  {
    id: 5,
    name: 'Star Student',
    description: 'Get 15 perfect scores!',
    icon: Star,
    color: 'bg-blue-400',
    earned: false,
    progress: 20
  },
  {
    id: 6,
    name: 'Curious Mind',
    description: 'Ask 50 questions!',
    icon: Award,
    color: 'bg-orange-400',
    earned: false,
    progress: 12
  }
];

const stats = [
  { label: 'Total Stars', value: 847, icon: Star, color: 'text-yellow-500' },
  { label: 'Quizzes Completed', value: 23, icon: Trophy, color: 'text-blue-500' },
  { label: 'Objects Discovered', value: 15, icon: Target, color: 'text-green-500' },
  { label: 'Learning Streak', value: 7, icon: Zap, color: 'text-purple-500' }
];

export function RewardsScreen({ onBack }: RewardsScreenProps) {
  const earnedBadges = badges.filter(badge => badge.earned);
  const totalProgress = badges.reduce((sum, badge) => sum + badge.progress, 0) / badges.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-400 via-purple-500 to-pink-500 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pt-2">
        <button
          onClick={onBack}
          className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 text-white hover:bg-white/30 transition-all"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="font-semibold">Back</span>
        </button>
        <h2 className="text-2xl font-bold text-white">My Rewards</h2>
        <div className="w-20" /> {/* Spacer */}
      </div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-playful mx-auto max-w-md mb-6"
      >
        <div className="text-center">
          <div className="text-6xl mb-3">🌟</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Great Progress!</h3>
          <p className="text-gray-600 mb-4">You're doing amazing! Keep learning!</p>
          
          {/* Overall progress bar */}
          <div className="bg-gray-200 rounded-full h-4 mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${totalProgress}%` }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="gradient-blue h-4 rounded-full"
            />
          </div>
          <p className="text-sm text-gray-500">{Math.round(totalProgress)}% Complete</p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            className="card-playful text-center"
          >
            <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
            <p className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Badges Section */}
      <div className="max-w-md mx-auto">
        <h3 className="text-xl font-bold text-white mb-4 text-center">
          My Badges ({earnedBadges.length}/{badges.length})
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 50, rotate: -10 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              className={`card-playful relative overflow-hidden ${
                badge.earned ? 'ring-2 ring-yellow-300' : 'opacity-60'
              }`}
            >
              {/* Badge content */}
              <div className="text-center">
                <div className={`w-16 h-16 ${badge.color} rounded-full flex items-center justify-center mx-auto mb-3 ${
                  badge.earned ? 'animate-pulse' : 'grayscale'
                }`}>
                  <badge.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-800 mb-1 text-sm">{badge.name}</h4>
                <p className="text-xs text-gray-600 mb-3">{badge.description}</p>
                
                {/* Progress bar */}
                <div className="bg-gray-200 rounded-full h-2 mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${badge.progress}%` }}
                    transition={{ duration: 1.5, delay: 0.5 + 0.1 * index }}
                    className={`h-2 rounded-full ${badge.earned ? 'bg-green-400' : 'bg-gray-400'}`}
                  />
                </div>
                <p className="text-xs text-gray-500">{badge.progress}%</p>
                
                {/* Earned badge overlay */}
                {badge.earned && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 1 + 0.1 * index, duration: 0.5 }}
                    className="absolute top-2 right-2"
                  >
                    <div className="bg-green-500 text-white rounded-full p-1">
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Motivation Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="max-w-md mx-auto mt-6 text-center"
      >
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
          <p className="text-white font-medium">
            🎯 Keep learning to unlock more badges and earn stars!
          </p>
        </div>
      </motion.div>
    </div>
  );
}