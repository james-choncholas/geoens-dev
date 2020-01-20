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

    var emptynode = '0x0000000000000000000000000000000000000000000000000000000000000000';

    let geoResolver;
    before(async () => {
        geoResolver = await GeoENSResolver.deployed();
    });



    it("should set a geohash", async () => {
        //await debug(geoResolver.setGeoAddr(emptynode, 'ezs42bcd', act1, {from: owner_account}));
        await geoResolver.setGeoAddr(emptynode, geo1, act1, {from: owner_account});
    });



    // truncate results file
    fs.writeFileSync("./test/GeoResolver-results/direct_resolve.txt", "Query Time\n");
    for (i = 0; i < 100; i++) {
        it("should resolve a geohash", async () => {
            var t = process.hrtime();
            a = await geoResolver.geoAddr(emptynode, 'ezs42bcd');
            t = process.hrtime(t);

            // write time to file. (Zero pad ns with padStart)
            fs.appendFileSync("./test/GeoResolver-results/direct_resolve.txt", t[0] + "." + String(t[1]).padStart(9, '0') + "\n");

            assert.equal(a[0], act1, "Did not correctly resolve address on direct query");
        });
    }

    // truncate results file
    fs.writeFileSync("./test/GeoResolver-results/20km_resolve.txt", "Query Time\n");
    for (i = 0; i < 100; i++) {
        it("should resolve a 20km radius geohash search", async () => {
            // if using 40 bits of precision total
            // dropping to 10 bits gives a precision of 20km
            var t = process.hrtime();
            a = await geoResolver.geoAddr(emptynode, 'ezs4');
            t = process.hrtime(t);

            // write time to file. (Zero pad ns with padStart)
            fs.appendFileSync("./test/GeoResolver-results/20km_resolve.txt", t[0] + "." + String(t[1]).padStart(9, '0') + "\n");

            assert.equal(a[0], act1, "Did not correctly resolve address on 20km search query");
        });
    }

    // truncate results file
    fs.writeFileSync("./test/GeoResolver-results/630km_resolve.txt", "Query Time\n");
    for (i = 0; i < 100; i++) {
        it("should resolve a 630km radius geohash search", async () => {
            var t = process.hrtime();
            a = await geoResolver.geoAddr(emptynode, 'ez');
            t = process.hrtime(t);

            // write time to file. (Zero pad ns with padStart)
            fs.appendFileSync("./test/GeoResolver-results/630km_resolve.txt", t[0] + "." + String(t[1]).padStart(9, '0') + "\n");

            assert.equal(a[0], act1, "Did not correctly resolve address on 630km search query");
        });
    }
});
