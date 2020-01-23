VERBOSE	?= 0
ifeq ($(VERBOSE), 0)
	QUIET=@
else
	QUIET=
endif

.PHONY: build benchmark test

help: SHELL:=/bin/bash
help: ## Show this help.
	@echo -e "$$(grep -hE '^\S+:.*##' $(MAKEFILE_LIST) | sed -e 's/:.*##\s*/:/' -e 's/^\(.\+\):\(.*\)/\\x1b[36m\1\\x1b[m:\2/' | column -c2 -t -s :)"

build: ## compile contracts
	$(QUIET)truffle compile

benchmark: ## run benchmarks on ropsten testnet (warning - this takes a while)
	$(QUIET)mkdir -p ./test/GeoResolver-results/
	$(QUIET)truffle test --network localrop ./test/GeoResolverBenchmarking.js

test: ## run basic tests on local ganache chain
	$(QUIET)truffle test ./test/GeoResolverBasicTest.js
