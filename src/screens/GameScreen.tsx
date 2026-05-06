import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { generatePost } from '../game/feedGenerator';
import { FeedPost, PredictionType } from '../game/types';
import { CyberButton } from '../components/CyberButton';
import { Flame, Rocket, Skull, TrendingUp, Heart, Repeat2 } from 'lucide-react';
import { cn } from '../lib/utils';

export function GameScreen({ onGameOver }: { onGameOver: (score: number, streak: number) => void }) {
  const [currentPost, setCurrentPost] = useState<FeedPost>(generatePost(1));
  const [postsCount, setPostsCount] = useState(1);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [energy, setEnergy] = useState(3);
  const [feedHistory, setFeedHistory] = useState<FeedPost[]>([]);

  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const handlePrediction = (guess: PredictionType) => {
    if (energy <= 0) return;

    if (guess === currentPost.destiny) {
      // Correct
      setScore(s => s + 100 + (streak * 10)); // Combo Multiplier
      setStreak(s => s + 1);
      setFeedback('correct');
      // maybe give health on high streaks
      if (streak > 0 && streak % 5 === 0 && energy < 5) setEnergy(e => e + 1);
    } else {
      // Wrong
      setEnergy(e => e - 1);
      setStreak(0);
      setFeedback('wrong');
    }

    setFeedHistory(prev => [currentPost, ...prev].slice(0, 5)); // keep last 5 for visual

    if (energy <= 1 && guess !== currentPost.destiny) {
       setTimeout(() => onGameOver(score, streak), 1000);
       return;
    }

    setTimeout(() => {
      setFeedback(null);
      setPostsCount(p => p + 1);
      setCurrentPost(generatePost(postsCount + 1));
    }, 800);
  };

  return (
    <div className="flex-1 flex flex-col w-full max-w-7xl mx-auto p-4 lg:p-6 gap-4 relative">
      {/* Top HUD (extracted from design) */}
      <header className="flex flex-col lg:flex-row justify-between lg:items-end border-b border-purple-900/50 pb-4 shrink-0 gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-yellow-400 uppercase">
            The Feed Oracle
          </h1>
          <p className="text-[9px] lg:text-[10px] font-mono text-cyan-500 uppercase tracking-widest opacity-70">
            ID: 68f5415bb6320e0dd0819c29 | Base Mainnet
          </p>
        </div>
        <div className="flex gap-4 lg:gap-6 lg:text-right">
          <div>
            <p className="text-[9px] lg:text-[10px] text-gray-400 uppercase">Oracle Power</p>
            <p className="text-lg lg:text-xl font-bold text-yellow-500">{score} P</p>
          </div>
          <div>
            <p className="text-[9px] lg:text-[10px] text-gray-400 uppercase">Streak Force</p>
            <p className={cn("text-lg lg:text-xl font-bold underline decoration-cyan-500 underline-offset-4", streak > 2 ? "text-orange-400 animate-pulse" : "text-purple-400")}>
              RANK {streak} 🔥
            </p>
          </div>
        </div>
      </header>

      {/* Main Bento Content */}
      <main className="flex-1 flex flex-col lg:grid lg:grid-cols-12 lg:grid-rows-6 gap-4 min-h-0">
        
        {/* LEFT COLUMN: Stats & Tools */}
        <div className="hidden lg:flex lg:col-span-3 lg:row-span-4 bg-purple-950/20 border border-purple-500/30 rounded-2xl p-5 flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-purple-300 uppercase mb-4 tracking-widest">Prophecy Stats</h3>
            <div className="space-y-4">
              <div className="bg-black/40 p-3 rounded-lg border-l-2 border-cyan-500">
                <p className="text-[10px] text-gray-500 uppercase">Energy</p>
                <div className="flex gap-1 mt-1">
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "w-5 h-5 rounded-sm border flex-1",
                        i < energy ? "bg-cyan-400 border-cyan-300 shadow-[0_0_5px_#22d3ee]" : "bg-transparent border-slate-700"
                      )} 
                    />
                  ))}
                </div>
              </div>
              <div className="bg-black/40 p-3 rounded-lg border-l-2 border-purple-500">
                <p className="text-[10px] text-gray-500 uppercase">Current Streak</p>
                <p className="text-2xl font-mono text-purple-400">{streak} 🔥</p>
              </div>
              <div className="bg-black/40 p-3 rounded-lg border-l-2 border-yellow-500">
                <p className="text-[10px] text-gray-500 uppercase">Oracle Score</p>
                <p className="text-2xl font-mono text-yellow-500">{score}</p>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-purple-500/20">
            <button className="w-full bg-cyan-600/20 hover:bg-cyan-600/40 border border-cyan-500/50 text-cyan-300 py-3 rounded-xl font-bold text-sm tracking-widest uppercase transition-colors">
              Divine Insight
            </button>
          </div>
        </div>

        {/* MOBILE HUD (Visible only on small screens) */}
        <div className="flex lg:hidden justify-between items-center bg-purple-950/20 border border-purple-500/30 rounded-xl p-3 shrink-0">
          <div className="flex flex-col">
            <span className="text-[10px] text-cyan-400 font-mono uppercase">Energy</span>
            <div className="flex gap-1 mt-1">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "w-3 h-4 rounded-sm border",
                    i < energy ? "bg-cyan-400 border-cyan-300 shadow-[0_0_5px_#22d3ee]" : "bg-transparent border-slate-700"
                  )} 
                />
              ))}
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: The Feed */}
        <div className="lg:col-span-6 lg:row-span-6 bg-black/40 border border-white/10 rounded-3xl overflow-hidden flex flex-col h-[40vh] lg:h-auto shrink-0 lg:shrink">
          <div className="bg-white/5 px-6 py-3 flex justify-between items-center border-b border-white/5 shrink-0">
            <span className="text-[10px] font-mono text-green-400 uppercase tracking-widest">LIVE_FEED_STREAMING...</span>
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 opacity-50"></div>
            </div>
          </div>
          
          <div className="flex-1 relative overflow-hidden flex flex-col justify-center items-center p-4">
            {/* Background History (faded) */}
            <div className="absolute top-0 w-full opacity-30 flex flex-col gap-2 pointer-events-none translate-y-[-20%] px-4">
              {feedHistory.map(post => (
                 <div key={post.id} className="bg-purple-900/10 border border-white/5 p-3 rounded-2xl flex flex-col transform scale-90 blur-[1px]">
                   <div className="text-xs text-slate-500">{post.handle}</div>
                   <div className="text-sm truncate hidden lg:block">{post.content}</div>
                 </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentPost.id}
                initial={{ opacity: 0, y: 100, scale: 0.9 }}
                animate={{ 
                  opacity: feedback ? 0.3 : 1, 
                  y: feedback ? -50 : 0, 
                  scale: feedback ? 0.95 : 1,
                  borderColor: feedback === 'correct' ? '#22c55e' : feedback === 'wrong' ? '#ef4444' : 'rgba(255, 255, 255, 0.1)'
                }}
                exit={{ opacity: 0, y: -200, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="w-full bg-purple-900/10 border border-white/5 p-5 rounded-3xl relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center font-bold text-white shadow-inner">
                      {currentPost.author.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold font-sans text-slate-100">{currentPost.author}</span>
                      <span className="text-[10px] text-gray-400 font-mono tracking-wide">{currentPost.handle} • {currentPost.timeAgo}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm lg:text-lg mb-4 text-gray-300 font-sans leading-relaxed">
                  {currentPost.content}
                </p>

                <div className="flex items-center gap-4 text-xs text-gray-500 font-mono mt-4 pt-4 border-t border-white/5">
                  <span className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5"/> {currentPost.likes}</span>
                  <span className="flex items-center gap-1.5"><Repeat2 className="w-3.5 h-3.5"/> {currentPost.reposts}</span>
                </div>

                {feedback && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={cn(
                      "absolute inset-0 flex items-center justify-center font-bold text-2xl lg:text-4xl uppercase tracking-widest backdrop-blur-md rounded-3xl",
                      feedback === 'correct' ? "text-green-400 bg-green-900/60" : "text-red-500 bg-red-900/60"
                    )}
                  >
                    {feedback}
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT COLUMN TOP: Action Buttons Container (Extracted styling) */}
        <div className="lg:col-span-3 lg:row-span-6 flex flex-col gap-4">
          <div className="bg-gradient-to-br from-yellow-900/20 to-orange-950/20 border border-yellow-500/30 rounded-2xl p-4 shrink-0">
            <h3 className="text-xs font-bold text-yellow-300 uppercase mb-3 tracking-widest">Active Charms</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-black/60 rounded flex flex-col items-center justify-center py-3 border border-white/5">
                <span className="text-xl mb-1">🛡️</span>
                <span className="text-[9px] text-gray-400 uppercase tracking-wider">FUD Shield</span>
              </div>
              <div className="bg-black/60 rounded flex flex-col items-center justify-center py-3 border border-white/5">
                <span className="text-xl mb-1">🌊</span>
                <span className="text-[9px] text-gray-400 uppercase tracking-wider">Hype Wave</span>
              </div>
            </div>
          </div>

          <div className="bg-black/30 border border-white/5 rounded-2xl p-4 flex-1 flex flex-col justify-end">
            <h3 className="text-xs font-bold text-cyan-300 uppercase mb-3 tracking-widest hidden lg:block">Prophecy Input</h3>
            <div className="grid grid-cols-2 gap-2 lg:gap-3 lg:flex lg:flex-col justify-end">
              <button 
                onClick={() => handlePrediction('viral')}
                disabled={feedback !== null}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:opacity-80 py-3 lg:py-4 rounded-xl text-[10px] lg:text-xs font-bold uppercase tracking-widest transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <TrendingUp className="w-4 h-4"/> Viral
              </button>
              <button 
                onClick={() => handlePrediction('burn')}
                disabled={feedback !== null}
                className="w-full bg-gradient-to-r from-red-900 to-red-600 hover:opacity-80 py-3 lg:py-4 rounded-xl text-[10px] lg:text-xs font-bold uppercase tracking-widest transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Flame className="w-4 h-4"/> Burn
              </button>
              <button 
                onClick={() => handlePrediction('moon')}
                disabled={feedback !== null}
                className="w-full bg-gradient-to-r from-yellow-600 to-orange-500 hover:opacity-80 py-3 lg:py-4 rounded-xl text-[10px] lg:text-xs font-bold uppercase tracking-widest transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Rocket className="w-4 h-4"/> Moon
              </button>
              <button 
                onClick={() => handlePrediction('die')}
                disabled={feedback !== null}
                className="w-full bg-white/5 border border-white/10 hover:bg-white/10 py-3 lg:py-4 rounded-xl text-[10px] lg:text-xs font-bold uppercase tracking-widest transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Skull className="w-4 h-4"/> Die
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM LEFT ROW: Actions (Desktop only as bento filler) */}
        <div className="hidden lg:flex lg:col-span-3 lg:row-span-2 bg-gradient-to-r from-blue-600 to-cyan-600 border border-cyan-400/50 rounded-2xl flex-col items-center justify-center cursor-pointer hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all">
          <span className="text-2xl font-bold uppercase tracking-[0.2em]">Say GM</span>
          <span className="text-[9px] opacity-80 uppercase tracking-widest mt-1">On-chain Prophecy Trigger</span>
        </div>
      </main>

      {/* Bottom Attribution Footer */}
      <footer className="shrink-0 pt-2 pb-1 flex flex-col md:flex-row justify-between items-center text-[8px] md:text-[9px] text-gray-500 font-mono tracking-tighter gap-1 opacity-70">
        <span>BUILDER: bc_shzxfyvs</span>
        <span>© 2026 THE FEED ORACLE | ERC-8021 FULL ATTRIBUTION ENABLED</span>
        <span>LATENCY: 14MS | SYNC: MAINNET_B_04</span>
      </footer>
    </div>
  );
}
