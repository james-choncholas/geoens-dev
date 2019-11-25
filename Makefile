
.PHONY: all test mig

all:
	truffle compile

test:
	truffle test

mig:
	truffle migrate
