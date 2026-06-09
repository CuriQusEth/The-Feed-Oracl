import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

export const ConnectWallet: React.FC = () => {
  const { isConnected, address } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <button 
        onClick={() => disconnect()}
        className="px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-400 font-['Cinzel'] text-xs font-bold transition-colors"
      >
        {address?.slice(0, 6)}...{address?.slice(-4)} (DISCONNECT)
      </button>
    );
  }

  return (
    <div className="flex gap-2">
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          onClick={() => connect({ connector })}
          className="px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-400 font-['Cinzel'] text-xs font-bold transition-colors shadow-[0_0_10px_rgba(6,182,212,0.3)]"
        >
          CONNECT {connector.name.toUpperCase()}
        </button>
      ))}
    </div>
  );
};
