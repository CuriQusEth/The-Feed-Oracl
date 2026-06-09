import React, { useState } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from './lib/web3';
import { TitleScreen } from './screens/TitleScreen';
import { OracleChamber } from './screens/OracleChamber';
import { GameOverScreen } from './screens/GameOverScreen';

const queryClient = new QueryClient();

type GameState = 'TITLE' | 'PLAYING' | 'GAMEOVER';

function MainApp() {
  const [gameState, setGameState] = useState<GameState>('TITLE');
  const [finalScore, setFinalScore] = useState(0);
  const [finalStreak, setFinalStreak] = useState(0);

  const handleGameOver = (score: number, streak: number) => {
    setFinalScore(score);
    setFinalStreak(streak);
    setGameState('GAMEOVER');
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500/30">
      {gameState === 'TITLE' && <TitleScreen onStart={() => setGameState('PLAYING')} />}
      {gameState === 'PLAYING' && <OracleChamber onGameOver={handleGameOver} />}
      {gameState === 'GAMEOVER' && (
        <GameOverScreen 
          score={finalScore} 
          streak={finalStreak} 
          onRestart={() => setGameState('TITLE')} 
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <MainApp />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
