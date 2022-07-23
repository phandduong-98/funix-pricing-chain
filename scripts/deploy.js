
const hre = require("hardhat");
const fs = require('fs-extra')

const contractAddresses = require("../contractAddresses.json")

let isDone = false;

async function main() {

  const Main = await hre.ethers.getContractFactory("Main");
  const main = await Main.deploy();

  await main.deployed();
  console.log("Main deployed to:", main.address);


  console.log(contractAddresses);

  fs.writeJSON("contractAddresses.json", {"MAIN_CONTRACT_ADDRESS": main.address}, (err) => {
    isDone = true;
    if (err) return console.log(err);
    console.log(JSON.stringify(contractAddresses));
    console.log('writing to ' + contractAddresses.json);
  });

  console.log("waited");
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
