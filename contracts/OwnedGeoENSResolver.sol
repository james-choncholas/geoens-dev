pragma solidity >=0.4.21 <0.6.0;

contract OwnedGeoENSResolver {
    // Other code

    bytes4 constant ERC165ID = 0x01ffc9a7;
    bytes4 constant ERCTBDID = 0xc5505b25;
    uint constant MAX_ADDR_RETURNS = 64;
    mapping(uint64=>address) geomap;
    address public owner = msg.sender;

    event AddrChanged(bytes32 indexed node, uint64 geohash, address addr);

    modifier isOwner() {
        require(msg.sender == owner);
        _;
    }

    function geoAddr(bytes32 node, uint64 geohash, uint64 precisionMask) external view returns (address[] memory ret) {
        bytes32(node); // single node georesolver ignores node

        ret = new address[](MAX_ADDR_RETURNS);
        uint ret_i = 0;

        for(uint64 i=(geohash & precisionMask); i<= geohash + ~precisionMask; i++) {
            if (geomap[i] != address(0)) {
                ret[ret_i] = geomap[i];
                ret_i ++;
            }
            if (ret_i > MAX_ADDR_RETURNS) break;
        }

        return ret;
    }

    function setGeoAddr(bytes32 node, uint64 geohash, address addr) external isOwner() {
        // single node georesolver ignores node
        geomap[geohash] = addr;
        emit AddrChanged(node, geohash, addr);
    }

    function supportsInterface(bytes4 interfaceID) external pure returns (bool) {
        return interfaceID ==  ERC165ID || interfaceID == ERCTBDID;
    }

    function() external payable {
        revert();
    }
}
