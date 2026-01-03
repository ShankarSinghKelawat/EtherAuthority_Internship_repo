// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EtherAccOwner {
    address payable public owner;

    constructor() {
        owner = payable(msg.sender);
    }

    receive() external payable {}

    function withdraw(uint256 _amount) external {
        require(msg.sender == owner, "caller is not owner");
        require(address(this).balance >= _amount, "Insufficient balance");

        (bool sent,) = owner.call{value: _amount}("");
        require(sent, "Failed to send Ether");
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
