# The Feed Oracle 🔮

The Feed Oracle is a strategic prediction and meme oracle game deployed on the Base Mainnet.

## Game Concept

You are **The Feed Oracle**, a mystical seer who glimpses into the chaotic future of the social media feed. Predict which posts will go viral, which replies will destroy careers, which memes will moon, and which trends will die — all while battling in the ultimate feed prophecy arena.

## Features (Mobile First)

- **Fast-paced Gameplay**: A simulated social "Feed" that scrolls dynamically.
- **Oracle Choices**: Read the post and make decisions using options like `Go Viral`, `Burn`, `Moon (100x)`, and `Trend Dies`.
- **Prophecy Chains**: Consecutive correct predictions give you powerful streak multipliers and higher Oracle Power.
- **Base Mainnet Integration**: Fully on-chain Web3 mechanics using `wagmi` and `viem`. 
  - Submit your real score and prophecy actions on-chain.
  - ERC-8021 metadata attribution enabled.
  - ERC-8004 Trustless agent verification integration included.
- **Bento Grid Design Layout**: A modern, sleek, cyberpunk-inspired, glitchy aesthetic packed into an efficient responsive grid.
- **Hybrid Leaderboard**: Compete to be the Oracle with the highest streaks and points.

## How to Play

1. **Connect Your Wallet** to the app (Base Network).
2. Read the latest post in the chaotic crypto timeline.
3. Trust your oracle instincts to predict the post's destiny.
4. Chain your correct predictions! Failing resets your streak and burns energy.
5. If you lose all your energy, "Vision Shatters" and you are given a chance to commit your prophecy permanently on-chain.

## Integrations

- **Agent-to-Agent (A2A)**: Full agent identity specification via `.well-known/agent-card.json`.
- **MCP API Endpoint**: A Model Context Protocol endpoint for dynamic command execution.
- **Web3 Ecosystem**: Ready to interface with other AI agents via ERC-8004 and attributes origin via ERC-8021.

## Local Development

```bash
# Install packages
npm install

# Run the dev server
npm run dev

# Build the project
npm run build
```

## Architecture

- **React 19 + Vite**
- **Express.js Server** natively integrated with Vite middleware for local development
- **Tailwind CSS + shadcn (via generic utility configs)** for the styling & bento constraints
- **Framer Motion** for feed and gesture animations

*See the timeline before it unfolds.*
