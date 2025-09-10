import { motion } from 'motion/react';
import { Play, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface WelcomeScreenProps {
  onStartLearning: () => void;
}

export function WelcomeScreen({ onStartLearning }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen gradient-blue flex flex-col items-center justify-center p-6 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 opacity-20">
        <Star className="w-8 h-8 animate-pulse" />
      </div>
      <div className="absolute top-20 right-16 opacity-20">
        <Star className="w-6 h-6 animate-pulse animation-delay-1000" />
      </div>
      <div className="absolute bottom-32 left-8 opacity-20">
        <Star className="w-10 h-10 animate-pulse animation-delay-2000" />
      </div>
      <div className="absolute bottom-20 right-12 opacity-20">
        <Star className="w-7 h-7 animate-pulse animation-delay-500" />
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center space-y-8 max-w-sm mx-auto">
        {/* Mascot */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.5 }}
          className="relative"
        >
          <div className="w-48 h-48 rounded-full overflow-hidden bg-white/20 p-4 backdrop-blur-sm border-4 border-white/30">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1744451658473-cf5c564d5a37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhjdXRlJTIwY2FydG9vbiUyMG1hc2NvdCUyMHJvYm90JTIwY2hhcmFjdGVyfGVufDF8fHx8MTc1NzUxNDA3MHww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Learning Buddy Mascot"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          
          {/* Waving animation hand */}
          <motion.div
            animate={{ rotate: [0, 20, -20, 20, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="absolute -right-2 top-12 text-4xl"
          >
            👋
          </motion.div>
        </motion.div>

        {/* App Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center space-y-2"
        >
          <h1 className="text-5xl font-extrabold mb-2">Learning Buddy</h1>
          <p className="text-xl opacity-90">Your fun learning companion!</p>
        </motion.div>

        {/* Start Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6, type: "spring" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStartLearning}
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-12 py-6 rounded-full text-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-200 flex items-center gap-3 min-w-[250px] justify-center"
        >
          <Play className="w-8 h-8 fill-current" />
          Start Learning!
        </motion.button>

        {/* Fun tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="text-lg opacity-80 text-center"
        >
          Let's explore and learn together! 🌟
        </motion.p>
      </div>
    </div>
  );
}