const GeoENSResolver = artifacts.require("GeoENSResolver");
//const MappingGeoENSResolver = artifacts.require("MappingGeoENSResolver");
//const StringOwnedGeoENSResolver = artifacts.require("StringOwnedGeoENSResolver");

module.exports = function(deployer) {
    deployer.deploy(GeoENSResolver);
    //deployer.deploy(MappingGeoENSResolver);
    //deployer.deploy(StringOwnedGeoENSResolver);
};
