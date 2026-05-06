import { useAccount, useSendTransaction } from 'wagmi';
import { CyberButton } from '../components/CyberButton';
import { BookOpen, Trophy } from 'lucide-react';
import { motion } from 'motion/react';
import { getAttributionPayload, encodeAttributionData } from '../lib/erc8021';
import { requestAgentVerification } from '../lib/erc8004';
import { useState } from 'react';

export function GameOverScreen({ score, streak, onRestart }: { score: number, streak: number, onRestart: () => void }) {
  const { isConnected } = useAccount();
  const { sendTransactionAsync } = useSendTransaction();
  const [isMinting, setIsMinting] = useState(false);
  const [mintStatus, setMintStatus] = useState<string | null>(null);

  const handleRecordProphecy = async () => {
    if (!isConnected) {
      alert("Connect your wallet to log on-chain.");
      return;
    }
    
    setIsMinting(true);
    setMintStatus("Consulting ERC-8004 Agent...");

    try {
      // 1. ERC-8004 Trustless agent verification (simulated)
      const agentSig = await requestAgentVerification(`Score:${score},Streak:${streak}`);
      console.log("Agent verified:", agentSig);
      
      setMintStatus("Awaiting Wallet Signature...");
      
      // 2. Prepare ERC-8021 Payload
      const attributionData = getAttributionPayload("RECORD_PROPHECY");
      const calldata = encodeAttributionData(attributionData);

      // 3. Send Transaction (using a self-send with data, standard for attributions/logs if no contract specified)
      // In a real app, this would be a contract function call `commitProphecy(score, streak, agentSig, data)`
      const tx = await sendTransactionAsync({
        to: "0x0000000000000000000000000000000000000000", // Null burn/log address for example
        data: calldata,
        value: 0n,
      });

      setMintStatus(`Prophecy recorded! Tx: ${tx.slice(0, 10)}...`);
    } catch (err) {
      console.error(err);
      setMintStatus("Vision clouded. Transaction failed.");
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="cyber-panel p-8 max-w-sm w-full flex flex-col items-center"
      >
        <Trophy className="w-20 h-20 text-yellow-500 mb-6 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]" />
        
        <h2 className="text-3xl font-bold font-sans uppercase glitch-text mb-2 text-red-500">
          Vision Shattered
        </h2>
        
        <p className="font-mono text-slate-400 mb-8">The feed has consumed you.</p>

        <div className="w-full flex justify-between px-4 py-3 bg-slate-950 rounded border border-slate-800 mb-2">
          <span className="font-mono text-slate-500">Final Power</span>
          <span className="font-bold text-purple-400">{score}</span>
        </div>
        <div className="w-full flex justify-between px-4 py-3 bg-slate-950 rounded border border-slate-800 mb-8">
          <span className="font-mono text-slate-500">Highest Streak</span>
          <span className="font-bold text-orange-400">x{streak}</span>
        </div>

        <div className="w-full flex flex-col gap-3">
          <CyberButton 
            variant="secondary" 
            onClick={handleRecordProphecy} 
            disabled={isMinting || mintStatus?.includes("recorded")}
            className="w-full py-3 text-sm"
          >
            <BookOpen className="w-4 h-4 inline-block mr-2" />
            {isMinting ? "Recording..." : "Record Prophecy On-Chain"}
          </CyberButton>
          
          {mintStatus && (
            <p className="text-xs font-mono text-cyan-300 mt-1">{mintStatus}</p>
          )}

          <CyberButton variant="primary" onClick={onRestart} className="w-full py-3 mt-4">
            Consult the Feed Again
          </CyberButton>
        </div>
      </motion.div>
    </div>
  );
}
