import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, ArrowLeft, Volume2, Heart } from 'lucide-react';

interface VoiceInteractionScreenProps {
  onBack: () => void;
}

interface SpeechBubble {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: number;
}

const responses = [
  "That's awesome! Tell me more! 🌟",
  "Wow, you're so smart! 🧠",
  "I love learning with you! ❤️",
  "That sounds super cool! 🚀",
  "You're doing great! Keep going! 👏",
  "What else would you like to know? 🤔",
  "That's a great question! 💭",
  "I'm so proud of you! 🌈"
];

export function VoiceInteractionScreen({ onBack }: VoiceInteractionScreenProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [speechBubbles, setSpeechBubbles] = useState<SpeechBubble[]>([
    {
      id: 1,
      text: "Hi there! I'm your Learning Buddy! Tell me what you'd like to learn about today! 😊",
      isUser: false,
      timestamp: Date.now()
    }
  ]);

  const handleMicToggle = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      
      // Simulate adding user speech
      const userTexts = [
        "I want to learn about animals!",
        "Can you tell me about the ocean?",
        "I like dinosaurs!",
        "How do airplanes fly?",
        "What makes the rainbow?"
      ];
      
      const randomUserText = userTexts[Math.floor(Math.random() * userTexts.length)];
      const newUserBubble: SpeechBubble = {
        id: Date.now(),
        text: randomUserText,
        isUser: true,
        timestamp: Date.now()
      };
      
      setSpeechBubbles(prev => [...prev, newUserBubble]);
      
      // Add buddy response after a delay
      setTimeout(() => {
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const newBuddyBubble: SpeechBubble = {
          id: Date.now() + 1,
          text: randomResponse,
          isUser: false,
          timestamp: Date.now()
        };
        
        setSpeechBubbles(prev => [...prev, newBuddyBubble]);
      }, 1500);
    } else {
      // Start recording
      setIsRecording(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 via-purple-500 to-purple-600 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pt-2">
        <button
          onClick={onBack}
          className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 text-white hover:bg-white/30 transition-all"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="font-semibold">Back</span>
        </button>
        <h2 className="text-2xl font-bold text-white">Voice Chat</h2>
        <div className="w-20" /> {/* Spacer */}
      </div>

      {/* Chat Area */}
      <div className="flex-1 max-w-md mx-auto mb-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-4 max-h-[65vh] overflow-y-auto space-y-4">
          <AnimatePresence>
            {speechBubbles.map((bubble) => (
              <motion.div
                key={bubble.id}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", duration: 0.5 }}
                className={`flex ${bubble.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl shadow-lg ${
                    bubble.isUser
                      ? 'bg-yellow-400 text-gray-800 rounded-br-md'
                      : 'bg-white text-gray-800 rounded-bl-md'
                  }`}
                >
                  <p className="font-medium">{bubble.text}</p>
                  {!bubble.isUser && (
                    <div className="flex items-center gap-1 mt-2 opacity-60">
                      <Heart className="w-4 h-4" />
                      <span className="text-xs">Learning Buddy</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Typing indicator when recording */}
          {isRecording && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-white/20 text-white p-4 rounded-2xl rounded-bl-md">
                <div className="flex items-center gap-2">
                  <div className="flex space-x-1">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
                      className="w-2 h-2 bg-white rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 bg-white rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 bg-white rounded-full"
                    />
                  </div>
                  <span className="text-sm">Listening...</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Voice Input Button */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center space-y-4">
          {/* Recording status */}
          {isRecording && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2"
            >
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              Recording
            </motion.div>
          )}

          {/* Main microphone button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleMicToggle}
            className={`w-20 h-20 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
              isRecording
                ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                : 'bg-yellow-400 hover:bg-yellow-500'
            }`}
          >
            {isRecording ? (
              <MicOff className="w-10 h-10 text-white" />
            ) : (
              <Mic className="w-10 h-10 text-gray-800" />
            )}
          </motion.button>

          {/* Instruction text */}
          <p className="text-white text-center font-medium">
            {isRecording ? 'Tap to stop recording' : 'Tap to start talking'}
          </p>
          
          {/* Sound visualization */}
          {isRecording && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-end space-x-1"
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [4, 16, 4] }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.1
                  }}
                  className="w-1 bg-yellow-300 rounded-full min-h-[4px]"
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}