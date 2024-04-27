const HDWalletProvider = require('@truffle/hdwallet-provider');
//const mnemonic = "else identify solid custom glare rack utility debate quiz entry stove unhappy";//utilisation de mnemonic d'un portefeuille existant metamask
const privateKey = "8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63";//utilisation de la clé privé d'un compte metamask


module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    develop: {
      port: 8545
    },
    clique_network: {
      provider: () => new HDWalletProvider(privateKey,"http://127.0.0.1:8545"),
      network_id: "*",      // Match any network id
      gas: 5500000,         // Gas sent with each transaction (default: ~6700000)
      gasPrice: 0,          // Gas price in wei (default: 0)
    }
  },
  compilers: {
  solc: {
    version: "0.8.18", // fetch exact version, default : truffle-version
    }
}
};
