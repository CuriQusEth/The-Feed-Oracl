import { useState } from 'react';
import { OracleBackground } from './components/OracleBackground';
import { TitleScreen } from './screens/TitleScreen';
import { GameScreen } from './screens/GameScreen';
import { GameOverScreen } from './screens/GameOverScreen';

type AppState = 'TITLE' | 'GAME' | 'GAMEOVER';

export default function App() {
  const [currentState, setCurrentState] = useState<AppState>('TITLE');
  const [finalScore, setFinalScore] = useState(0);
  const [finalStreak, setFinalStreak] = useState(0);

  const handleStart = () => {
    setCurrentState('GAME');
  };

  const handleGameOver = (score: number, streak: number) => {
    setFinalScore(score);
    setFinalStreak(streak);
    setCurrentState('GAMEOVER');
  };

  const handleRestart = () => {
    setCurrentState('TITLE');
  };

  return (
    <div className="flex flex-col h-[100dvh] w-full bg-[#05020a] text-white font-sans overflow-hidden selection:bg-purple-500/30 relative">
      <OracleBackground />
      
      {/* Decorative Runes Background (extracted from Bento grid) */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none flex flex-wrap gap-20 p-20 z-0">
        <div className="text-8xl font-serif">ᚠ</div><div className="text-8xl font-serif">ᚦ</div><div className="text-8xl font-serif">ᚱ</div><div className="text-8xl font-serif">ᚲ</div>
        <div className="text-8xl font-serif">ᚷ</div><div className="text-8xl font-serif">ᚹ</div><div className="text-8xl font-serif">ᚻ</div><div className="text-8xl font-serif">ᚾ</div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {currentState === 'TITLE' && <TitleScreen onStart={handleStart} />}
        {currentState === 'GAME' && <GameScreen onGameOver={handleGameOver} />}
        {currentState === 'GAMEOVER' && (
          <GameOverScreen 
            score={finalScore} 
            streak={finalStreak} 
            onRestart={handleRestart} 
          />
        )}
      </div>
    </div>
  );
}

