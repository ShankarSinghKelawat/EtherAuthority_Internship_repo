// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleVoting {

    address public admin;

    struct Candidate {
        string name;
        uint voteCount;
    }

    Candidate[] public candidates;
    mapping(address => bool) public hasVoted;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin allowed");
        _;
    }

    function addCandidate(string memory _name) public onlyAdmin {
        candidates.push(Candidate(_name, 0));
    }

    function CandidatesList() public view returns (string[] memory) {
        string[] memory names = new string[](candidates.length);
        for (uint i = 0; i < candidates.length; i++) {
            names[i] = candidates[i].name;
        }
        return names;
    }

    function vote(uint _candidateIndex) public {
        require(!hasVoted[msg.sender], "You already voted");
        require(_candidateIndex < candidates.length, "Invalid candidate");

        hasVoted[msg.sender] = true;
        candidates[_candidateIndex].voteCount += 1;
    }

    function getResults() public view returns (string memory winnerName) {
        require(candidates.length > 0, "No candidates available");
        uint winningVoteCount = 0;
        uint winningIndex = 0;

        for (uint i = 0; i < candidates.length; i++) {
        if (candidates[i].voteCount > winningVoteCount) {
            winningVoteCount = candidates[i].voteCount;
            winningIndex = i;
        }
        }
        winnerName = candidates[winningIndex].name;
    }

}
