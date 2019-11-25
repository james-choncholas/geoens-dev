pragma solidity >=0.4.21 <0.6.0;

contract StringOwnedGeoENSResolver {
    // Other code

    bytes4 constant ERC165ID = 0x01ffc9a7;
    bytes4 constant ERCTBDID = 0xc5505b25;
    uint constant MAX_ADDR_RETURNS = 64;
    uint constant MAX_GEOHASH_PRECISION = 8;
    string constant BASE_32_CHARS = "0123456789bcdefghjkmnpqrstuvwxyz";

    mapping(string=>address) geomap;
    address public owner = msg.sender;

    struct UintReference {
        uint i;
    }

    event AddrChanged(bytes32 indexed node, string geohash, address addr);

    modifier isOwner() {
        require(msg.sender == owner);
        _;
    }

    function probe(address[] memory found, UintReference memory found_i, string memory geohash) internal view {
        if (bytes(geohash).length > MAX_GEOHASH_PRECISION) return;
        if (found_i.i > MAX_ADDR_RETURNS) return;

        if (geomap[geohash] != address(0)) {
            found[found_i.i] = geomap[geohash];
            found_i.i ++;
        }

        for (uint i = 0; i < bytes(BASE_32_CHARS).length; i++) {
            probe(found, found_i, string(abi.encodePacked(geohash, bytes(BASE_32_CHARS)[i])) );
        }
    }

    function geoAddr(bytes32 node, string calldata geohash) external view returns (address[] memory found) {
        bytes32(node); // single node georesolver ignores node

        found = new address[](MAX_ADDR_RETURNS);

        UintReference memory found_i;
        found_i.i = 0;

        probe (found, found_i, geohash);

        return found;
    }

    function setGeoAddr(bytes32 node, string calldata geohash, address addr) external isOwner() {
        // single node georesolver ignores node
        require(bytes(geohash).length <= MAX_GEOHASH_PRECISION);
        if (addr == address(0)) delete geomap[geohash];
        else geomap[geohash] = addr;
        emit AddrChanged(node, geohash, addr);
    }

    function supportsInterface(bytes4 interfaceID) external pure returns (bool) {
        return interfaceID ==  ERC165ID || interfaceID == ERCTBDID;
    }

    function() external payable {
        revert();
    }
}
