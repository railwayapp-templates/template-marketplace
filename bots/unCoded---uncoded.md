# Deploy unCoded on Railway

Start unCoded TradingBot on railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/uncoded)

## About

----------------------------------------------

unCoded Website 
official website: https://unCoded.ch
technical website: https://unCoded.vip

Step 1:
Activate your free $100 Profit License here:
https://t.me/unCoded_bot?start=ref_545568537

Step 2:
Create an API key on your Binance account to connect the trading bot to your broker.
https://www.binance.com/en/my/settings/api-management

We recommend creating a sub-account to keep the bot's trades separate from your manual trades.
https://www.binance.com/en/my/sub-account/account-management

If you don't have a Binance account, you can create one here and get a permanent 20% fee discount.
https://bit.ly/B-20Fee

Step 3:
Create a Telegram bot to control your trading bot via Telegram.
https://t.me/BotFather

Step 4:
Add your new Telegram bot as an administrator to a group with yourself in it. This will allow you to see the bot's trades.

Step 5:
Add the my_id_bot to your group to get your personal Telegram ID and your group's ID. This ensures that only you can interact with your bot.
https://t.me/my_id_bot

Step 6:
Now you have all the information needed to launch the trading bot.
Click "Deploy" in the template and fill in all the required data to start the bot.

Step 7:
In the user interface, navigate to uncodedTradingBot => Settings => Regions.
Verify that the region is set to EU West (Amsterdam, Netherlands). If not, you must change it.

Step 8:
Next, we need a static IP address; otherwise, you cannot permit API trading on Binance.
For this, you will need the "Pro Plan" on Railway. This plan also covers the hosting costs for your bot in the cloud.

Step 9:
With the Pro plan, you can now enable the static IP in the uncodedTradingBot settings:
uncodedTradingBot => Settings => Networking => Static Outbound IPs => Enable Static IPs => TRUE

Step 10:
With the static IP enabled, you can return to your API settings on Binance and add the new static IP address to the list of trusted IPs. This will allow you to enable trading.
https://www.binance.com/en/my/settings/api-management

Ensure that only "Enable Reading" and "Enable Spot & Margin Trading" are checked.

Step 11:
The bot is now running and ready for final configuration. We can now set the trading pair.
Go to your Telegram group and type /start to activate the trading bot. Then navigate to ⚙️ Configuration => Set configuration.

Here you can configure the BaseAsset and the QuoteAsset.

The default BaseAsset is PEPE, but you can choose any token listed on Binance.

The default QuoteAsset is USDC, as this is the primary option for EU citizens. If you are not in the EU, FDUSD might be more profitable as it often has zero trading fees, which can significantly increase your profit.

NOTE: Once you start the bot, you cannot change the trading pair. You must create a new bot instance for a different pair, as each bot is optimized for maximum performance on a single pair.

Step 12:
Finally, set acceptTosAndStartBot to True, and your bot will begin trading.

Step 13:
Set Usage Limit to 100$ for Safety in Railway

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| UnCodedDatabase | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| unCodedTradingBot | `aureumvictoria/uncoded-trading-bot:3` | Worker |
| unCodedTelegramBot | `aureumvictoria/uncoded-telegram-bot:3` | Worker |
| unCodedUiBot | `tbotteam/uncoded-js-frontend:final` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | UnCodedDatabase | railway | Default database created when image is started. |
| `DATABASE_URL` | UnCodedDatabase | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | UnCodedDatabase | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | UnCodedDatabase | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | UnCodedDatabase | - | Public URL to connect to Postgres database, used by the Data panel. |
| `API_KEY` | unCodedTradingBot | (secret) | - |
| `PROXY_URL` | unCodedTradingBot | - | PROXY_URL=http://username:password@geo.iproyal.com:12323 |
| `API_SECRET` | unCodedTradingBot | (secret) | - |
| `DOCKER_ENV` | unCodedTradingBot | true | - |
| `CONFIG_MODE` | unCodedTradingBot | 4 | - |
| `POSTGRES_USER` | unCodedTradingBot | (secret) | - |
| `POSTGRES_PASSWORD` | unCodedTradingBot | (secret) | - |
| `POSTGRES_USER` | unCodedTelegramBot | (secret) | - |
| `POSTGRES_PASSWORD` | unCodedTelegramBot | (secret) | - |
| `TELEGRAM_BOT_TOKEN` | unCodedTelegramBot | (secret) | - |
| `PORT` | unCodedUiBot | 4000 | - |
| `DOCKER_ENV` | unCodedUiBot | true | - |
| `APP_PASSWORD` | unCodedUiBot | (secret) | - |
| `POSTGRES_USER` | unCodedUiBot | (secret) | - |
| `POSTGRES_PASSWORD` | unCodedUiBot | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Bots

[View on Railway →](https://railway.com/deploy/uncoded)
