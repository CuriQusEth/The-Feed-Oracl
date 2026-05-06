import { FeedPost, PredictionType } from './types';

const AUTHORS = ["0xMeme", "DegenApe", "VitalikFan", "BasedGod", "CryptoKitty", "OracleIntern", "YieldFarmer420"];
const CONTENTS = [
  "Just ape'd my life savings into $TRASH. LFG! 🚀",
  "This new L2 is just a multisig with a discord server change my mind",
  "If building is a crime, lock me up.",
  "Literally crying. I sent eth to the token contract. Is there a customer support number?",
  "The timeline is healing.",
  "gm to everyone except those fading the Base native ecosystem.",
  "I am from the future. 1 BTC = 1 BTC.",
  "New meta: touching grass. Wait, who am I kidding.",
  "Just launched a new NFT project, it's 10,000 generated pictures of my left shoe.",
];

const DESTINIES: PredictionType[] = ['viral', 'burn', 'moon', 'die'];

export function generatePost(idInt: number): FeedPost {
  const author = AUTHORS[Math.floor(Math.random() * AUTHORS.length)];
  const handle = `@${author.toLowerCase()}`;
  const content = CONTENTS[Math.floor(Math.random() * CONTENTS.length)];
  const destiny = DESTINIES[Math.floor(Math.random() * DESTINIES.length)];
  
  return {
    id: `post-${idInt}-${Date.now()}`,
    author,
    handle,
    content,
    destiny,
    likes: Math.floor(Math.random() * 500),
    reposts: Math.floor(Math.random() * 50),
    timeAgo: `${Math.floor(Math.random() * 59) + 1}m`,
  }
}
