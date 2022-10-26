
const hre = require("hardhat");
const fs = require('fs-extra')
// const {run, network} = require("hardhat")
const contractAddresses = require("../contractAddresses.json")

let isDone = false;

async function main() {

  const Main = await hre.ethers.getContractFactory("Main");
  const main = await Main.deploy();

  await main.deployed();
  console.log("Main deployed to:", main.address);

}


main()
  .then(() => {
    let exitInterval = setInterval(() => {
      if (isDone) {
        clearInterval(exitInterval);
        process.exit(0)
      }
    }, 1000);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
