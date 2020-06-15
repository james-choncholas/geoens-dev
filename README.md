# GeoENS
An extension of ENS (Ethereum Name Service) to support geographically specific query resolution.
More background and details are available [here](eip-2390.md).

## EIP 2390
[EIP 2390](eip-2390.md) (Ethereum Improvement Proposal) was
[submitted](https://github.com/ethereum/EIPs/pull/2390) as an ERC specification.

## Deploy notes
Deployment credentials not stored in this repository. To deploy, store deployment mnemonic in a file called .mnemonic and infura credentials in .infuraid and .infurakey.

Follow guide https://medium.com/@guccimanepunk/how-to-deploy-a-truffle-contract-to-ropsten-e2fb817870c1

- Make sure the [account](https://ropsten.etherscan.io/address/0x467d456bd81b34109aefd5a5eccc145e1688732d) has money.

### If using local client - start geth
Create an account.
```
geth --testnet account new --datadir /mnt/md0/eth/
```

Start geth.
```
geth --testnet --syncmode fast --rpc --rpcapi eth,net,web3,personal --rpccorsdomain="*" --allow-insecure-unlock --datadir /mnt/md0/eth/
```

Truffle is set up to use the account defined by ./.mnmonic.

See geth-console-cheatsheet.md for more.

### Migrate & Test
Get some test ether from a faucet then run.
```
truffle migrate --network <local|localrop|ropsten>
```

Truffle will NOT deploy new contracts each time you run test.
It stores the last deployed contract address in the build artifact json.
Note that test file paths can be appended to the command to run specific tests.
```
truffle test --network <local|localrop|ropsten>
```
