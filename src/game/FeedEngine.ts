export type PredictionOption = 'viral' | 'burn' | '100x' | 'die';

export interface FeedItem {
  id: string;
  author: string;
  content: string;
  type: 'post' | 'reply' | 'meme' | 'trend';
  correctOutcome: PredictionOption;
}

const AUTHORS = ['@crypto_degen', '@whale_alert', '@vitalik_fan', '@rekt_guy', '@based_builder', '@nft_maxi', '@shitcoin_pro', '@oracle_intern'];
const CONTENTS = [
  "Just found the next 1000x gem. Don't fade it.",
  "Literally who asked for this tokenomics update?",
  "Wait, let him cook.",
  "This new L6 chain is going to fix everything.",
  "Meme coin super cycle is here.",
  "I am never selling.",
  "Is it too late to short?",
  "Deploying more capital - steady lads.",
  "The contract is supposedly renounced... right?",
  "If this breaks resistance we are going to Valhalla.",
  "Dev dumped.",
  "Airdrop hunters ruined the ecosystem."
];

export const generateFeedItem = (): FeedItem => {
  const outcomes: PredictionOption[] = ['viral', 'burn', '100x', 'die'];
  const types: ('post' | 'reply' | 'meme' | 'trend')[] = ['post', 'reply', 'meme', 'trend'];
  
  return {
    id: Math.random().toString(36).substring(7),
    author: AUTHORS[Math.floor(Math.random() * AUTHORS.length)],
    content: CONTENTS[Math.floor(Math.random() * CONTENTS.length)],
    type: types[Math.floor(Math.random() * types.length)],
    correctOutcome: outcomes[Math.floor(Math.random() * outcomes.length)]
  };
};
