// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Ownable{
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are NOT the owner");
        _;
    }

    function setOwner(address _newOwner) external onlyOwner {
        require(_newOwner != address(0), "Invalid Address");
        owner = _newOwner;
    }

    function ownerFunc() external onlyOwner {
        // Only allows owner to call this function
    } 

    function anyoneFunc() external {
        // anyone can call this function
    }
}