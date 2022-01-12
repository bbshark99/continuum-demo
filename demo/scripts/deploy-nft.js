const hre = require("hardhat");

async function main() {
  // We get the contract to deploy
  const ContinuumToken = await hre.ethers.getContractFactory("ContinuumToken");
  const continuumToken = await ContinuumToken.deploy();

  await continuumToken.deployed();

  console.log("ContinuumToken deployed to:", continuumToken.address);
  console.log(
    `npx hardhat verify --contract contracts/ContinuumToken.sol:ContinuumToken ${continuumToken.address} --network rinkeby`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
