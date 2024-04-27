var CopyrightRegistry = artifacts.require("CopyrightRegistry");

module.exports = function(deployer) {
  deployer.deploy(CopyrightRegistry);
};