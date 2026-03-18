# Deploy thirdweb: NFT Minting Page on Railway

Mint NFTs & Cryptocurrencies with thirdweb in a single-page app.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/xyxkOh)

## About

<a href="https://thirdweb.com" rel="noopener noreferrer">
  <img style="border-radius: 10px" height="auto" width="100%" alt="thirdweb banner" src="https://raw.githubusercontent.com/thirdweb-dev/.github/main/header-image.png">
</a>

## Template

This is the **official community Railway template** for self-hosting your own NFT &amp; Cryptocurrency Minting page, maintained by the thirdweb community team. This template deploys a customized version of the [NFT Minting Page](https://github.com/thirdweb-example/nft-minting-template) from the [thirdweb Examples](https://github.om/thirdweb-example) repository. It provides a single-page application for minting NFTs and Cryptocurrencies, powered by thirdweb.

### Requirements

- thirdweb API Client ID. [[Get it here](https://thirdweb.com/dashboard/settings/api-keys)]
- Chain ID of the blockchain where your contract is deployed. [[Find it here](https://thirdweb.com/chains)]

## Overview

NFT Minting Page is a single-page application built with Next.js that allows users to mint NFTs and Cryptocurrencies by connecting their wallet or social media accounts. Utilizing the thirdweb SDK, it supports interaction with any EVM-compatible blockchain and supports ERC-721, ERC-1155, and ERC-20 token standards. The application is fully customizable and can be seamlessly integrated into any website.

## Live Demo

![Demo](https://raw.githubusercontent.com/warengonzaga/thirdweb-nft-minting-page-railway/main/assets/demo.png)

Check out the live demo here: https://nft-minting-page.up.railway.app

## Features

- Mint NFTs and Cryptocurrencies
- Connect wallet or social media accounts
- Supports ERC-721, ERC-1155, and ERC-20 token standards
- Customizable upon deployment via environment variables
- Powered by thirdweb SDK

## Installation

Learn the [installation of the template here](https://support.thirdweb.com/general-thirdweb-issues/vGcHXQ7tHXuSJf7jaL2y5Q/how-to-deploy-nft-drop-template-to-railway/4h2eJs1HENrv1tzWRXS89Z).

## Support

If you need help, please submit a ticket to our [support site](https://thirdweb.com/support).

## Contributing

We welcome contributions from the community! If you have any suggestions or improvements, please submit a [pull request](https://github.com/warengonzaga/thirdweb-nft-minting-page-railway/pulls) or open an [issue](https://github.com/warengonzaga/thirdweb-nft-minting-page-railway/issues).

## Community

Join the vibrant thirdweb community to stay updated and connect with fellow Web3 developers!

- **[Discord](https://discord.gg/thirdweb)**: Engage in real-time discussions, get support, and share your projects.
- **[DailyDev Squad](https://app.daily.dev/squads/thirdweb)**: Stay updated with the latest web3 development news and updates.
- **[Reddit](https://www.reddit.com/r/thirdweb)**: Join our subreddit to participate in discussions, ask questions, and share insights.

We look forward to seeing you there!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| NFT Minting Page | [warengonzaga/thirdweb-nft-minting-page-railway](https://github.com/warengonzaga/thirdweb-nft-minting-page-railway) (root: /services/nft-minting-page/) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `NEXT_PUBLIC_MINT_ICON` | https://raw.githubusercontent.com/warengonzaga/thirdweb-nft-minting-page-railway/main/assets/icon.png | The page or tab icon of the minting page. You can use a image URL to set the page or tab icon. |
| `NEXT_PUBLIC_MINT_TITLE` | NFT Minting Page | The title of the minting page. |
| `NEXT_PUBLIC_MINT_DESCRIPTION` | Mint NFTs and Cryptocurrency powered by thirdweb. | The description of the minting page. |
| `NEXT_PUBLIC_THIRDWEB_CHAIN_ID` | - | The chain ID where your NFT contract is deployed. |
| `NEXT_PUBLIC_THIRDWEB_TOKEN_ID` | (secret) | Only needed if using an ERC-1155 contract. Defaults to token ID 0. |
| `NEXT_PUBLIC_THIRDWEB_CLIENT_ID` | - | Your thirdweb client ID from the [API Keys page](https://thirdweb.com/dashboard/settings/api-keys). |
| `NEXT_PUBLIC_THIRDWEB_CONTRACT_ADDRESS` | - | The address of the NFT contract you want to mint to. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, CSS, JavaScript

[View on Railway →](https://railway.com/template/xyxkOh)
