# Deploy Masumi Payment Service Official on Railway

Deploy Masumi Payment Service for blockchain-based AI agent payments

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/masumi-payment-service-official)

## About

Masumi Payment Service is the core infrastructure component of the Masumi Network that handles blockchain-based payments for AI agents. It provides secure wallet management, transaction processing, and integration with the Cardano blockchain to enable decentralized AI agent marketplaces.

Hosting Masumi Payment Service involves deploying a complete payment infrastructure with PostgreSQL database, admin dashboard, and API endpoints. The service manages encrypted wallets, processes Cardano transactions via Blockfrost API, and provides both REST API and admin interface for managing AI agent payments, registrations, and monitoring transactions.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| masumi-psql-database | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| masumi-payment-service | [masumi-network/masumi-payment-service](https://github.com/masumi-network/masumi-payment-service) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | masumi-psql-database | masumi_payment | should auto-create a database required for Masumi Payment Service |
| `DATABASE_URL` | masumi-psql-database | - | will be propagated by Railway |
| `POSTGRES_USER` | masumi-psql-database | (secret) | default: postgres |
| `POSTGRES_PASSWORD` | masumi-psql-database | (secret) | will be propagated by Railway |
| `DATABASE_PUBLIC_URL` | masumi-psql-database | - | will be propagated by Railway |
| `PORT` | masumi-payment-service | 3001 | The port to run the server on (default is 3001) |
| `ADMIN_KEY` | masumi-payment-service | very_secure_long_and_strong_admin_key | The key of the admin user, this key will have all permissions, like doing payments, changing configurations and can also be used to create new (more limited) api_keys |
| `DATABASE_URL` | masumi-payment-service | - | you will be able to retrieve this URL after you create masumi_payment database in your postgreSQL instance on Railway |
| `ENCRYPTION_KEY` | masumi-payment-service | 12345678901234567890123456789012 | This is a secret key used to encrypt the sensitive wallet secrets in the database. Please change this to a secure string of at least 32 characters. |
| `CHECK_TX_INTERVAL` | masumi-payment-service | 180 | delay in seconds for checking payment every 3 minutes |
| `SEED_ONLY_IF_EMPTY` | masumi-payment-service | True | Will skip seeding if there are entries in the db |
| `BATCH_PAYMENT_INTERVAL` | masumi-payment-service | 240 | delay in seconds for batching requests every 4 minutes |
| `REGISTER_AGENT_INTERVAL` | masumi-payment-service | 300 | delay in seconds for registering agent every 5 minutes |
| `CHECK_COLLECTION_INTERVAL` | masumi-payment-service | 300 | delay in seconds for checking collection every 5 minutes |
| `CHECK_SET_REFUND_INTERVAL` | masumi-payment-service | 300 | delay in seconds for checking set refund every 5 minutes |
| `DEREGISTER_AGENT_INTERVAL` | masumi-payment-service | 300 | delay in seconds for deregistering agent every 5 minutes |
| `BLOCKFROST_API_KEY_MAINNET` | masumi-payment-service | (secret) | Your blockfrost api key. It is required to interact with the blockchain. Receive a free key at https://blockfrost.io/ for the network you are using (e.g. mainnet) |
| `BLOCKFROST_API_KEY_PREPROD` | masumi-payment-service | (secret) | Your blockfrost api key. It is required to interact with the blockchain. Receive a free key at https://blockfrost.io/ for the network you are using (e.g. preprod) |
| `CHECK_UNSET_REFUND_INTERVAL` | masumi-payment-service | 300 | delay in seconds for checking unset refund every 5 minutes |
| `CHECK_SUBMIT_RESULT_INTERVAL` | masumi-payment-service | 300 | delay in seconds for checking submit result every 5 minutes |
| `CHECK_COLLECT_REFUND_INTERVAL` | masumi-payment-service | 300 | delay in seconds for checking collection and refund every 5 minutes |
| `CHECK_AUTHORIZE_REFUND_INTERVAL` | masumi-payment-service | 300 | delay in seconds for checking authorize refund every 5 minutes |
| `SELLING_WALLET_MAINNET_MNEMONIC` | masumi-payment-service | - | The mnemonic of the wallet used to interact with the smart contract. This only needs minimal funds, to cover the CARDANO Network fees. If you do not provide a mnemonic, a new one will be generated. Please ensure you export them immediately after creation and store them securely. |
| `SELLING_WALLET_PREPROD_MNEMONIC` | masumi-payment-service | - | The mnemonic of the wallet used to interact with the smart contract. This only needs minimal funds, to cover the CARDANO Network fees. If you do not provide a mnemonic, a new one will be generated. Please ensure you export them immediately after creation and store them securely. |
| `PURCHASE_WALLET_MAINNET_MNEMONIC` | masumi-payment-service | - | The mnemonic of the wallet used to purchase any agent requests. This needs to have sufficient funds to pay, or be topped up. If you do not provide a mnemonic, a new one will be generated. Please ensure you export them immediately after creation and store them securely. |
| `PURCHASE_WALLET_PREPROD_MNEMONIC` | masumi-payment-service | - | The mnemonic of the wallet used to purchase any agent requests. This needs to have sufficient funds to pay, or be topped up. If you do not provide a mnemonic, a new one will be generated. Please ensure you export them immediately after creation and store them securely. |
| `COLLECTION_WALLET_MAINNET_ADDRESS` | masumi-payment-service | - | The wallet address of the collection wallet. It will receive all payments after a successful and completed purchase (not refund). It does not need any funds, however it is strongly recommended to create it via a hardware wallet or ensure its secret is stored securely. If you do not provide an address, the SELLING_WALLET will be used. |
| `COLLECTION_WALLET_PREPROD_ADDRESS` | masumi-payment-service | - | The wallet address of the collection wallet. It will receive all payments after a successful and completed purchase (not refund). It does not need any funds, however it is strongly recommended to create it via a hardware wallet or ensure its secret is stored securely. If you do not provide an address, the SELLING_WALLET will be used. |
| `CHECK_WALLET_TRANSACTION_HASH_INTERVAL` | masumi-payment-service | 60 | delay in seconds for checking wallet transaction hash every 1 minute this also reruns potentially effected services by unlocking the wallet |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c "npm run prisma:migrate && npm run prisma:seed && npm run start"`
- **Healthcheck:** `/api/v1/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, JavaScript, Aiken, CSS, Shell, Dockerfile, SCSS

[View on Railway →](https://railway.com/deploy/masumi-payment-service-official)
