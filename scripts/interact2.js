const hre = require("hardhat");

async function main() {
    //get accounts list
    const accounts = await hre.ethers.getSigners();
    // // //deploy
    // const Main = await hre.ethers.getContractFactory("Main");
    // const main = await Main.deploy();

    // console.log("main address: ", await main.address);
    //load contract
    const main = await hre.ethers.getContractAt("Main", "0x5FbDB2315678afecb367f032d93F642f64180aa3");

    // const adminAddress = await myContract.admin();
    // // console.log(adminAddress);
    const signers = await hre.ethers.getSigners();
    // await main.connect(signers[0]).createNewSession("Lorem Ipsum", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", ["1"]);
    await main.connect(signers[0]).createNewSession("name5", "5", ["45"]);
    await main.connect(signers[0]).createNewSession("name6", "6", ["45"]);
    await main.connect(signers[0]).createNewSession("name7", "7", ["45"]);
    await main.connect(signers[0]).createNewSession("name8", "8", ["45"]);
    await main.connect(signers[0]).createNewSession("name9", "9", ["45"]);

    // await main.connect(signers[1]).register("Duong1", "Duong1@gmail.com");
    // await main.connect(signers[2]).register("Duong1", "Duong1@gmail.com");
    // await main.connect(signers[3]).register("Duong1", "Duong1@gmail.com");
    // console.log("admin la: ",await main.admin());
    
    const session0Address = await main.sessions(0);
    const session1Address = await main.sessions(1);
    
    // console.log("session0 : ", session0Address);
    
    const session0 = await hre.ethers.getContractAt("Session", session0Address);
    const session1 = await hre.ethers.getContractAt("Session", session1Address);
    // // console.log(" state 0 ",await session0.state());
    // // let participantDeviation1 = await session0.getParticipantDeviation(accounts[1].address);
    // // let participantDeviation2 = await session0.getParticipantDeviation(accounts[2].address);
    // // let participantDeviation3 = await session0.getParticipantDeviation(accounts[3].address);
    // // await session0.closeSession();
    // //propose(address _account, uint256 _price)
    // console.log("Start state",await session0.state());
    // // await session1.connect(signers[1]).propose( hre.ethers.utils.parseEther("2"));
    // // await session1.connect(signers[2]).propose( hre.ethers.utils.parseEther("3"));
    // // await session1.connect(signers[3]).propose( hre.ethers.utils.parseEther("4"));

    // let participantPropose1 = await session0.getParticipantProposedPrice(accounts[1].address);
    // let participantPropose2 = await session0.getParticipantProposedPrice(accounts[2].address);
    // let participantPropose3 = await session0.getParticipantProposedPrice(accounts[3].address);
    // // console.log(participantPropose2.toString());
    // // console.log("BEFORE participation Deviation: ", await participantDeviation1.toString(), await participantDeviation2.toString() , await participantDeviation3.toString());
    // // console.log("sessionParticipants:", await session0.getSessionParticipants());
    // console.log("participation proposed price: ", participantPropose1.toString(),participantPropose2.toString() , participantPropose3.toString());

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });