// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title TaskCompletionToken
 * @dev Implementation of the Task Completion Token (TCT).
 *
 * This contract provides a standard {ERC20} token intended to reward the
 * successful completion of tasks.
 *
 * The token supply is dynamically generated through a controlled minting
 * mechanism, allowing the contract owner (admin) to issue rewards only
 * after task verification.
 *
 * Access control is enforced using {Ownable}, ensuring that only authorized
 * entities can mint new tokens and distribute rewards.
 */
contract TaskCompletionToken is ERC20, Ownable {

    /**
     * @dev Initializes the ERC20 token with a name and symbol.
     *
     * The deployer of the contract is assigned as the initial owner.
     * No tokens are minted during deployment to prevent premature
     * distribution before task validation.
     */
    constructor()
        ERC20("Task Completion Token", "TCT")
        Ownable(msg.sender)
    {}

    /**
     * @dev Mints tokens to an intern upon successful task completion.
     *
     * Requirements:
     * - Caller must be the contract owner.
     *
     * @param intern Address of the intern receiving the reward.
     * @param amount Number of tokens to mint (excluding decimals).
     *
     * Emits a {Transfer} event with `from` set to the zero address.
     */
    function rewardForTask(address intern, uint256 amount)
        external
        onlyOwner
    {
        _mint(intern, amount * 10 ** decimals());
    }
}
