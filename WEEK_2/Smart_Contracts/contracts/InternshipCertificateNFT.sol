// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title InternshipCertificateNFT
 * @dev ERC721 token representing an internship completion certificate.
 *
 * Each NFT is uniquely issued to an intern upon successful completion
 * of an internship program. Certificates are minted only once per intern
 * and act as permanent, verifiable proof of completion.
 *
 * Minting authority is restricted to the contract owner (admin).
 */
contract InternshipCertificateNFT is ERC721, Ownable {

    /// @dev Counter for token IDs
    uint256 private _tokenIdCounter;

    /// @dev Tracks whether an intern has already received a certificate
    mapping(address => bool) public certificateIssued;

    /// @dev Base URI for token metadata
    string private _baseTokenURI;

    /**
     * @dev Initializes the ERC721 token with name and symbol.
     *
     * @param baseURI Base URI for NFT metadata (e.g., IPFS folder URL)
     */
    constructor(string memory baseURI)
        ERC721("Internship Certificate NFT", "ICNFT")
        Ownable(msg.sender)
    {
        _baseTokenURI = baseURI;
    }

    /**
     * @dev Issues an internship certificate NFT to an intern.
     *
     * Requirements:
     * - Caller must be the contract owner.
     * - Intern must not already have a certificate.
     *
     * @param intern Address of the intern receiving the certificate.
     */
    function issueCertificate(address intern)
        external
        onlyOwner
    {
        require(!certificateIssued[intern], "Certificate already issued");

        _tokenIdCounter++;
        uint256 tokenId = _tokenIdCounter;

        certificateIssued[intern] = true;
        _safeMint(intern, tokenId);
    }

    /**
     * @dev Returns the base URI for computing {tokenURI}.
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
