// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentRegistration {
    struct Student {
        string name;
        uint age;
        bool isGraduated;
    }

    Student[] private students;

    function addStudent(string memory _name, uint _age, bool _isGraduated) public {
        students.push(Student(_name, _age, _isGraduated));
    }

    function getStudentCount() public view returns (uint) {
    return students.length;
    }

    function getStudentlist() public view returns (Student[] memory) {
        return students;
    }

}