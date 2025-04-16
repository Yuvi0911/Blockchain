// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract UVNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    mapping(uint256 => string) private _tokenURIs;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    function mint(address to, string memory tokenURI) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }

    function _setTokenURI(uint256 tokenId, string memory tokenURI) internal {
        _tokenURIs[tokenId] = tokenURI;
    }

    function tokenUri(uint256 tokenId) public view returns (string memory){
        return _tokenURIs[tokenId];
    }

    function transferNFT(address from, address to, uint256 tokenId) public {
        require(ownerOf(tokenId) == from, "You are not the owner of this NFT");

        _transfer(from, to, tokenId);
    }
}