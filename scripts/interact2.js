const hre = require("hardhat");

async function main() {

    const signers = await hre.ethers.getSigners();
    const mainContract = await hre.ethers.getContractAt("Main", "0x4C4a2f8c81640e47606d3fd77B353E87Ba015584");


    // const session0Address = await main.sessions(0);
    const session0Address = await mainContract.sessions(0);
    const session1Address = await mainContract.sessions(1);
    const session2Address = await mainContract.sessions(2);
    const session3Address = await mainContract.sessions(3);

    const session0 = await hre.ethers.getContractAt("Session", session0Address);
    const session1 = await hre.ethers.getContractAt("Session", session1Address);
    const session2 = await hre.ethers.getContractAt("Session", session2Address);
    const session3 = await hre.ethers.getContractAt("Session", session3Address);

    await session0.connect(signers[1]).propose(hre.ethers.utils.parseEther("1"))
    await session0.connect(signers[2]).propose(hre.ethers.utils.parseEther("10"))

    await session0.connect(signers[0]).closeSession()
    await session0.connect(signers[0]).afterClosingSession(hre.ethers.utils.parseEther("10"))

    await session1.connect(signers[1]).propose(hre.ethers.utils.parseEther("50"))
    await session1.connect(signers[2]).propose(hre.ethers.utils.parseEther("60"))

    await session1.connect(signers[0]).closeSession()
    await session1.connect(signers[0]).afterClosingSession(hre.ethers.utils.parseEther("100"))

    await session2.connect(signers[1]).propose(hre.ethers.utils.parseEther("0.66"))
    await session2.connect(signers[2]).propose(hre.ethers.utils.parseEther("1.47"))

    await session2.connect(signers[0]).closeSession()
    await session2.connect(signers[0]).afterClosingSession(hre.ethers.utils.parseEther("4.44"))

    await session3.connect(signers[1]).propose(hre.ethers.utils.parseEther("540"))
    await session3.connect(signers[2]).propose(hre.ethers.utils.parseEther("133.33"))

    await session3.connect(signers[0]).closeSession()
    await session3.connect(signers[0]).afterClosingSession(hre.ethers.utils.parseEther("999.999"))

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });