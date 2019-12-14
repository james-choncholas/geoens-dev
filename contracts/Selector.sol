pragma solidity >=0.4.21 <0.6.0;

import "./GeoENSResolver.sol";

contract Selector {
    function calculateSelector() public pure returns (bytes4) {
        GeoENSResolver i;
        return i.setGeoAddr.selector ^ i.geoAddr.selector;
    }
}
