require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");

const infuraProjectId = process.env.INFURA_PROJECT_ID || "";
const accounts =
  process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [];

module.exports = {
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY || "ETHERSCAN_API_KEY",
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${infuraProjectId}`,
      accounts,
      chainId: 4,
      gas: "auto",
      gasPrice: "auto",
    },
  },
};
