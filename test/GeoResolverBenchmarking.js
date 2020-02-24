const GeoENSResolver = artifacts.require("GeoENSResolver");
const Selector = artifacts.require("Selector");
const fs = require('fs');
const util = require('util');

const num_requests = 5
const test_interval_min = 125
const num_tests = 12

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// WARNING: This is for basic benchmarking - for real results use geoens-bridge

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
    it("should benchmark direct query resolution time", async () => {
        fs.writeFileSync("./test/GeoResolver-results/direct_resolve_cold.csv", "query_time\n");
        fs.writeFileSync("./test/GeoResolver-results/direct_resolve_warm.csv", "query_time\n");
        for (nt = 0; nt<num_tests; nt++) {

            for (nr=0; nr<num_requests; nr++) {
                var t = process.hrtime();
                a = await geoResolver.geoAddr(emptynode, 'ezs42bcd');
                t = process.hrtime(t);
                var stringtime = t[0] + "." + String(t[1]).padStart(9, '0') + "\n";

                // write time to file. (Zero pad ns with padStart)
                if (nr == 0) {
                    console.log("Cold: ");
                    fs.appendFileSync("./test/GeoResolver-results/direct_resolve_cold.csv", stringtime);
                } else {
                    console.log("Warm: ");
                    fs.appendFileSync("./test/GeoResolver-results/direct_resolve_warm.csv", stringtime);
                }
                console.log(stringtime)

                assert.equal(a[0], act1, "Did not correctly resolve address on direct query");
            }
            await sleep(test_interval_min * 60 * 1000);
        }
    });

    // larger query bounding box tests below

    //// truncate results file
    //fs.writeFileSync("./test/GeoResolver-results/20km_resolve.txt", "Query Time\n");
    //for (i = 0; i < 100; i++) {
    //    it("should resolve a 20km radius geohash search", async () => {
    //        // if using 40 bits of precision total
    //        // dropping to 10 bits gives a precision of 20km
    //        var t = process.hrtime();
    //        a = await geoResolver.geoAddr(emptynode, 'ezs4');
    //        t = process.hrtime(t);

    //        // write time to file. (Zero pad ns with padStart)
    //        fs.appendFileSync("./test/GeoResolver-results/20km_resolve.txt", t[0] + "." + String(t[1]).padStart(9, '0') + "\n");

    //        assert.equal(a[0], act1, "Did not correctly resolve address on 20km search query");
    //    });
    //}

    //// truncate results file
    //fs.writeFileSync("./test/GeoResolver-results/630km_resolve.txt", "Query Time\n");
    //for (i = 0; i < 100; i++) {
    //    it("should resolve a 630km radius geohash search", async () => {
    //        var t = process.hrtime();
    //        a = await geoResolver.geoAddr(emptynode, 'ez');
    //        t = process.hrtime(t);

    //        // write time to file. (Zero pad ns with padStart)
    //        fs.appendFileSync("./test/GeoResolver-results/630km_resolve.txt", t[0] + "." + String(t[1]).padStart(9, '0') + "\n");

    //        assert.equal(a[0], act1, "Did not correctly resolve address on 630km search query");
    //    });
    //}
});
