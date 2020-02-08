const GeoENSResolver = artifacts.require("GeoENSResolver");
const Selector = artifacts.require("Selector");
const fs = require('fs');
const util = require('util');

// TODO print gas usagee

contract('GeoENSResolver', async accounts => {

    var owner_account = accounts[0];
    var act1 = accounts[1];
    var act2 = accounts[2];

    var geo1 = 'ezs42bcd';
    var geo2 = 'ezs42bdd';

    var emptynode = '0x0000000000000000000000000000000000000000000000000000000000000000';

    let geoResolver;
    before(async () => {
        geoResolver = await GeoENSResolver.deployed();
    });


    it("should set a geohash", async () => {
        //await debug(geoResolver.setGeoAddr(emptynode, 'ezs42bcd', act1, {from: owner_account}));
        await geoResolver.setGeoAddr(emptynode, geo1, act1, {from: owner_account});
    });


    it("should directly resolve a simple geohash query", async () => {
        //await debug(geoResolver.geoAddr(emptynode, geo1));
        a = await geoResolver.geoAddr(emptynode, geo1);
        assert.equal(a[0], act1, "Did not correctly resolve address on direct query");
        assert.equal(a[1], 0, "Did not correctly resolve address on direct query");
    });


    it("should not resolve a non-existant geohash query", async () => {
        //await debug(geoResolver.geoAddr(emptynode, geo2));
        a = await geoResolver.geoAddr(emptynode, geo2);
        assert.equal(a[0], 0, "Did not correctly resolve address on direct query");
    });


    it("should set a second geohash", async () => {
        await geoResolver.setGeoAddr(emptynode, geo2, act2, {from: owner_account});
    });


    it("should resolve only one geohash on direct query", async () => {
        a = await geoResolver.geoAddr(emptynode, geo1);
        assert.equal(a[0], act1, "Did not correctly resolve address on direct query");
        assert.equal(a[1], 0, "Did not correctly resolve address on direct query");

        a = await geoResolver.geoAddr(emptynode, geo2);
        assert.equal(a[0], act2, "Did not correctly resolve address on direct query");
        assert.equal(a[1], 0, "Did not correctly resolve address on direct query");
    });


    it("should resolve only one geohash on indirect query", async () => {
        a = await geoResolver.geoAddr(emptynode, 'ezs42bc');
        assert.equal(a[0], act1, "Did not correctly resolve address on indirect query");
        assert.equal(a[1], 0, "Returned geohash that doesn't match query");

        a = await geoResolver.geoAddr(emptynode, 'ezs42bd');
        assert.equal(a[0], act2, "Did not correctly resolve address on indirect query");
        assert.equal(a[1], 0, "Returned geohash that doesn't match query");
    });


    it("should resolve multiple geohashes on range query", async () => {
        a = await geoResolver.geoAddr(emptynode, 'ezs42b');
        assert.equal(a[0], act1, "Did not correctly resolve address on indirect query");
        assert.equal(a[1], act2, "Returned geohash that doesn't match query");
        assert.equal(a[2], 0, "Returned geohash that doesn't match query");
    });


    it("should return supported interfaces", async () => {
        let selector = await Selector.new({from: owner_account});
        erc165Hash = await selector.calculateSelector();
        //console.log("should support interface " + erc165Hash);
        shouldbeyes = await geoResolver.supportsInterface(erc165Hash, {from: owner_account});
        assert.equal(shouldbeyes, true, "ERC165 calculated hash for GeoENS should return true");
    });
});
