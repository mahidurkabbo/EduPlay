import { motion } from 'motion/react';
import { Camera, Mic, Brain, Trophy, Home } from 'lucide-react';

interface NavigationMenuProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

const menuItems = [
  { id: 'welcome', icon: Home, label: 'Home', color: 'bg-blue-500' },
  { id: 'object', icon: Camera, label: 'Objects', color: 'bg-green-500' },
  { id: 'voice', icon: Mic, label: 'Chat', color: 'bg-purple-500' },
  { id: 'quiz', icon: Brain, label: 'Quiz', color: 'bg-red-500' },
  { id: 'rewards', icon: Trophy, label: 'Rewards', color: 'bg-yellow-500' }
];

export function NavigationMenu({ currentScreen, onNavigate }: NavigationMenuProps) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="max-w-md mx-auto bg-white/90 backdrop-blur-sm rounded-3xl p-4 shadow-2xl border border-white/20"
    >
      <div className="grid grid-cols-5 gap-2">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate(item.id)}
            className={`
              flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-200
              ${currentScreen === item.id 
                ? `${item.color} text-white shadow-lg` 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
          >
            <item.icon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">{item.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}