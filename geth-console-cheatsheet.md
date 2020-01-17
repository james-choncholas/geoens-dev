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
