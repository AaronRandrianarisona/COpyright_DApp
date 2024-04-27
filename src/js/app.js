App = {
  web3Provider: null,
  contracts: {},

  init: async function () {
    return await App.initWeb3();
  },

  initWeb3: async function () {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
    }
    web3 = new Web3(App.web3Provider);
    return App.initContract();
  },

  initContract: function () {
    $.getJSON('CopyrightRegistry.json', function (data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      var CopyrightRegistryArtifact = data;
      App.contracts.CopyrightRegistry = TruffleContract(CopyrightRegistryArtifact);

      // Set the provider for our contract
      App.contracts.CopyrightRegistry.setProvider(App.web3Provider);
    });
    return App.bindEvents();
  },

  bindEvents: function () {
    $(document).on('click', '.btn-register', App.registerWork);
    $(document).on('click', '.btn-grant', App.grantRights);
    $(document).on('click', '.btn-revoke', App.revokeRights);
  },

  registerWork: function(title,description) {
    var copyrightRegistryInstance;

    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.CopyrightRegistry.deployed().then(function (instance) {
        copyrightRegistryInstance = instance;

        return copyrightRegistryInstance.registerWork(title, description,{ from: account });
      }).then(function (result) {
        console.log('Work registered successfully');
        return true;
      }).catch(function (err) {
        console.error('Error registering work:', err.message);
        return false;
      });
    });
  },

  grantRights: function(title, userAddress) {
    var copyrightRegistryInstance;

    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.CopyrightRegistry.deployed().then(function (instance) {
        copyrightRegistryInstance = instance;

        return copyrightRegistryInstance.grantRights(title, userAddress,{ from: account });
      }).then(function (result) {
        console.log('Rights granted successfully');
        return true;
      }).catch(function (err) {
        console.error('Error granting rights:', err.message);
        return false
      });
    });
  },

  revokeRights: function(title, userAddress) {
    var copyrightRegistryInstance;

    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.CopyrightRegistry.deployed().then(function (instance) {
        copyrightRegistryInstance = instance;

        return copyrightRegistryInstance.revokeRights(title, userAddress,{ from: account });
      }).then(function (result) {
        console.log('Rights revoked successfully');
        return true;
      }).catch(function (err) {
        console.error('Error revoking rights:', err.message);
        return false;
      });
    });
  },

};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
