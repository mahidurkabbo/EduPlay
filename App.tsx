import { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ObjectRecognitionScreen } from './components/ObjectRecognitionScreen';
import { VoiceInteractionScreen } from './components/VoiceInteractionScreen';
import { QuizScreen } from './components/QuizScreen';
import { RewardsScreen } from './components/RewardsScreen';
import { NavigationMenu } from './components/NavigationMenu';

type Screen = 'welcome' | 'object' | 'voice' | 'quiz' | 'rewards';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');

  const handleStartLearning = () => {
    setCurrentScreen('object');
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  const handleBack = () => {
    setCurrentScreen('welcome');
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Main Screen Content */}
      {currentScreen === 'welcome' && (
        <WelcomeScreen onStartLearning={handleStartLearning} />
      )}
      
      {currentScreen === 'object' && (
        <ObjectRecognitionScreen onBack={handleBack} />
      )}
      
      {currentScreen === 'voice' && (
        <VoiceInteractionScreen onBack={handleBack} />
      )}
      
      {currentScreen === 'quiz' && (
        <QuizScreen onBack={handleBack} />
      )}
      
      {currentScreen === 'rewards' && (
        <RewardsScreen onBack={handleBack} />
      )}

      {/* Bottom Navigation */}
      {currentScreen !== 'welcome' && (
        <div className="fixed bottom-4 left-4 right-4 z-50">
          <NavigationMenu 
            currentScreen={currentScreen} 
            onNavigate={handleNavigate}
          />
        </div>
      )}
    </div>
  );
}