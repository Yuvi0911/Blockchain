// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";

contract NFT is ERC721URIStorage, ERC721Burnable, Pausable, Ownable, ERC2981 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    // Optional base URI
    string private _baseTokenURI;

    constructor(
        string memory name_,
        string memory symbol_,
        string memory baseURI_,
        address royaltyReceiver,
        uint96 royaltyFee // 100 = 1%, 1000 = 10%
    ) ERC721(name_, symbol_) {
        _baseTokenURI = baseURI_;
        _setDefaultRoyalty(royaltyReceiver, royaltyFee);
    }

    // Public mint function (onlyOwner by default)
    function safeMint(address to, string memory uri) public onlyOwner whenNotPaused {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // Optional: base URI override
    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    // Pause and unpause
    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    // Set new base URI
    function setBaseURI(string memory newBaseURI) public onlyOwner {
        _baseTokenURI = newBaseURI;
    }

    // Set new default royalty
    function setDefaultRoyalty(address receiver, uint96 feeNumerator) public onlyOwner {
        _setDefaultRoyalty(receiver, feeNumerator);
    }

    // Override required by Solidity
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage, ERC2981) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }


}
