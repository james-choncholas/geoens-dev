# Geth console cheat sheet
```
geth attach http://127.0.0.1:8545
```

web3
personal
personal.unlockAccount(eth.accounts[0])
eth.getBalance(eth.accounts[0])
var w = web3.toWei(1, "ether")
eth.getBalance(eth.accounts[0])/w
