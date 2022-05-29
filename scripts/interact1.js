const hre = require("hardhat");

async function main() {
    //get accounts list
    const accounts = await hre.ethers.getSigners();
    // //deploy
    const Main = await hre.ethers.getContractFactory("Main");
    const main = await Main.deploy();

    console.log("main address: ", await main.address);
    //load contract
    // const main = await hre.ethers.getContractAt("Main", "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9");

    // const adminAddress = await myContract.admin();
    // console.log(adminAddress);
    const signers = await hre.ethers.getSigners();
    await main.connect(signers[0]).createNewSession("Lorem Ipsum", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", ["1"]);
    await main.connect(signers[0]).createNewSession("name2", "2", ["2"]);

    await main.connect(signers[1]).register("Duong1", "Duong1@gmail.com");
    await main.connect(signers[2]).register("Duong1", "Duong1@gmail.com");
    await main.connect(signers[3]).register("Duong1", "Duong1@gmail.com");

    
    const session0Address = await main.sessions(0);
    const session1Address = await main.sessions(1);
    
    // console.log("session0 : ", session0Address);
    
    const session0 = await hre.ethers.getContractAt("Session", session0Address);
    const session1 = await hre.ethers.getContractAt("Session", session1Address);
    // console.log(" state 0 ",await session0.state());
    // let participantDeviation1 = await session0.getParticipantDeviation(accounts[1].address);
    // let participantDeviation2 = await session0.getParticipantDeviation(accounts[2].address);
    // let participantDeviation3 = await session0.getParticipantDeviation(accounts[3].address);
    await session0.closeSession();
    //propose(address _account, uint256 _price)
    console.log("Start state",await session0.state());
    await session1.connect(signers[1]).propose( hre.ethers.utils.parseEther("2"));
    await session1.connect(signers[2]).propose( hre.ethers.utils.parseEther("3"));
    await session1.connect(signers[3]).propose( hre.ethers.utils.parseEther("4"));

    let participantPropose1 = await session0.getParticipantProposedPrice(accounts[1].address);
    let participantPropose2 = await session0.getParticipantProposedPrice(accounts[2].address);
    let participantPropose3 = await session0.getParticipantProposedPrice(accounts[3].address);
    // console.log(participantPropose2.toString());
    // console.log("BEFORE participation Deviation: ", await participantDeviation1.toString(), await participantDeviation2.toString() , await participantDeviation3.toString());
    // console.log("sessionParticipants:", await session0.getSessionParticipants());
    console.log("participation proposed price: ", participantPropose1.toString(),participantPropose2.toString() , participantPropose3.toString());
    // await session0.calculateProposedPrice();
    // let proposedPrice = await session0.proposedPrice();

    // console.log("before closing proposed price: ",proposedPrice.toString());
    // let finalPrice  = await session0.getFinalPrice();
    // console.log("before closing final price: ", finalPrice.toString());

    // // close session
    // await session0.closeSession();
    // console.log(await session0.state());
    // await session0.afterClosingSession(proposedPrice);
    // console.log("Current state: ", await session0.state())
    // finalPrice  = await session0.getFinalPrice();
    // console.log("after closing proposed price: ", finalPrice.toString());
    // console.log("Final state: ", await session0.state())
    
    // console.log("Getting session ... \n");
    // console.log("Session list: ",await main.getSessions());
    // console.log("Participant list: ",await main.getParticipants());

    // await main.updateSessionDetail(session0Address, "change1", "changeDescription1", ["change1 1 1 1"]);
    // let session0Detail = await session0.getSessionDetail();
    // console.log("Session detail after change: ", session0Detail);
    // await main.updateSessionDetail(session1Address, "change2", "changeDescription2", ["change2 2 2 2"]);
    // let session1Detail = await session1.getSessionDetail();
    // console.log("Session detail after change: ", session1Detail);
    // await main.connect(signers[2]).updateParticipantDetail("changed Duong2", "changed Duong2@gmail.com");
    // console.log("Participant list: ",await main.getParticipants());
    // let signer2Proposed = await session0.connect(signers[2]).getParticipantProposedPrice(signers[2].address);
    // console.log(signer2Proposed);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });