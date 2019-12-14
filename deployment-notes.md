Follow guide https://medium.com/@guccimanepunk/how-to-deploy-a-truffle-contract-to-ropsten-e2fb817870c1

# If using local client - start geth
Create an account.
```
geth --testnet account new
```

Start geth.
```
geth --testnet --syncmode fast --rpc --rpcapi eth,net,web3,personal --rpccorsdomain="*" --allow-insecure-unlock
```

In a new terminal, attach to geth and unlock the account.
```
geth attach http://127.0.0.1:8545
personal.unlockAccount(eth.accounts[0])
```
See geth-console-cheatsheet.md for more.

# Migrate
Get some test ether from a faucet then run.
```
truffle migrate --network <local|localrop|ropsten>
```

