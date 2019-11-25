pragma solidity >=0.4.21 <0.6.0;

import "./OwnedGeoENSResolver.sol";

contract Selector {
    function calculateSelector() public pure returns (bytes4) {
        OwnedGeoENSResolver i;
        return i.setGeoAddr.selector ^ i.geoAddr.selector;
    }
}
