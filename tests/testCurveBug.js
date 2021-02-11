require('dotenv').config();
const hre = require("hardhat");


describe("Test Curve Bug", function() {
  it(`Replicates a confusing problem with Curve`, async function() {
    await hre.network.provider.request({
      method: "hardhat_reset",
      params: [{
        forking: {
          jsonRpcUrl: process.env.ARCHIVE_NODE_API,
          blockNumber: 10633644
        }
      }]
    })
    await hre.network.provider.request({
      method: "evm_setNextBlockTimestamp",
      params: [1597082285]}
    );
    

    // Deploy test contract
    const TestCurveBug = await hre.ethers.getContractFactory(
      "contracts/TestCurveBug.sol:TestCurveBug",
    );
    const contract = await TestCurveBug.deploy();
    await contract.deployed();

    // Run
    await contract.test();
  });
});
