
const hre = require("hardhat");

async function main() {
    //get accounts list
    const accounts = await hre.ethers.getSigners();
    //deploy
    const Main = await hre.ethers.getContractFactory("Main");
    const main = await Main.deploy();
    await main.deployed();
    console.log("Main add: ", main.address);
    //load contract
    // const myContract = await hre.ethers.getContractAt("Main", main.address);

    // const adminAddress = await myContract.admin();
    // console.log(adminAddress);

    await main.createNewSession("1", "1", ["1"]);
    await main.register(accounts[1].address, "Duong1", "Duong1@gmail.com");
    await main.register(accounts[2].address, "Duong2", "Duong2@gmail.com");
    await main.register(accounts[3].address, "Duong3", "Duong3@gmail.com");


    const session0Address = await main.sessions(0);

    console.log("session0 : ", session0Address);

    const session0 = await hre.ethers.getContractAt("Session", session0Address);
    let participantDeviation1 = await session0.getParticipantDeviation(accounts[1].address);
    let participantDeviation2 = await session0.getParticipantDeviation(accounts[2].address);
    let participantDeviation3 = await session0.getParticipantDeviation(accounts[3].address);
    //propose(address _account, uint256 _price)
    await session0.propose(accounts[1].address, hre.ethers.utils.parseEther("1"));
    await session0.propose(accounts[2].address, hre.ethers.utils.parseEther("2"));
    await session0.propose(accounts[3].address, hre.ethers.utils.parseEther("5"));
    let participantPropose1 = await session0.getParticipantProposedPrice(accounts[1].address);
    let participantPropose2 = await session0.getParticipantProposedPrice(accounts[2].address);
    let participantPropose3 = await session0.getParticipantProposedPrice(accounts[3].address);

    console.log("participation Deviation: ", await participantDeviation1.toString(), await participantDeviation2.toString() , await participantDeviation3.toString());
    console.log("sessionParticipants:", await session0.getSessionParticipants());
    console.log("participation proposed price: ", participantPropose1.toString(),participantPropose2.toString() , participantPropose3.toString());
    await session0.calculateProposedPrice();
    let proposedPrice = await session0.proposedPrice();

    console.log("before closing proposed price: ",proposedPrice.toString());
    let finalPrice = await session0.finalPrice();
    console.log("before closing final price: ", finalPrice.toString());
    await session0.afterClosingSession(proposedPrice);
    finalPrice  = await session0.finalPrice();
    console.log("after closing proposed price: ", finalPrice.toString());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });