const Web3 = require('web3');

// URL du nœud Ethereum (par exemple, Infura)
const ethereumUrl = 'YOUR_ETHEREUM_NODE_URL';

// Initialisation de Web3 avec le fournisseur Ethereum
const web3 = new Web3(ethereumUrl);

module.exports = web3;
