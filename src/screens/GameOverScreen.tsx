import React from 'react';
import { motion } from 'motion/react';
import { useAccount, useSignMessage } from 'wagmi';
import { SayGMButton } from '../components/SayGMButton';

interface Props {
  score: number;
  streak: number;
  onRestart: () => void;
}

export const GameOverScreen: React.FC<Props> = ({ score, streak, onRestart }) => {
  const { isConnected, address } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const handleRecordProphecy = async () => {
    try {
      if (!isConnected || !address) return alert("Connect wallet first!");
      const signature = await signMessageAsync({ 
        account: address,
        message: `I record my prophecy with Score: ${score} and Streak: ${streak} on The Feed Oracle.` 
      });
      console.log("Recorded with signature:", signature);
      alert("Prophecy recorded on-chain successfully!");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] relative bg-black p-6">
      <div className="absolute inset-0 bg-red-900/20 mix-blend-color-burn" />
      
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 flex flex-col items-center gap-8 bg-[#1a0510]/80 p-8 rounded-2xl border border-red-500/20 backdrop-blur"
      >
        <h2 className="font-['Cinzel'] text-4xl text-red-500 font-bold drop-shadow-[0_0_10px_rgba(239,68,68,0.8)] filter">
          VISION SHATTERED
        </h2>
        
        <div className="flex flex-col items-center gap-4 font-mono">
          <div className="text-xl text-purple-300">FINAL SCORE: <span className="text-cyan-400 font-bold">{score}</span></div>
          <div className="text-xl text-purple-300">MAX STREAK: <span className="text-gold-500">x{streak}</span></div>
        </div>

        <div className="flex flex-col gap-4 mt-6 w-full">
          <button 
            onClick={onRestart}
            className="w-full py-4 rounded-xl bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/50 text-white font-['Cinzel'] uppercase tracking-widest transition-all"
          >
            Seek Another Vision
          </button>
          
          <button 
            onClick={handleRecordProphecy}
            className="w-full py-4 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/40 border border-cyan-500/50 text-cyan-300 font-['Cinzel'] text-sm uppercase tracking-widest transition-all"
          >
            Record Prophecy On-Chain 
          </button>
          
          <div className="flex justify-center mt-4">
            <SayGMButton />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
