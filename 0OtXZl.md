# Deploy drosera-operator (testnet) on Railway

Drosera operator and delegation client for testnet. Checkout dev.drosera.io

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/0OtXZl)

## About

## Operators

Operators are crucial players in Drosera, consisting of organizations and solo stakers who run the Drosera Operator Client software to help maintain and protect the DeFi ecosystem. These dedicated individuals are responsible for executing Traps and performing on-chain response actions, ensuring the security and stability of the network.

To execute a Trap, an Operator must first gain permission by opting into the specific Trap. Once opted in, the Operator gains access to the off-chain Trap and the current peers in the network. This allows them to actively participate in monitoring and evaluating every new block based on the conditions set by the Trap.

In the event that the conditions of a Trap are met, the Operator will promptly execute the on-chain response function. This swift action helps to mitigate potential threats and exploits.

## Delegation Client

The Delegation Client is a tool used to automatically opt your Operator node into Traps. The Delegation Client is a separate application from the Operator node and requires the same private key used for the Operator node.

It works by querying Drosera's Delegation server which delegates traps to registered Operators as they are created. It is a convenience service that is only used in the testnet environment because it is expected for Operators to manually opt into Traps in a mainnet environment that is based on real value incentives.

### Deploying the drosera-operator (testnet) template
- Populate the 2 required environment variables in both the drosera-operator and drosera-delegation-client services.  The environment variables with the same name should have the same values.
  - DRO__ETH__RPC_URL
  - DRO__ETH__PRIVATE_KEY
- Deploy the operator


### After deployment steps
#### Enable Networking
In order for liveness data for this operator to be seen on the frontend, we need to add an http proxy.
1. Open the `Settings` tab of your service.
2. Navigate to the `Networking` section of the settings tab.
3. Click the `Generate Domain` button.
4. Select port `31314` port from the dropdown list (if you changed the DRO__SERVER__PORT variable, choose the value you set).
5. Click the `Generate Domain` button again.

#### Redeploy the Operator
Now we need to redeploy the service to pick up the networking changes
1. Select the `Deployments` tab of your service.
2. In the green active deployment box, click the vertical 3 dot menu.
3. Click `Redeploy`

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| drosera-delegation-client | `ghcr.io/drosera-network/drosera-delegation-client:latest` | Worker |
| drosera-operator | `ghcr.io/drosera-network/drosera-operator:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DRO__ETH__RPC_URL` | drosera-delegation-client | - | The node used for querying and sending transactions |
| `DRO__ETH__PRIVATE_KEY` | drosera-delegation-client | - | The private key used to sign transactions |
| `DRO__DELEGATION_SERVER_URL` | drosera-delegation-client | https://delegation-server.testnet.drosera.io | The URL of the delegation server to connect to |
| `DRO__BLOCK_POLLING_INTERVAL_MS` | drosera-delegation-client | 1000 | The number of milliseconds to wait between polling for new blocks |
| `DRO__DB_FILE_PATH` | drosera-operator | /app/.data/drosera.db | The path to the database file to use for persistence when not in dev mode |
| `DRO__ETH__RPC_URL` | drosera-operator | - | The node used for querying and sending transactions |
| `DRO__SERVER__PORT` | drosera-operator | 31314 | The TCP port to bind the HTTP server to |
| `DRO__LISTEN_ADDRESS` | drosera-operator | 0.0.0.0 | The network interface to bind the Operators HTTP and P2P server to |
| `DRO__ETH__PRIVATE_KEY` | drosera-operator | - | The private key used to sign transactions |
| `DRO__NETWORK__P2P_PORT` | drosera-operator | 31313 | The TCP port to bind the P2P server to |
| `DRO__DISABLE_DNR_CONFIRMATION` | drosera-operator | true | Disables the DNR confirmation. Only set this if you are running this node behind a NAT, and you are receiving a 'Failed to confirm DNR' error message. Verify the public address setting is correct and any firewall walls are opened for the configured ports before turning this setting on. |
| `DRO__BLOCK_POLLING_INTERVAL_MS` | drosera-operator | 1000 | The number of milliseconds to wait between polling for new blocks |
| `DRO__NETWORK__EXTERNAL_P2P_ADDRESS` | drosera-operator | - | The external address to reach the Operator node at for p2p communications |
| `DRO__NETWORK__EXTERNAL_RPC_ADDRESS` | drosera-operator | - | The external address to reach the Operator node's rpc server. Useful for proxies. Default is the network external p2p address. If provided and starts with either http or https, the value will be used as is by the seed node to retrieve liveness data. Otherwise, if a dns or ip is provided without a protocol, http is assumed and the server port will be appended. |

## Configuration

- **Start command:** `./drosera-operator node`
- **TCP Proxies:** 31313
- **Volume:** `/app/.data/drosera.db`

**Category:** Other

[View on Railway →](https://railway.com/template/0OtXZl)
