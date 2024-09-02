const dripple = artifacts.require("Dripple");

module.exports = function(deployer) {
    deployer.deploy(dripple);
};