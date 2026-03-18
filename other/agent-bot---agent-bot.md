# Deploy agent-bot on Railway

Deploy and host agent-bot on railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/agent-bot)

## About

## Deploy and Host agent-bot on Railway

  AgentMM's agent-bot is a TypeScript market-making bot that connects to the AgentMM coordination platform via WebSocket
   and autonomously executes liquidity signals — buys, sells, and Uniswap V3/V4 liquidity positions — on Base using your
   own wallet.

  ## About Hosting agent-bot

  Hosting the agent-bot requires a persistent, always-on process that maintains a live WebSocket connection to the
  AgentMM coordination platform. The bot authenticates using an Ethereum wallet signature, listens for coordination
  signals (ACCUMULATE, ADD_LIQUIDITY, SUPPORT_BUY, EXIT, etc.), and executes the corresponding on-chain transactions
  against Uniswap V3 and V4 on Base in real time. Because signal execution is time-sensitive — signals carry expiration
  deadlines — the bot must remain online continuously with minimal downtime. Railway's persistent worker services and
  automatic restarts make it an ideal runtime for this kind of stateful, long-running agent process.

  ## Common Use Cases

  - Liquidity provision: Automatically add and manage Uniswap V3/V4 positions on Base in response to
  platform-coordinated signals
  - Coordinated market-making: Participate as a node in the AgentMM agent collective, responding to campaign-phase
  signals (SEED, GROW, BOOST, SUPPORT) in real time
  - Automated token support: Execute floor-defense buy pressure and exit strategies without manual intervention

 ## Dependencies for agent-bot Hosting

  - Base RPC endpoint — A Base Mainnet JSON-RPC URL (e.g., from Alchemy or Infura) for broadcasting transactions and
  reading chain state
  - Agent wallet — A dedicated Ethereum private key funded with ETH on Base for gas and trading capital; this wallet
  should be separate from your main wallet

  ### Deployment Dependencies

  - https://agentmm.xyz — The coordination backend the bot connects to (wss://api.agentmm.xyz/ws)
  - https://alchemy.com — Recommended RPC provider for Base Mainnet
  - https://docs.uniswap.org/contracts/v3/overview — V3 SwapRouter and NonfungiblePositionManager
  - https://docs.uniswap.org/contracts/v4/overview — V4 PoolManager, PositionManager, and Permit2

  ### Implementation Details

  Required environment variables:

  AGENT_PRIVATE_KEY=0xYOUR_PRIVATE_KEY   # Dedicated agent wallet private key
  RPC_URL=https://base-mainnet.g.alchemy.com/v2/YOUR_KEY  # Base Mainnet RPC
  PLATFORM_WS_URL=wss://api.agentmm.xyz/ws  # AgentMM coordination endpoint
  AGENT_ID=agent-1                         # Optional: your agent identifier
  SLIPPAGE_BPS=200                         # Optional: slippage tolerance (default 2%)

 ## Why Deploy agent-bot on Railway?
  Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't
   have to deal with configuration, while allowing you to vertically and horizontally scale it.

  By deploying agent-bot on Railway, you are one step closer to supporting a complete full-stack application with
  minimal burden. Host your servers, databases, AI agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nodejs | [Agent0-1/agent-bot](https://github.com/Agent0-1/agent-bot) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | - | Port |
| `RPC_URL` | - | Base Mainnet RPC endpoint — get a key at alchemy.com |
| `PROJECT_WS_URL` | wss://api.agentmm.xyz/ws | WebSocket URL for the AgentMM platform (leave as-is) |
| `AGENT_PRIVATE_KEY` | - | Agent Private Key |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript

[View on Railway →](https://railway.com/deploy/agent-bot)
