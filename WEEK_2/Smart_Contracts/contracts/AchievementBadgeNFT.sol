// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title AchievementBadgeNFT
 * @dev ERC721 NFT representing achievement badges.
 *
 * Each badge represents a specific achievement such as
 * "1: Top Performer", "2: Early Submission", or "3: Outstanding Contribution, 4: Overall Good".
 *
 * A user can receive a specific badge only once.
 * Minting authority is restricted to the contract owner (admin).
 */
contract AchievementBadgeNFT is ERC721, Ownable {

    /// @dev Counter used to generate unique token IDs
    uint256 private _tokenIdCounter;

    /**
     * @dev Tracks whether a user has already received a specific badge.
     * user address => badgeId => awarded or not
     */
    mapping(address => mapping(uint256 => bool)) public badgeAwarded;

    /// @dev Base URI for token metadata
    string private _baseTokenURI;

    /**
     * @dev Initializes the ERC721 token with name and symbol.
     *
     * @param baseURI Base URI for NFT metadata (e.g., IPFS folder URL)
     */
    constructor(string memory baseURI)
        ERC721("Achievement Badge NFT", "ABNFT")
        Ownable(msg.sender)
    {
        _baseTokenURI = baseURI;
    }

    /**
     * @dev Awards an achievement badge NFT to a user.
     *
     * Requirements:
     * - Caller must be the contract owner.
     * - The user must not already have the given badge.
     *
     * @param user Address receiving the badge NFT.
     * @param badgeId Unique identifier representing the achievement.
     */
    function awardBadge(
        address user,
        uint256 badgeId
    )
        external
        onlyOwner
    {
        require(!badgeAwarded[user][badgeId], "Badge already awarded");

        _tokenIdCounter++;
        uint256 tokenId = _tokenIdCounter;

        badgeAwarded[user][badgeId] = true;
        _safeMint(user, tokenId);
    }

    /**
     * @dev Returns the base URI used to compute tokenURI.
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
