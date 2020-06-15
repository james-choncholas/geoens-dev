# Geth console cheat sheet
```
geth attach http://127.0.0.1:8545
```

web3
web3.net.peerCount
web3.eth.syncing
web3.eth.blockNumber

personal
personal.unlockAccount(eth.accounts[0])

eth.getBalance(eth.accounts[0])

var w = web3.toWei(1, "ether")
eth.getBalance(eth.accounts[0])/w

admin.nodeInfo # geth must be started with -rpcapi admin

net.peerCount # geth must be started with

## Mining
miner.setEtherbase('0x467d456BD81b34109aEFd5A5ECCc145E1688732d')
eth.coinbase
miner.start()

--etherbase
--mine

## Links
https://github.com/ethereum/go-ethereum/wiki/Management-APIs
https://geth.ethereum.org/docs/interface/command-line-options
