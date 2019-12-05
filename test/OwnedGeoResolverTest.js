const OwnedGeoENSResolver = artifacts.require("OwnedGeoENSResolver");
const Selector = artifacts.require("Selector");

// TODO print gas usagee

contract('OwnedGeoENSResolver', async accounts => {

    var owner_account = accounts[0];
    var act1 = accounts[1];
    var act2 = accounts[2];

    let geoResolver;
    before(async () => {
        geoResolver = await OwnedGeoENSResolver.deployed();
    });

    it("should not accept sent funds", async () => {
        var reverted = false;
        try {
            await geoResolver.sendTransaction({ from: owner_account, value: 1});
        } catch (e) {
            reverted = true;
        }
        assert.equal(reverted, true, "Owner sent funds to contract");
    });

    it("should set a geohash", async () => {
        await geoResolver.setGeoAddr('0x0000000000000000000000000000000000000000000000000000000000000000',
            '0x000000000000abcd',
            act1,
            {from: owner_account});
    });

    it("should resolve a geohash", async () => {
        a = await geoResolver.geoAddr('0x0000000000000000000000000000000000000000000000000000000000000000',
            '0x000000000000abcd',
            '0xFFFFFFFFFFFFFFFF');
        assert.equal(a[0], act1, "Did not correctly resolve address on direct query");
    });

    it("should resolve an indirect geohash", async () => {
        a = await geoResolver.geoAddr('0x0000000000000000000000000000000000000000000000000000000000000000',
            '0x000000000000abcd',
            '0xFFFFFFFFFFFFFF00');
        assert.equal(a[0], act1, "Did not correctly resolve address on indirect query");
    });

    it("should set and resolve multiple geohashes", async () => {
        await geoResolver.setGeoAddr('0x0000000000000000000000000000000000000000000000000000000000000000',
            '0x000000000000abcd',
            act1,
            {from: owner_account});
        await geoResolver.setGeoAddr('0x0000000000000000000000000000000000000000000000000000000000000000',
            '0x000000000000abce',
            act2,
            {from: owner_account});

        a = await geoResolver.geoAddr('0x0000000000000000000000000000000000000000000000000000000000000000',
            '0x000000000000abcd',
            '0xFFFFFFFFFFFFFFFF');
        assert.equal(a[0], act1, "Did not correctly resolve address on direct query");
        assert.equal(a[1], 0, "Did not correctly resolve address on direct query");

        a = await geoResolver.geoAddr('0x0000000000000000000000000000000000000000000000000000000000000000',
            '0x000000000000abcd',
            '0xFFFFFFFFFFFFFF00');
        assert.equal(a[0], act1, "Did not correctly resolve address on indirect query");
        assert.equal(a[1], act2, "Did not correctly resolve address on indirect query");
    });

    it("should return supported interfaces", async () => {
        shouldbeyes = await geoResolver.supportsInterface("0x01ffc9a7", {from: owner_account});
        assert.equal(shouldbeyes, true, "ERC165 supported interface should return true");

        let selector = await Selector.new({from: owner_account});
        erc165Hash = await selector.calculateSelector();
        shouldbeyes = await geoResolver.supportsInterface(erc165Hash, {from: owner_account});
        assert.equal(shouldbeyes, true, "ERC165 calculated hash for GeoENS should return true");
    });
});
