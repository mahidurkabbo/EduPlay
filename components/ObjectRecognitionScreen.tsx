import { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, ArrowLeft, Lightbulb, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ObjectRecognitionScreenProps {
  onBack: () => void;
}

const sampleObjects = [
  {
    name: 'Apple',
    emoji: '🍎',
    facts: ['Apples grow on trees!', 'They come in red, green, and yellow', 'Great for healthy snacks!'],
    image: 'https://images.unsplash.com/photo-1744608257939-1ecbd90f1320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhjb2xvcmZ1bCUyMHRveSUyMGFuaW1hbHMlMjBjaGlsZHJlbnxlbnwxfHx8fDE3NTc1MTQwNzR8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    name: 'Dog',
    emoji: '🐕',
    facts: ['Dogs are loyal friends!', 'They love to play and run', 'Dogs help keep us safe'],
    image: 'https://images.unsplash.com/photo-1744608257939-1ecbd90f1320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhjb2xvcmZ1bCUyMHRveSUyMGFuaW1hbHMlMjBjaGlsZHJlbnxlbnwxfHx8fDE3NTc1MTQwNzR8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    name: 'Car',
    emoji: '🚗',
    facts: ['Cars help us travel far!', 'They have four wheels', 'Some cars are electric!'],
    image: 'https://images.unsplash.com/photo-1744608257939-1ecbd90f1320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhjb2xvcmZ1bCUyMHRveSUyMGFuaW1hbHMlMjBjaGlsZHJlbnxlbnwxfHx8fDE3NTc1MTQwNzR8MA&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

export function ObjectRecognitionScreen({ onBack }: ObjectRecognitionScreenProps) {
  const [currentObject, setCurrentObject] = useState<typeof sampleObjects[0] | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setCurrentObject(null);
    
    // Simulate scanning delay
    setTimeout(() => {
      const randomObject = sampleObjects[Math.floor(Math.random() * sampleObjects.length)];
      setCurrentObject(randomObject);
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-400 via-green-500 to-green-600 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pt-2">
        <button
          onClick={onBack}
          className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 text-white hover:bg-white/30 transition-all"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="font-semibold">Back</span>
        </button>
        <h2 className="text-2xl font-bold text-white">Object Detective</h2>
        <div className="w-20" /> {/* Spacer */}
      </div>

      {/* Camera View Frame */}
      <div className="relative mx-auto max-w-sm mb-8">
        <div className="relative bg-white/20 backdrop-blur-sm rounded-3xl p-4 border-4 border-white/30">
          <div className="aspect-square bg-gray-800/20 rounded-2xl overflow-hidden relative">
            {/* Camera viewfinder effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
            
            {/* Scanning animation */}
            {isScanning && (
              <motion.div
                initial={{ y: -100 }}
                animate={{ y: 300 }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute w-full h-1 bg-yellow-400 shadow-lg"
              />
            )}
            
            {/* Corner indicators */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-4 border-t-4 border-yellow-400 rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-8 h-8 border-r-4 border-t-4 border-yellow-400 rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-4 border-b-4 border-yellow-400 rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-4 border-b-4 border-yellow-400 rounded-br-lg" />

            {/* Placeholder content */}
            <div className="absolute inset-0 flex items-center justify-center">
              {isScanning ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="text-yellow-400"
                >
                  <Camera className="w-12 h-12" />
                </motion.div>
              ) : (
                <div className="text-center text-white/60">
                  <Camera className="w-16 h-16 mx-auto mb-2 opacity-60" />
                  <p>Point at an object</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Scan button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleScan}
            disabled={isScanning}
            className="w-full mt-4 bg-yellow-400 hover:bg-yellow-500 text-gray-800 py-4 rounded-2xl font-bold text-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isScanning ? 'Scanning...' : 'Scan Object'}
          </motion.button>
        </div>
      </div>

      {/* Object Information */}
      {currentObject && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="card-playful mx-auto max-w-sm"
        >
          {/* Object name and emoji */}
          <div className="text-center mb-6">
            <div className="text-6xl mb-3">{currentObject.emoji}</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">{currentObject.name}</h3>
          </div>

          {/* Fun facts */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-6 h-6 text-yellow-500" />
              <span className="font-semibold text-gray-700">Fun Facts:</span>
            </div>
            
            {currentObject.facts.map((fact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 * index, duration: 0.4 }}
                className="flex items-start gap-3 bg-blue-50 rounded-2xl p-3"
              >
                <Star className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">{fact}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}