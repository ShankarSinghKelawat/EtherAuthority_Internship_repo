// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title InternRewardToken
 * @dev Implementation of the Intern Reward Token (IRT).
 *
 * This contract defines a standard {ERC20} token used to reward interns.
 *
 * Only the contract owner (typically the organization or admin)
 * is permitted to mint new tokens.
 *
 * The contract follows OpenZeppelin best practices by leveraging audited
 * implementations of {ERC20} and {Ownable} to ensure security and
 * predictable behavior.
 */
contract InternRewardToken is ERC20, Ownable {

    /**
     * @dev Initializes the ERC20 token with a name and symbol.
     *
     * An initial supply is minted to the deployer of the contract,
     * who is also assigned as the initial owner. This allows the
     * administrator to distribute rewards immediately if required.
     */
    constructor()
        ERC20("Intern Reward Token", "IRT")
        Ownable(msg.sender)
    {
        _mint(msg.sender, 100* 10 ** decimals());
    }

    /**
     * @dev Mints reward tokens to a specified intern address.
     *
     * This function is intended to be called after verifying an intern’s
     * performance or contribution off-chain.
     *
     * Requirements:
     * - Caller must be the contract owner.
     *
     * @param intern Address of the intern receiving the reward.
     * @param amount Number of tokens to mint (excluding decimals).
     *
     * Emits a {Transfer} event with `from` set to the zero address.
     */
    function rewardIntern(address intern, uint256 amount)
        external
        onlyOwner
    {
        _mint(intern, amount * 10 ** decimals());
    }
}
