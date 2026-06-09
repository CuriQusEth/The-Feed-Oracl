import React, { useState } from 'react';
import { useAccount, useSendTransaction } from 'wagmi';
import { Sun } from 'lucide-react';
import { appendAttribution } from '../lib/erc8021';

export const SayGMButton: React.FC = () => {
  const { isConnected, address } = useAccount();
  const { sendTransaction } = useSendTransaction();
  const [isSending, setIsSending] = useState(false);

  if (!isConnected) return null;

  const sendGMTransaction = () => {
    setIsSending(true);
    
    // Function selector for "gm()" or fallback empty data
    // Usually standard is "0x..." but we append ERC-8021 tracking
    const rawData = '0x' as `0x${string}`;
    const txData = appendAttribution(rawData);

    sendTransaction(
      {
        account: address,
        to: '0xcD0dd3716C5561De47a24949335dF8a8CD8F71a3',
        value: BigInt(0),
        data: txData
      },
      {
        onSettled: () => setIsSending(false),
      }
    );
  };

  return (
    <button 
      onClick={sendGMTransaction}
      disabled={isSending}
      className="px-3 py-2 rounded-lg bg-[#E8A020]/20 hover:bg-[#E8A020]/30 border border-[#E8A020]/40 text-[#E8A020] transition-colors flex items-center gap-2 font-['Cinzel'] text-xs font-bold"
    >
      <Sun size={14} className={isSending ? 'animate-spin' : ''} />
      {isSending ? 'SENDING...' : 'SAY GM'}
    </button>
  );
};
