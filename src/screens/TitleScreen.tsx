import { useAccount, useConnect, useDisconnect, useSendTransaction } from 'wagmi';
import { CyberButton } from '../components/CyberButton';
import { Eye, Zap, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { getAttributionPayload, encodeAttributionData } from '../lib/erc8021';
import { useState } from 'react';

export function TitleScreen({ onStart }: { onStart: () => void }) {
  const { isConnected, address } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { sendTransactionAsync } = useSendTransaction();
  const [gmStatus, setGmStatus] = useState<string | null>(null);

  const handleSayGM = async () => {
    try {
      setGmStatus("Saying GM...");
      const attributionData = getAttributionPayload("SAY_GM");
      const calldata = encodeAttributionData(attributionData);
      
      const tx = await sendTransactionAsync({
        to: "0x0000000000000000000000000000000000000000",
        data: calldata,
        value: 0n,
      });

      setGmStatus(`GM! Tx: ${tx.slice(0,8)}...`);
    } catch (err) {
      console.error(err);
      setGmStatus("Failed to send GM.");
    }
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mb-12"
      >
        <div className="flex justify-center mb-6">
          <Eye className="w-24 h-24 text-purple-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]" />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold font-sans tracking-tighter uppercase glitch-text mb-4">
          The Feed Oracle
        </h1>
        <p className="text-cyan-400 font-mono text-lg max-w-md mx-auto drop-shadow-md">
          See the future. Predict the timeline. Survive the chaos.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="flex flex-col gap-6 items-center w-full max-w-sm"
      >
        {isConnected ? (
          <div className="cyber-panel p-4 w-full flex flex-col items-center gap-3">
            <div className="flex flex-col items-center">
              <p className="text-[10px] text-cyan-400 font-mono uppercase">Connected Oracle</p>
              <p className="text-purple-300 font-mono text-xs break-all">
                {address}
              </p>
            </div>
            
            <div className="flex gap-2 w-full mt-2">
              <CyberButton variant="secondary" onClick={handleSayGM} className="flex-1 py-2 text-xs flex items-center justify-center gap-1">
                <MessageSquare className="w-4 h-4" /> Say GM
              </CyberButton>
              <CyberButton variant="ghost" onClick={() => disconnect()} className="px-3 py-2 text-xs border border-slate-700">
                Disconnect
              </CyberButton>
            </div>
            {gmStatus && <p className="text-[10px] font-mono text-cyan-300">{gmStatus}</p>}
          </div>
        ) : (
          <div className="flex flex-col gap-2 w-full">
            <p className="text-[10px] text-cyan-400 font-mono mb-2 uppercase text-center">Connect to log Prophecies on Base</p>
            {connectors.map((connector) => (
              <CyberButton
                key={connector.uid}
                variant="secondary"
                onClick={() => connect({ connector })}
                className="w-full"
              >
                Connect {connector.name}
              </CyberButton>
            ))}
          </div>
        )}

        <CyberButton 
          variant="primary" 
          onClick={onStart} 
          className="w-full py-4 text-xl mt-4 flex items-center justify-center gap-2 font-black"
        >
          <Zap className="w-6 h-6" />
          Enter The Chamber
        </CyberButton>

      </motion.div>
    </div>
  );
}
