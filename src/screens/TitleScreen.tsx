import React from 'react';
import { motion } from 'motion/react';
import { ConnectWallet } from '../components/ConnectWallet';

interface Props {
  onStart: () => void;
}

export const TitleScreen: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden bg-black p-6">
      {/* Background mystical effects */}
      <div className="absolute inset-0 bg-[#0f001f] opacity-80" />
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute w-[150vw] h-[150vw] sm:w-[80vw] sm:h-[80vw] border border-purple-500/10 rounded-full flex items-center justify-center"
      >
        <div className="w-[80%] h-[80%] border border-cyan-500/10 rounded-full" />
      </motion.div>
      
      <div className="relative z-10 text-center flex flex-col items-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="font-['Cinzel'] text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-purple-400 to-cyan-400 tracking-wider filter drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            THE FEED<br />ORACLE
          </h1>
          <p className="text-purple-300/60 mt-4 text-sm tracking-[0.2em] uppercase font-mono">
            Glimpse into the chaotic future
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-6"
        >
          <ConnectWallet />
          
          <button 
            onClick={onStart}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600/20 to-cyan-600/20 hover:from-purple-600/40 hover:to-cyan-600/40 border border-purple-500/50 text-white font-['Cinzel'] text-xl tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
          >
            Enter Chamber
          </button>
        </motion.div>
      </div>
    </div>
  );
};
