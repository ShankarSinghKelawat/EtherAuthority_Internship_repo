// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EtherTransfer{
    constructor() payable {}

    receive() external payable { }

    function sendViaCall(address payable _to) public payable {
        (bool sent, ) = _to.call{value: msg.value}("");
        require(sent, "Ether Transfer Failed");
    }
}

contract EtherReceiver {
    event Log(uint amount, uint gas);

    receive() external payable { 
        emit Log(msg.value, gasleft());
    }
}