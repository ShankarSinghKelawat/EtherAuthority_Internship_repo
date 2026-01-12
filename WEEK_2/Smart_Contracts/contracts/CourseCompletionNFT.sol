// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title CourseCompletionNFT
 * @dev ERC721 NFT representing completion of a course.
 *
 * Each NFT is issued to a user upon completing a specific course.
 * A user can receive only one NFT per course.
 *
 * Minting is restricted to the contract owner (admin).
 */
contract CourseCompletionNFT is ERC721, Ownable {

    /// @dev Counter used to generate unique token IDs
    uint256 private _tokenIdCounter;

    /**
     * @dev Tracks whether a user has completed a specific course.
     * user address => courseId => completed or not
     */
    mapping(address => mapping(uint256 => bool)) public courseCompleted;

    /// @dev Base URI for token metadata
    string private _baseTokenURI;

    /**
     * @dev Initializes the ERC721 token with name and symbol.
     *
     * @param baseURI Base URI for metadata (e.g., IPFS folder)
     */
    constructor(string memory baseURI)
        ERC721("Course Completion NFT", "CCNFT")
        Ownable(msg.sender)
    {
        _baseTokenURI = baseURI;
    }

    /**
     * @dev Issues a Course Completion NFT to a user.
     *
     * Requirements:
     * - Caller must be the contract owner.
     * - User must not have already completed the given course.
     *
     * @param user Address receiving the NFT.
     * @param courseId Unique identifier of the completed course.
     */
    function issueCourseCertificate(
        address user,
        uint256 courseId
    )
        external
        onlyOwner
    {
        require(!courseCompleted[user][courseId], "Course already completed");

        _tokenIdCounter++;
        uint256 tokenId = _tokenIdCounter;

        courseCompleted[user][courseId] = true;
        _safeMint(user, tokenId);
    }

    /**
     * @dev Returns the base URI used to compute tokenURI.
     *
     * @return Base metadata URI as a string.
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
