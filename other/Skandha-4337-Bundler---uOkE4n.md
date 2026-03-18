# Deploy Skandha 4337 Bundler on Railway

Account Abstraction ERC-4337 Bundler: Skandha by Etherspot

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/uOkE4n)

## About

---

# SKANDHA on Railway with Arbitrum

This project is a fork of the original [etherspot/skandha](https://github.com/etherspot/skandha) repository. We would like to acknowledge and thank the original creators for their work and contribution. This fork has been modified to enable hosting on Railway with default settings configured for Arbitrum.

## Introduction
In ERC-4337, a Bundler is the core infrastructure component that allows account abstraction to work on any EVM network. On the highest level, its purpose is to work with a mempool of User Operations to get the transaction to be included on-chain.

This project allows you to deploy the SKANDHA bundler application on Railway with support for Arbitrum. SKANDHA is a platform designed to provide decentralized orchestration for blockchain-based tasks, specifically functioning as a Bundler for ERC-4337.

## Getting Started
Follow these steps to get the project up and running:

1. **Fork the Repository**: Fork this repository to your own GitHub account.
2. **Clone the Repository**: Clone the forked repository to your local machine.
    ```sh
    git clone https://github.com/voidfab/skandha.git
    ```
3. **Deploy to Railway**: Follow the [Railway Documentation](https://docs.railway.app/running/deployments) to deploy the project. Or 1-click deploy:

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/Uii9K8?referralCode=YOURCODE)

## Configuration
By default, this project is configured to work with Arbitrum. To modify the configuration, edit the necessary environment variables and settings in the `railway.toml` or config.json (or environment variables directly on Railway *Preferred Method*).

## Skandha Help
Below are all the ENV Variables you can set (details can be found in etherspots docs)
```plaintext
SKANDHA_ENTRYPOINTS=0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789,0x0000000071727De22E5E9d8BAf0edAc6f37da032
RELAYERS=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80,0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
SKANDHA_BENEFICIARY_ADDRESS=0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
SKANDHA_RPC=
SKANDHA_RPC_SUBMIT=
SKANDHA_GAS_PRICE_MARKUP=0
SKANDHA_ENFORCE_GAS_PRICE=false
SKANDHA_ENFORCE_GAS_PRICE_THRESHOLD=1000
SKANDHA_ETHERSCAN_API_KEY=
SKANDHA_RECEIPT_LOOKUP_RANGE=
SKANDHA_CONDITIONAL_TRANSACTIONS=
SKANDHA_EIP2930=
SKANDHA_MIN_STAKE=
SKANDHA_MIN_UNSTAKE_DELAY=
SKANDHA_BUNDLE_GAS_LIMIT_MARKUP=
SKANDHA_RELAYING_MODE=
SKANDHA_BUNDLE_INTERVAL=
SKANDHA_BUNDLE_SIZE=
SKANDHA_PVG_MARKUP=
SKANDHA_CANONICAL_MEMPOOL=
SKANDHA_CANONICAL_ENTRY_POINT=
SKANDHA_CGL_MARKUP=
SKANDHA_VGL_MARKUP=
SKANDHA_GAS_FEE_IN_SIMULATION=
SKANDHA_THROTTLING_SLACK=
SKANDHA_BAN_SLACK=
SKANDHA_MIN_INCLUSION_DENOMINATOR=
SKANDHA_MERKLE_API_URL=
SKANDHA_SKIP_BUNDLE_VALIDATION=
SKANDHA_BUNDLE_GAS_LIMIT=
SKANDHA_USEROP_GAS_LIMIT=
SKANDHA_KOLIBRI_AUTH_KEY=
SKANDHA_ENTRYPOINT_FORWARDER=
SKANDHA_FASTLANE_VALIDATOR=
SKANDHA_ESTIMATION_GAS_LIMIT=
SKANDHA_PVG_MARKUP_PERCENT=
SKANDHA_CGL_MARKUP_PERCENT=
SKANDHA_VGL_MARKUP_PERCENT=
SKANDHA_WL_PAYMASTER=
SKANDHA_WL_ACCOUNT=
SKANDHA_WL_FACTORY=
PORT=14337
```

## Security Considerations
When reading the [EIP specs](https://eips.ethereum.org/EIPS/eip-4337), you'll notice that there are many rules a bundler must follow. Although the list of rules may seem long and complex, each one has been extensively debated and discussed by security researchers and builders within the Ethereum ecosystem.

One of the bundler's main jobs is to comply with these rules to prevent all possible DoS attack vectors. These include everything from basic sanity checks that make sure a User Operation is structurally sound to more in-depth tracing for banned opcodes and storage access to make sure bundles cannot be censored once submitted to the network.

Similar to Ethereum clients, all bundler implementations are expected to pass a test suite to ensure compliance and that it won't fragment the mempool.

Spec Tests: https://github.com/eth-infinitism/bundler-spec-tests


## Acknowledgements
Special thanks to the original creators of the [pimlico/skandha](https://github.com/etherspot/skandha) project. This fork wouldn't be possible without their foundational work.

The [ERC-4337 Team](https://github.com/eth-infinitism) and the Ethereum community for their continued support and guidance in the development of the EIP-4337 specification.

## License
This project is licensed under the GNU GENERAL PUBLIC LICENSE. See the [LICENSE](LICENSE) file for details.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bundler-skandha-rail | [voidfab/bundler-skandha-rail](https://github.com/voidfab/bundler-skandha-rail) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 14337 |
| `SKANDHA_RPC` | https://arbitrum.llamarpc.com |
| `SKANDHA_RELAYERS` | 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80,0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d |
| `SKANDHA_RPC_SUBMIT` | https://arbitrum.llamarpc.com |
| `SKANDHA_ENTRYPOINTS` | 0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789,0x0000000071727De22E5E9d8BAf0edAc6f37da032 |
| `SKANDHA_BENEFICIARY_ADDRESS` | 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/`

**Category:** Other · **Languages:** TypeScript, JavaScript, Solidity, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/uOkE4n)
