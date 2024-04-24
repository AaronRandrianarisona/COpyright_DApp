// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CopyrightRegistry {
    // Structure pour représenter une œuvre
    struct Work {
        address owner; // Adresse du propriétaire de l'œuvre
        string title; // Titre de l'œuvre
        string description; // Description de l'œuvre
        mapping(address => bool) rights; // Liste des adresses avec les droits d'utilisation
    }
    
    // Mapping pour stocker les œuvres enregistrées
    mapping(string => Work) public works;

    // Fonction pour enregistrer une nouvelle œuvre
    function registerWork(string memory _title, string memory _description) public {
        require(works[_title].owner == address(0), "Work already registered");
        works[_title] = Work(msg.sender, _title, _description);
    }

    // Fonction pour attribuer les droits d'utilisation d'une œuvre à une adresse
    function grantRights(string memory _title, address _user) public {
        require(works[_title].owner == msg.sender, "Only owner can grant rights");
        works[_title].rights[_user] = true;
    }

    // Fonction pour révoquer les droits d'utilisation d'une œuvre à une adresse
    function revokeRights(string memory _title, address _user) public {
        require(works[_title].owner == msg.sender, "Only owner can revoke rights");
        works[_title].rights[_user] = false;
    }
}
