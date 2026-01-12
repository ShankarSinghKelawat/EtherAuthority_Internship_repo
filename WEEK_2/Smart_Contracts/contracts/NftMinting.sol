// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title NFTMintingContract
 * @dev Generic ERC721 NFT minting contract.
 *
 * This contract allows the owner (admin) to mint NFTs
 * and assign them to users. Each NFT has a unique token ID
 * and metadata defined via a base URI.
 */
contract NFTMintingContract is ERC721, Ownable {

    /// @dev Counter for generating unique token IDs
    uint256 private _tokenIdCounter;

    /// @dev Base URI for NFT metadata
    string private _baseTokenURI;

    /**
     * @dev Initializes the NFT contract.
     *
     * @param baseURI Base URI for metadata (e.g., IPFS folder)
     */
    constructor(
        string memory baseURI
    )
        ERC721("Custom NFT", "CNFT")
        Ownable(msg.sender)
    {
        _baseTokenURI = baseURI;
    }

    /**
     * @dev Mints a new NFT to a specified address.
     *
     * Requirements:
     * - Caller must be the contract owner.
     *
     * @param to Address that will receive the NFT.
     *
     * @return tokenId The ID of the newly minted NFT.
     */
    function mintNFT(address to)
        external
        onlyOwner
        returns (uint256 tokenId)
    {
        _tokenIdCounter++;
        tokenId = _tokenIdCounter;

        _safeMint(to, tokenId);
    }

    /**
     * @dev Returns the base URI used to compute {tokenURI}.
     *
     * @return Base metadata URI.
     */
    function _baseURI()
        internal
        view
        override
        returns (string memory)
    {
        return _baseTokenURI;
    }
}
