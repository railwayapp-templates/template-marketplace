# Deploy printr-adapter on Railway

Deploy and Host printr-adapter with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/printr-adapter)

## About

# Printr Processor

A high-performance blockchain data processor for printr that tracks transactions and timeweighted-balance and provides real-time analytics.

## Features

- **Real-time Event Processing**: Handles Initialize, Mint, Burn, and Swap events
- **Transactions Tracking**: Track each swap event as a Transaction Event

## What it Tracks 

### **Core Events**
- **TokenTrade**: Tracks all buy/sell transactions through bonding curves
- **CurveCreated**: Monitors new bonding curve creation for tokens

### **Key Metrics**
- **Trading Volume**: Buy/sell amounts in base currency (ETH)
- **Token Supply**: Dynamic supply changes through bonding curve mechanics
- **Price Discovery**: Effective price per token from each trade
- **Reserve Tracking**: Base currency reserves in bonding curves
- **Gas Analytics**: Transaction costs and gas fee tracking
- **USD Value**: Real-time USD conversion using historical ETH prices


## Quick Start

Preconfigured: 
```
RPC_URL_MAINNET=https://eth.llamarpc.com
RPC_URL_HEMI=https://rpc.hemi.network/rpc
```
```
ABS_CONFIG='{"balanceFlushIntervalHours":6,"dexProtocols":[{"type":"uniswap-v2","chainId":1,"toBlock":0,"protocols":[{"name":"PEPE/WETH Pool","contractAddress":"0xa43fe16908251ee70ef74718545e4fe6c5ccec9f","fromBlock":17046833,"pricingStrategy":"coingecko","token0":{"coingeckoId":"pepe","decimals":18},"token1":{"coingeckoId":"weth","decimals":18},"preferredTokenCoingeckoId":"token1"}]},{"type":"izumi","chainId":42161,"toBlock":0,"protocols":[{"name":"WETH/ hemiBTC Pool","contractAddress":"0xa43fe16908251ee70ef74718545e4fe6c5ccec9f","fromBlock":1276815,"pricingStrategy":"coingecko","token0":{"coingeckoId":"weth","decimals":18},"token1":{"coingeckoId":"btc","decimals":8},"preferredTokenCoingeckoId":"token1"},{"name":"VUSD/ WETH","contractAddress":"0xa43fe16908251ee70ef74718545e4fe6c5ccec9f","fromBlock":1274620,"pricingStrategy":"coingecko","token0":{"coingeckoId":"vesper-vdollar","decimals":18},"token1":{"coingeckoId":"weth","decimals":18},"preferredTokenCoingeckoId":"token1"}]}],"bondingCurveProtocols":[{"type":"printr","name":"Printr Base","contractAddress":"0xbdc9a5b600e9a10609b0613b860b660342a6d4c0","chainId":8453,"toBlock":0,"fromBlock":30000000},{"type":"vusd-mint","name":"VUSDMint","contractAddress":"0xFd22Bcf90d63748288913336Cd38BBC0e681e298","chainId":1,"toBlock":0,"fromBlock":22017054},{"type":"demos","name":"Demos","contractAddress":"0x70468f06cf32b776130e2da4c0d7dd08983282ec","chainId":43111,"toBlock":0,"fromBlock":1993447},{"type":"voucher","name":"Voucher","contractAddress":"0xa26b04b41162b0d7c2e1e2f9a33b752e28304a49","chainId":1,"toBlock":0,"fromBlock":21557766}],"stakingProtocols":[{"type":"hemi","name":"Hemi Staking","contractAddress":"0x4f5e928763cbfaf5ffd8907ebbb0dabd5f78ba83","chainId":43111,"toBlock":0,"fromBlock":2025621},{"type":"vusd-bridge","name":"VUSDBridge","contractAddress":"0x5eaa10F99e7e6D177eF9F74E519E319aa49f191e","chainId":1,"toBlock":0,"fromBlock":22695105}],"univ3Protocols":[{"type":"uniswap-v3","chainId":1,"factoryAddress":"0x1f98431c8ad98523631ae4a59f267346ea31f984","factoryDeployedAt":12369621,"positionsAddress":"0xc36442b4a4522e871399cd717abdd847ab11fe88","toBlock":12505499,"poolDiscovery":true,"trackPositions":true,"trackSwaps":true,"pools":[{"name":"pepe/weth 0.3% pool","contractAddress":"0x11950d141ecb863f01007add7d1a342041227b58","fromBlock":13609065,"feeTier":3000,"pricingStrategy":"internal-twap","token0":{"symbol":"PEPE","decimals":18},"token1":{"symbol":"WETH","decimals":18},"preferredTokenCoingeckoId":"token1"},{"name":"wepe/weth 0.3% pool","contractAddress":"0xa3c2076eb97d573cc8842f1db1ecdf7b6f77ba27","fromBlock":12376729,"feeTier":3000,"pricingStrategy":"internal-twap","token0":{"symbol":"WEPE","decimals":18},"token1":{"symbol":"WETH","decimals":18},"preferredTokenCoingeckoId":"token1"},{"name":"usdc/weth 0.3% pool","contractAddress":"0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640","fromBlock":1620250931,"feeTier":3000,"pricingStrategy":"internal-twap","token0":{"symbol":"USDC","decimals":6},"token1":{"symbol":"WETH","decimals":18},"preferredTokenCoingeckoId":"token1"}]}],"zebuProtocols":[{"type":"zebu","name":"Zebu-New","toBlock":0,"clients":[{"name":"xyz-1","contractAddress":"0xD71954165a026924cA771C53164FB0a781c54C83","chainId":137,"fromBlock":61059459},{"name":"xyz-2","contractAddress":"0x3e4768dB375094b753929B7A540121d970fcb24e","chainId":137,"fromBlock":61059459},{"name":"xyz-3","contractAddress":"0x5859Ff44A3BDCD00c7047E68B94e93d34aF0fd71","chainId":8453,"fromBlock":15286409},{"name":"xyz-4","contractAddress":"0xE3EB2347bAE4E2C6905D7B832847E7848Ff6938c","chainId":137,"fromBlock":61695150},{"name":"xyz-5","contractAddress":"0x19633c8006236f6c016a34B9ca48e98AD10418B4","chainId":137,"fromBlock":64199277},{"name":"xyz-6","contractAddress":"0x0c18F35EcfF53b7c587bD754fc070b683cB9063B","chainId":8453,"fromBlock":20328800},{"name":"xyz-7","contractAddress":"0xDD4d9ae148b7c821b8157828806c78BD0FeCE8C4","chainId":137,"fromBlock":73490308}]},{"type":"zebu","name":"Zebu-Legacy","toBlock":0,"clients":[{"name":"xyz-1","contractAddress":"0xd7829F0EFC16086a91Cf211CFbb0E4Ef29D16BEE","chainId":8453,"fromBlock":27296063}]}]}'
```
```
ABSINTHE_API_URL=https://adapters.absinthe.network
ABSINTHE_API_KEY=api_key_2
```

Fill these details :
```
COINGECKO_API_KEY=
(Optional) RPC_URL_BASE=
```

# Environment Variables Configuration

### ABS_CONFIG

```json
{
  "balanceFlushIntervalHours": Number,      // hours between balance-flush runs
  "dexProtocols": [
    {
      "type": String,                       // e.g., "uniswap-v2"
      "chainId": Number,                    // chain numeric ID
      "toBlock": Number,                    // block to stop indexing (0 = latest)
      "protocols": [
        {
          "name": String,                   // e.g., "PEPE/WETH Pool" or your template name
          "contractAddress": String,        // on-chain contract address
          "fromBlock": Number,              // starting block
          "pricingStrategy": String,        // "coingecko" or "internal-twap"
          "token0": {
            "coingeckoId"?: String,         // required if pricingStrategy = "coingecko"
            "symbol"?: String,              // required if pricingStrategy = "internal-twap"
            "decimals": Number
          },
          "token1": {
            "coingeckoId"?: String,
            "symbol"?: String,
            "decimals": Number
          },
          "preferredTokenCoingeckoId"?: String
        }
      ]
    }
  ],
  // …repeat similar structures for:
  // "bondingCurveProtocols", "stakingProtocols", "univ3Protocols", etc.
}
```

## String to JSON Conversion

Railway environment variables must be strings, so wrap the entire object:

```bash
export ABS_CONFIG='{
  "balanceFlushIntervalHours": 6,
  "dexProtocols": [ … ],
  "bondingCurveProtocols": [ … ],
  "stakingProtocols": [ … ],
  "univ3Protocols": [ … ]
}'
```

Railway CLI will inject this string; your adapter should parse it at startup:

```js
const config = JSON.parse(process.env.ABS_CONFIG);
```

## Customizing for Your Template:

Template Name Field: adjust the name property in each protocol to match your adapter, e.g., for Demos use:

```
"bondingCurveProtocols":[
  {
    "type":"demos",
    "name":"demos",
    "contractAddress":"0x...",
    "chainId":43111,
    "fromBlock":1993447
  }
]
```
## Common Build Errors

| Adapter | Error                 | Description                                      | Resolution                                                                                                                                          |
|---------|-----------------------|--------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| Any     | **Schema mismatch**   | `ABS_CONFIG` JSON doesn’t match expected schema. | - Verify keys/types in your JSON<br>- Run JSON Schema validator:<br>   |
| Any     | **RPC timeout**       | Indexer can’t reach a JSON-RPC endpoint.         | - Check `RPC_URL_*` values<br>- Increase timeout or retry count in config                                                                          |
| Any     | **CoinGecko API key** | Invalid, missing, or expired CoinGecko API key.  | - Obtain a valid key from CoinGecko<br>- Set `COINGECKO_API_KEY` in env<br>- Ensure your key or plan supports the required request volume             |

---

### One-Click Deployment Rationale

We’ve chosen a one-click deployment model because each adapter is essentially a continuously running indexer service. This approach:

- **Simplifies onboarding**: Users—both technical and non-technical—can deploy without writing custom scripts.  
- **Ensures consistency**: This template sets up the service and its PostgreSQL database in one go.  
- **Reduces operational overhead**: No manual server provisioning or database wiring required.

### Hosting Considerations

- **Local vs. Self-Hosted**: While Railway spins up both the adapter container and a managed Postgres instance by default, you can easily switch to your own self-hosted Postgres by overriding `DB_URL`.  
- **Continuous Operation**: Indexers must run 24/7 to maintain up-to-date data synchronization. One-click deployment abstracts away restarts, health checks, and reconnections.  


## Common Use Cases

- **Ease of Use**: Designed so that anyone—regardless of technical background—can run the indexer with minimal effort
- **Rapid Prototyping**: Quickly spin up an environment to test new contracts or data pipelines without complex infrastructure.

 # Deploy and Host, ## About Hosting, ## Why Deploy, ### Deployment Dependencies
## Dependencies for

**Docker Image**: All adapters reference the same base repo/image on GitHub Container Registry:
```
ghcr.io/absinthelabs/absinthe-printr:latest
```

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| absinthelabs/absinthe-printr:latest | `ghcr.io/absinthelabs/absinthe-printr:latest` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `ABS_CONFIG` | absinthelabs/absinthe-printr:latest | {"balanceFlushIntervalHours":6,"dexProtocols":[{"type":"uniswap-v2","chainId":1,"toBlock":0,"protocols":[{"name":"pepe-weth","contractAddress":"0xa43fe16908251ee70ef74718545e4fe6c5ccec9f","fromBlock":17046833,"pricingStrategy":"coingecko","token0":{"coingeckoId":"pepe","decimals":18},"token1":{"coingeckoId":"weth","decimals":18},"preferredTokenCoingeckoId":"token1"}]},{"type":"izumi","chainId":42161,"toBlock":0,"protocols":[{"name":"weth-hemitbtc","contractAddress":"0xa43fe16908251ee70ef74718545e4fe6c5ccec9f","fromBlock":1276815,"pricingStrategy":"coingecko","token0":{"coingeckoId":"weth","decimals":18},"token1":{"coingeckoId":"btc","decimals":8},"preferredTokenCoingeckoId":"token1"},{"name":"vusd-weth","contractAddress":"0xa43fe16908251ee70ef74718545e4fe6c5ccec9f","fromBlock":1274620,"pricingStrategy":"coingecko","token0":{"coingeckoId":"vesper-vdollar","decimals":18},"token1":{"coingeckoId":"weth","decimals":18},"preferredTokenCoingeckoId":"token1"}]}],"bondingCurveProtocols":[{"type":"printr","name":"printr-base","contractAddress":"0xbdc9a5b600e9a10609b0613b860b660342a6d4c0","factoryAddress":"0x33128a8fc17869897dce68ed026d694621f6fdfd","chainId":8453,"toBlock":0,"fromBlock":30000000},{"type":"vusd-mint","name":"vusd-mint","contractAddress":"0xFd22Bcf90d63748288913336Cd38BBC0e681e298","chainId":1,"toBlock":0,"fromBlock":22017054},{"type":"demos","name":"demos","contractAddress":"0x70468f06cf32b776130e2da4c0d7dd08983282ec","chainId":43111,"toBlock":0,"fromBlock":1993447},{"type":"voucher","name":"voucher","contractAddress":"0xa26b04b41162b0d7c2e1e2f9a33b752e28304a49","chainId":1,"toBlock":0,"fromBlock":21557766}],"stakingProtocols":[{"type":"hemi","name":"hemi-staking","contractAddress":"0x4f5e928763cbfaf5ffd8907ebbb0dabd5f78ba83","chainId":43111,"toBlock":0,"fromBlock":2025621},{"type":"vusd-bridge","name":"vusd-bridge","contractAddress":"0x5eaa10F99e7e6D177eF9F74E519E319aa49f191e","chainId":1,"toBlock":0,"fromBlock":22695105}],"univ3Protocols":[{"type":"uniswap-v3","chainId":1,"factoryAddress":"0x1f98431c8ad98523631ae4a59f267346ea31f984","factoryDeployedAt":12369621,"positionsAddress":"0xc36442b4a4522e871399cd717abdd847ab11fe88","toBlock":0,"poolDiscovery":true,"trackPositions":true,"trackSwaps":true,"pools":[{"name":"pepe-weth-0.3","contractAddress":"0x11950d141ecb863f01007add7d1a342041227b58","fromBlock":13609065,"feeTier":3000,"pricingStrategy":"internal-twap","token0":{"symbol":"PEPE","decimals":18},"token1":{"symbol":"WETH","decimals":18},"preferredTokenCoingeckoId":"token1"},{"name":"wepe-weth-0.3","contractAddress":"0xa3c2076eb97d573cc8842f1db1ecdf7b6f77ba27","fromBlock":12376729,"feeTier":3000,"pricingStrategy":"internal-twap","token0":{"symbol":"WEPE","decimals":18},"token1":{"symbol":"WETH","decimals":18},"preferredTokenCoingeckoId":"token1"},{"name":"usdc-weth-0.3","contractAddress":"0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640","fromBlock":1620250931,"feeTier":3000,"pricingStrategy":"internal-twap","token0":{"symbol":"USDC","decimals":6},"token1":{"symbol":"WETH","decimals":18},"preferredTokenCoingeckoId":"token1"}]}],"zebuProtocols":[{"type":"zebu","name":"zebu-new","toBlock":0,"clients":[{"name":"xyz-1","contractAddress":"0xD71954165a026924cA771C53164FB0a781c54C83","chainId":137,"fromBlock":61059459},{"name":"xyz-2","contractAddress":"0x3e4768dB375094b753929B7A540121d970fcb24e","chainId":137,"fromBlock":61059459},{"name":"xyz-3","contractAddress":"0x5859Ff44A3BDCD00c7047E68B94e93d34aF0fd71","chainId":8453,"fromBlock":15286409},{"name":"xyz-4","contractAddress":"0xE3EB2347bAE4E2C6905D7B832847E7848Ff6938c","chainId":137,"fromBlock":61695150},{"name":"xyz-5","contractAddress":"0x19633c8006236f6c016a34B9ca48e98AD10418B4","chainId":137,"fromBlock":64199277},{"name":"xyz-6","contractAddress":"0x0c18F35EcfF53b7c587bD754fc070b683cB9063B","chainId":8453,"fromBlock":20328800},{"name":"xyz-7","contractAddress":"0xDD4d9ae148b7c821b8157828806c78BD0FeCE8C4","chainId":137,"fromBlock":73490308}]},{"type":"zebu","name":"zebu-legacy","toBlock":0,"clients":[{"name":"xyz-1","contractAddress":"0xd7829F0EFC16086a91Cf211CFbb0E4Ef29D16BEE","chainId":8453,"fromBlock":27296063}]}]} | - |
| `RPC_URL_HEMI` | absinthelabs/absinthe-printr:latest | https://rpc.hemi.network/rpc | - |
| `ABSINTHE_API_KEY` | absinthelabs/absinthe-printr:latest | (secret) | - |
| `ABSINTHE_API_URL` | absinthelabs/absinthe-printr:latest | https://adapters-develop.absinthe.network | - |
| `COINGECKO_API_KEY` | absinthelabs/absinthe-printr:latest | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/template/printr-adapter)
