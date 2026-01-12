// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract InternNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;

    constructor() ERC721("Intern Achievement NFT", "IAN")
        Ownable(msg.sender) {
        tokenCounter = 0;
    }

    function mintInternNFT(
        address intern,
        string memory tokenURI
    ) public onlyOwner returns (uint256) {
        require(intern != address(0), "Invalid intern address");

        tokenCounter++;
        _safeMint(intern, tokenCounter);
        _setTokenURI(tokenCounter, tokenURI);

        return tokenCounter;
    }
}
