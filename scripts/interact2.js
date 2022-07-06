const hre = require("hardhat");

async function main() {

    const signers = await hre.ethers.getSigners();
    const main = await hre.ethers.getContractAt("Main", "0x998abeb3E57409262aE5b751f60747921B33613E");


    // const session0Address = await main.sessions(0);

    let sessions = []
    for(let i = 0; i<10; i++) {
        let sessionAddress = await main.sessions(`${i}`);
        let session = await hre.ethers.getContractAt("Session", sessionAddress);
        sessions.push(session)
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });