const StringOwnedGeoENSResolver = artifacts.require("StringOwnedGeoENSResolver");

contract('StringOwnedGeoENSResolver', accounts => {

    console.log(accounts);
    var owner_account = accounts[0];
    var act1 = accounts[1];
    var act2 = accounts[2];


    it("should not accept sent funds", async () => {
        let geoResolver = await StringOwnedGeoENSResolver.new({from: owner_account});

        var reverted = false;
        try {
            await geoResolver.sendTransaction({ from: owner_account, value: 1});
        } catch (e) {
            reverted = true;
        }
        assert.equal(reverted, true, "Owner sent funds to contract");
    });

    it("should set and resolve a geohash", async () => {
        let geoResolver = await StringOwnedGeoENSResolver.new({from: owner_account});
        await geoResolver.setGeoAddr('0x0000000000000000000000000000000000000000000000000000000000000000',
            '12345678', act1, {from: owner_account});
        a = await geoResolver.geoAddr('0x0000000000000000000000000000000000000000000000000000000000000000',
            '12345678');
        assert.equal(a[0], act1, "Did not correctly resolve address on direct query");

        a = await geoResolver.geoAddr('0x0000000000000000000000000000000000000000000000000000000000000000',
            '1234567');
        assert.equal(a[0], act1, "Did not correctly resolve address on indirect query");
    });

    it("should set and resolve multiple geohashes", async () => {
        let geoResolver = await StringOwnedGeoENSResolver.new({from: owner_account});
        await geoResolver.setGeoAddr('0x0000000000000000000000000000000000000000000000000000000000000000',
            '12345678', act1, {from: owner_account});
        await geoResolver.setGeoAddr('0x0000000000000000000000000000000000000000000000000000000000000000',
            '12345679', act2, {from: owner_account});
        a = await geoResolver.geoAddr('0x0000000000000000000000000000000000000000000000000000000000000000',
            '12345678');
        assert.equal(a[0], act1, "Did not correctly resolve address on direct query");
        assert.equal(a[1], 0, "Did not correctly resolve address on direct query");

        a = await geoResolver.geoAddr('0x0000000000000000000000000000000000000000000000000000000000000000',
            '1234567');
        assert.equal(a[0], act1, "Did not correctly resolve address on indirect query");
        assert.equal(a[1], act2, "Did not correctly resolve address on indirect query");
    });
});
