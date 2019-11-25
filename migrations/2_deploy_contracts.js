const OwnedGeoENSResolver = artifacts.require("OwnedGeoENSResolver");
const StringOwnedGeoENSResolver = artifacts.require("StringOwnedGeoENSResolver");

module.exports = function(deployer) {
  deployer.deploy(OwnedGeoENSResolver);
  deployer.deploy(StringOwnedGeoENSResolver);
};
