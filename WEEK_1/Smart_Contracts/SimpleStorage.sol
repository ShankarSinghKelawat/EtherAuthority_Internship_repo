// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage{
    uint public numvar;

    function set(uint _numVar) public {
        numvar = _numVar;
    }

    function get() public view returns(uint) {
        return numvar;
    }
}