// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CopyrightRegistry {
    struct Work {
        address owner;
        string title;
        string description;
    }

    mapping(string => Work) public works;
    mapping(string => mapping(address => bool)) public rights;

    function registerWork(string memory _title, string memory _description) public {
        require(works[_title].owner == address(0), "Work already registered");
        works[_title] = Work(msg.sender, _title, _description);
    }

    function grantRights(string memory _title, address _user) public {
        require(works[_title].owner == msg.sender, "Only owner can grant rights");
        rights[_title][_user] = true;
    }

    function revokeRights(string memory _title, address _user) public {
        require(works[_title].owner == msg.sender, "Only owner can revoke rights");
        rights[_title][_user] = false;
    }
}
