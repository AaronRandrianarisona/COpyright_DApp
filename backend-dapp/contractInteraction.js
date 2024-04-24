const web3 = require('./web3Setup');

// Adresse et ABI de votre contrat intelligent
const contractAddress = 'CONTRACT_ADDRESS';
const contractAbi = [ /* CONTRACT_ABI */ ];

// Instance du contrat
const contract = new web3.eth.Contract(contractAbi, contractAddress);

// Fonction pour enregistrer une nouvelle œuvre
async function registerWork(title, description) {
    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.registerWork(title, description).send({ from: accounts[0] });
        console.log('Work registered successfully');
        return true;
    } catch (error) {
        console.error('Error registering work:', error);
        return false;
    }
}

// Fonction pour attribuer les droits d'utilisation d'une œuvre à une adresse
async function grantRights(title, userAddress) {
    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.grantRights(title, userAddress).send({ from: accounts[0] });
        console.log('Rights granted successfully');
        return true;
    } catch (error) {
        console.error('Error granting rights:', error);
        return false;
    }
}

// Fonction pour révoquer les droits d'utilisation d'une œuvre à une adresse
async function revokeRights(title, userAddress) {
    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.revokeRights(title, userAddress).send({ from: accounts[0] });
        console.log('Rights revoked successfully');
        return true;
    } catch (error) {
        console.error('Error revoking rights:', error);
        return false;
    }
}

module.exports = { registerWork, grantRights, revokeRights };
