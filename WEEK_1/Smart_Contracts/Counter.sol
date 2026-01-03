// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract Counter{
    uint public count = 0;

    function incCount() public {
        count+= 1;
    }

    function decCount() public {
        count--;
    }
}