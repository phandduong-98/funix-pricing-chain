const hre = require("hardhat");

async function main() {

    const signers = await hre.ethers.getSigners();
    const main = await hre.ethers.getContractAt("Main", "0x8ac5eE52F70AE01dB914bE459D8B3d50126fd6aE");


    // const session0Address = await main.sessions(0);

    let sessions = []
    for(let i = 0; i<10; i++) {
        let sessionAddress = await main.sessions(`${i}`);
        let session = await hre.ethers.getContractAt("Session", sessionAddress);
        sessions.push(session)
    }

    // await sessions[0].connect(signers[1]).propose(hre.ethers.utils.parseEther("1000"))
    // await sessions[0].connect(signers[2]).propose(hre.ethers.utils.parseEther("100"))
    // await sessions[0].connect(signers[0]).closeSession()
    // await sessions[0].connect(signers[0]).afterClosingSession(hre.ethers.utils.parseEther("0.01"))
    // let propose01 = await sessions[0].connect(signers[1]).getParticipantProposedPrice(signers[1].address)
    // let propose02 = await sessions[0].connect(signers[2]).getParticipantProposedPrice(signers[2].address)
    // console.log("proposes0", propose01.toString(), propose02.toString())
    // let deviation01 = await main.connect(signers[1]).getParticipantDeviation(signers[1].address)
    // let deviation02 = await main.connect(signers[1]).getParticipantDeviation(signers[2].address)
    // console.log("deviation0", deviation01.toString(), deviation02.toString())


    // await session1.connect(signers[1]).propose(hre.ethers.utils.parseEther("1000"))
    // await session1.connect(signers[2]).propose(hre.ethers.utils.parseEther("100"))
    // await session1.connect(signers[0]).closeSession()
    // await session1.connect(signers[0]).afterClosingSession(hre.ethers.utils.parseEther("0.1"))
    // let propose11 = await session0.connect(signers[1]).getParticipantProposedPrice(signers[1].address)
    // let propose12 = await session0.connect(signers[2]).getParticipantProposedPrice(signers[2].address)
    // console.log("proposes0", propose11.toString(), propose12.toString())
    // let deviation11 = await main.connect(signers[1]).getParticipantDeviation(signers[1].address)
    // let deviation12 = await main.connect(signers[1]).getParticipantDeviation(signers[2].address)
    // console.log("deviation1", deviation11.toString(), deviation12.toString())


    // await session3.connect(signers[1]).propose(hre.ethers.utils.parseEther("1"))
    // await session3.connect(signers[2]).propose(hre.ethers.utils.parseEther("1"))
    // await session3.connect(signers[0]).closeSession()
    // await session3.connect(signers[0]).afterClosingSession(hre.ethers.utils.parseEther("1"))
    // let propose31 = await session3.connect(signers[1]).getParticipantProposedPrice(signers[1].address)
    // let propose32 = await session3.connect(signers[2]).getParticipantProposedPrice(signers[2].address)
    // console.log("proposes0", propose31.toString(), propose32.toString())
    // let deviation31 = await main.connect(signers[1]).getParticipantDeviation(signers[1].address)
    // let deviation32 = await main.connect(signers[1]).getParticipantDeviation(signers[2].address)
    // console.log("deviation1", deviation31.toString(), deviation32.toString())

    await sessions[7].connect(signers[1]).propose(hre.ethers.utils.parseEther("1"))
    await sessions[7].connect(signers[2]).propose(hre.ethers.utils.parseEther("2"))
    await sessions[7].connect(signers[3]).propose(hre.ethers.utils.parseEther("9"))
    await sessions[7].connect(signers[0]).closeSession()
    await sessions[7].connect(signers[0]).afterClosingSession(hre.ethers.utils.parseEther("10"))
    let propose41 = await sessions[7].connect(signers[1]).getParticipantProposedPrice(signers[1].address)
    let propose42 = await sessions[7].connect(signers[2]).getParticipantProposedPrice(signers[2].address)
    let propose43 = await sessions[7].connect(signers[3]).getParticipantProposedPrice(signers[3].address)
    console.log("proposes0", propose41.toString(), propose42.toString(),propose43.toString())
    let deviation41 = await main.connect(signers[1]).getParticipantDeviation(signers[1].address)
    let deviation42 = await main.connect(signers[2]).getParticipantDeviation(signers[2].address)
    let deviation43 = await main.connect(signers[3]).getParticipantDeviation(signers[3].address)
    console.log("deviation1", deviation41.toString(), deviation42.toString(), deviation43.toString())

    // await session2.connect(signers[1]).propose(hre.ethers.utils.parseEther("0.66"))
    // await session2.connect(signers[2]).propose(hre.ethers.utils.parseEther("1.47"))

    // await session2.connect(signers[0]).closeSession()
    // await session2.connect(signers[0]).afterClosingSession(hre.ethers.utils.parseEther("4.44"))

    // await session3.connect(signers[1]).propose(hre.ethers.utils.parseEther("540"))
    // await session3.connect(signers[2]).propose(hre.ethers.utils.parseEther("133.33"))

    // await session3.connect(signers[0]).closeSession()
    // await session3.connect(signers[0]).afterClosingSession(hre.ethers.utils.parseEther("999.999"))

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });