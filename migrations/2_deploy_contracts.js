const OwnedGeoENSResolver = artifacts.require("OwnedGeoENSResolver");

module.exports = function(deployer) {
    deployer.deploy(OwnedGeoENSResolver);
};
