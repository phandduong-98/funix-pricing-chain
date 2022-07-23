const { hardhatArguments } = require("hardhat");

require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html

const accounts = process.env.accounts;

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: hardhat,
  solidity: {
    version: "0.8.4",
  },
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 1337
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/55867bd197074467b5c7693ab56c398c",
      accounts : accounts
    }
  },
  etherscan: {
    apiKey: "ZG81XME4G34VECK2NG7QE6G7TK7YTQQKYM"
  }
};
