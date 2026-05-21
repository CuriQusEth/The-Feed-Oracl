# The Feed Oracle 🔮

The Feed Oracle is a strategic prediction and meme oracle game deployed on the Base Mainnet.

## Project Overview

You are **The Feed Oracle**, a mystical seer who glimpses into the chaotic future of the social media feed. Predict which posts will go viral, which replies will destroy careers, which memes will moon, and which trends will die — all while battling in the ultimate feed prophecy arena.

## Tech Stack & Features

- **Frontend Environment**: React 19 + TypeScript + Tailwind CSS (Bento Grid layout)
- **Framework Context**: Supports Next.js App Router API integration (`app/api` directory utilized for Agent endpoints)
- **Web3 Ecosystem**: wagmi and viem integrations on Base Mainnet.
- **Smart Contracts**: 
  - ERC-8021 metadata attribution integration.
  - ERC-8004 Trustless AI Agent verification capabilities.
- **Animation**: Framer Motion for highly polished feed scrolling and interaction visuals.

## Connecting to Model Context Protocol (MCP)

This project acts as an MCP server allowing intelligent agents to query live feed data, evaluate prophecies, and optimize gameplay capabilities via the MCP `tools` structure.

**MCP Server URL:** `https://the-feed-oracl.vercel.app/api/mcp`

The MCP is exposed strictly via the Next.js App Router POST and GET mechanisms with full CORS header support, ensuring clean interfacing for external clients. 

**Registered Tools:**
- `get_race_status`: Get current oracle status updates
- `start_race`: Launch new prediction cycles
- `get_leaderboard`: Poll the hybrid highest-steaks leaderboard
- `optimize_speed`: AI automation optimization for internal execution
- `get_track_info`: Query timeline/feed ecosystem intelligence

## AI Agent Details & Registration

The environment features **The Feed Oracle Orchestrator**, an ERC-8004 compliant intelligent agent built directly into the repository. 

- **Capabilities**: Feed analysis, oracle mechanics, real-time data aggregation, intelligent content distribution, sentiment analysis, and active MCP command execution.
- **Agent Card Standard**: Full manifest mapped to identity schemas. Read the public JSON configuration directly at `https://the-feed-oracl.vercel.app/.well-known/agent-card.json` 
- **Control API**: External clients can interact via the primary control API hosted at `https://the-feed-oracl.vercel.app/api/agent`

## Local Development

1. Clone the repository locally.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Build the project:
   ```bash
   npm run build
   ```

*See the timeline before it unfolds.*
