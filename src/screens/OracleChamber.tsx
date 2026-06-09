import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FeedItem, generateFeedItem, PredictionOption } from '../game/FeedEngine';
import { SayGMButton } from '../components/SayGMButton';

interface Props {
  onGameOver: (score: number, streak: number) => void;
}

export const OracleChamber: React.FC<Props> = ({ onGameOver }) => {
  const [currentItem, setCurrentItem] = useState<FeedItem>(generateFeedItem());
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onGameOver(score, streak);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onGameOver, score, streak]);

  const handlePrediction = (prediction: PredictionOption) => {
    if (prediction === currentItem.correctOutcome) {
      // Correct
      const newStreak = streak + 1;
      setStreak(newStreak);
      setScore(score + 100 * newStreak);
      // Add a little time for correct answers
      setTimeLeft((prev) => Math.min(prev + 2, 30));
    } else {
      // Wrong
      setStreak(0);
      setScore(Math.max(0, score - 50));
      // Penalty time
      setTimeLeft((prev) => prev - 3);
    }
    setCurrentItem(generateFeedItem());
  };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#050010] text-purple-100 p-4 relative overflow-hidden">
      {/* HUD */}
      <header className="flex justify-between items-center z-10 p-2">
        <div className="flex flex-col font-mono text-sm leading-tight text-purple-300">
          <div>SCORE: <span className="text-cyan-400 font-bold">{score}</span></div>
          <div>STREAK: <span className="text-gold-500">x{streak}</span></div>
        </div>
        <div className="text-2xl font-bold font-mono text-red-400 font-['Cinzel']">
          {timeLeft}s
        </div>
        <div>
          <SayGMButton />
        </div>
      </header>

      {/* Main Feed Stage */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 mt-8 mb-32">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentItem.id}
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -50, opacity: 0, scale: 1.1 }}
            className="w-full max-w-sm rounded-xl border border-purple-500/30 bg-[#12002b]/80 backdrop-blur p-6 shadow-[0_0_20px_rgba(168,85,247,0.15)] flex flex-col gap-4 relative"
          >
            <div className="absolute top-0 right-0 px-3 py-1 bg-purple-500/20 rounded-bl-xl text-xs font-mono uppercase tracking-widest text-cyan-300">
              {currentItem.type}
            </div>
            <div className="text-purple-400 font-mono text-xs">{currentItem.author}</div>
            <div className="text-lg font-medium leading-relaxed">{currentItem.content}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls Container fixed to bottom on mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#050010] to-transparent z-20 pb-8">
        <div className="max-w-md mx-auto grid grid-cols-2 gap-3">
          <ControlBtn onClick={() => handlePrediction('viral')} color="bg-green-500" label="WILL GO VIRAL" />
          <ControlBtn onClick={() => handlePrediction('burn')} color="bg-red-500" label="REPLY BURNS" />
          <ControlBtn onClick={() => handlePrediction('100x')} color="bg-cyan-500" label="MEME 100x" />
          <ControlBtn onClick={() => handlePrediction('die')} color="bg-purple-500" label="TREND DIES" />
        </div>
      </div>
    </div>
  );
};

const ControlBtn: React.FC<{ onClick: () => void, color: string, label: string }> = ({ onClick, color, label }) => (
  <button 
    onClick={onClick}
    className={`p-4 rounded-xl ${color}/10 hover:${color}/30 border border-white/10 active:scale-95 transition-all text-xs font-['Cinzel'] tracking-wider font-bold shadow-lg`}
  >
    {label}
  </button>
);
