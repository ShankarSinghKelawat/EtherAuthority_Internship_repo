// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title AttendanceToken
 * @dev Implementation of an ERC20 token used to reward attendance.
 *
 * Tokens are minted to interns based on verified attendance records.
 * Each intern can be rewarded only once per attendance session.
 *
 * Attendance verification is assumed to occur off-chain.
 */
contract AttendanceToken is ERC20, Ownable {

    /**
     * @dev Tracks whether an intern has already been rewarded
     * for a specific attendance session.
     *
     * intern address => sessionId => rewarded or not
     */
    mapping(address => mapping(uint256 => bool)) public attendanceMarked;

    /**
     * @dev Initializes the ERC20 token with name and symbol.
     * No initial supply is minted at deployment.
     */
    constructor()
        ERC20("Attendance Token", "ADT")
        Ownable(msg.sender)
    {}

    /**
     * @dev Rewards an intern for attending a specific session.
     *
     * Requirements:
     * - Caller must be the contract owner.
     * - Attendance for the given session must not be already rewarded.
     *
     * @param intern Address of the intern.
     * @param onDay Unique identifier for the attendance session (e.g., day of week or meeting).
     * @param amount Number of tokens to mint (excluding decimals).
     *
     * Emits a {Transfer} event with `from` set to the zero address.
     */
    function grantAttendance(
        address intern,
        uint256 onDay,
        uint256 amount
    )
        external
        onlyOwner
    {
        require(!attendanceMarked[intern][onDay], "Attendance already rewarded");

        attendanceMarked[intern][onDay] = true;
        _mint(intern, amount * 10 ** decimals());
    }
}
