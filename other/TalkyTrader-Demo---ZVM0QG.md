# Deploy TalkyTrader Demo on Railway

Connect CEX and DEX exchanges across multi messaging platforms.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ZVM0QG)

## About

<br>
<br>

<img height="200" width="200" align="right" src="https://i.imgur.com/Q7iDDyB.jpg" alt="logo">
<div align="left">

Connect CEX and DEX exchanges across multi messaging platforms.<br>
Place order, inquire your balance and more through plugins.<br>
Easily deploy via Docker on self-hosted platform or Paas.<br>
<br>
<p align="left">
<a href="https://talkytrader.github.io/wiki/"><img src="https://img.shields.io/badge/Wiki-%23000000.svg?style=for-the-badge&amp;logo=wikipedia&amp;logoColor=white"></a>
<a href="https://github.com/mraniki/tt/"><img src="https://img.shields.io/badge/github-%23000000.svg?style=for-the-badge&amp;logo=github&amp;logoColor=white"></a><br>
<a href="https://hub.docker.com/r/mraniki/tt"><img src="https://img.shields.io/docker/pulls/mraniki/tt?style=for-the-badge"></a>
<br><br>
   <img src="https://github.com/mraniki/tt/assets/8766259/14cb1653-f6b4-44e7-b07c-d930060c7363" alt="screenshot" width="194" align="right">
   <br>

</p><h5>Documentation</h5>
<a href="https://talky.readthedocs.io/"><img src="https://img.shields.io/badge/Documentation-000000?style=for-the-badge&amp;logo=readthedocs&amp;logoColor=white"></a><br>

<br>
<hr>
<br>
</div>

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tt | [mraniki/tt](https://github.com/mraniki/tt) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TT_CEX_API` | 11111111 | api key |
| `TT_CEX_NAME` | binance | cex name |
| `TT_BOT_TOKEN` | (secret) | BOT_TOKEN |
| `TT_CEX_SECRET` | (secret) | CEX API SECRET |
| `TT_APPRISE_URL` | tgram://BOTTOKEN/CHANNEL | tgram://BOTTOKEN/CHANNEL |
| `TT_CEX_ENABLED` | false | - |
| `TT_CHAT_PLATFORM` | discord | telegram, discord, or others |
| `TT_BOT_CHANNEL_ID` | -100000000000 | - |
| `TT_DEX_PRIVATE_KEY` | 0xdeadbeef45ab87712ad64ccb3b10217737f7faacbf2872e88fdd9a537d8fe266 | private key |
| `TT_DEX_WALLET_ADDRESS` | 0x1234567890123456789012345678901234567890 | Wallet Address |

**Category:** Other · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/ZVM0QG)
