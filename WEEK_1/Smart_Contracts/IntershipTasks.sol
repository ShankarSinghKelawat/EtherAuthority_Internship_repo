// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InternshipTaskTracker {

    enum Status { Pending, InProgress, Completed }

    struct Task {
        uint id;
        string title;
        Status status;
    }

    address public owner;
    uint public taskCount;

    mapping(uint => Task) private tasks;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addTask(string memory _title) public onlyOwner {
        taskCount++;
        tasks[taskCount] = Task(taskCount, _title, Status.Pending);
    }

    function updateTaskStatus(uint _taskId, Status _status) public onlyOwner {
        require(_taskId > 0 && _taskId <= taskCount, "Invalid task ID");
        tasks[_taskId].status = _status;
    }

    function getTask(uint _taskId) public view returns (uint, string memory, string memory) {
        require(_taskId > 0 && _taskId <= taskCount, "Invalid task ID");
        Task memory task = tasks[_taskId];
        string memory statusText;
        if (task.status == Status.Pending) {
            statusText = "pending";
        } else if (task.status == Status.InProgress) {
            statusText = "in-progress";
        } else {
            statusText = "completed";
        }
        return (task.id, task.title, statusText);
    }

}
