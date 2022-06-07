const hre = require("hardhat");

async function main() {

    const signers = await hre.ethers.getSigners();
    const mainContract = await hre.ethers.getContractAt("Main", "0x525C7063E7C20997BaaE9bDa922159152D0e8417");


    // const session0Address = await main.sessions(0);
    const session0Address = await mainContract.sessions(0);

    const session0 = await hre.ethers.getContractAt("Session", session0Address);
    // const session9 = await hre.ethers.getContractAt("Session", session9Address);
    // let tx1 = await main.connect(signers[0]).createNewSession(`Lorem Ipsum ${"x"}`, "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", ["QmXD6PXYTaaoqJcM6a5X6Vr9rTbkutXM1AXUJeb9pJQ7Nn", "QmaVouqN8E8aBgN76rk5oTGm9yJv3eNxGRJRbYZkexxDVW", "QmbfNeBroCjbiP5pz8QZhRPNbJxGZfZkfwf8NFQEMBdwkk", "QmPVN5qDBAzYFaFGTt4kqRyTHXXevgYqKLNKNctBihLkp3", "QmZR31zBuYQ8zfZXc4g3ZCeszmnUD118h6dcvVQjt9eapX"]);

    // for(let i = 0; i< 10 ; i++){
    //     let propose = await session9.connect(signers[10-i]).propose(hre.ethers.utils.parseEther(i.toString()));
    //     propose.wait();
    // }

    // for (let i = 0; i < 10; i++) {
    //     let tx1 = await main.connect(signers[0]).createNewSession(`Lorem Ipsum ${i}`, "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", [`${i}`]);
    //     await tx1.wait();
    //     let tx2 = await main.connect(signers[`${i}`]).register(`Duong ${i}`, `Duong${i}@gmail.com`);
    //     await tx2.wait();
    // }


    // const calculateProposedPrice= async(sessionParticipantsLength) => {
    //     // require(state == State.STARTED || state == State.CLOSING, "Wrong state");   
    //     let numerator;
    //     let denumerator;
    //     let totalDeviation;

    //     for (let i = 0; i < sessionParticipantsLength; i++) {
    //         numerator += await session0.getParticipantProposedPrice(signers[i].address) * (100 - await mainContract.getParticipantDeviation(signers[i].address));
    //         totalDeviation += await mainContract.getParticipantDeviation(signers[i].address);
    //     }
    //     denumerator = (100 * sessionParticipantsLength) - totalDeviation;
    //     numerator / denumerator;
    //     return numerator / denumerator;
    // }
    // await mainContract.connect(signers[0]).register(`admin`, `admin@gmail.com`);
    
    for (let i = 1; i <= 10; i++){
        // let register = await mainContract.connect(signers[`${i}`]).register(`Duong ${i}`, `Duong${i}@gmail.com`);
        // await register.wait();
        // let propose = await session0.connect(signers[i]).propose(hre.ethers.utils.parseEther(`${i+0.12345}`));
        // await propose.wait().then(async()=>{
            // let proposePrice = await session0.getParticipantProposedPrice(signers[i].address);
            // console.log(i, proposePrice.toString())
            let deviation = await mainContract.getParticipantDeviation(signers[i].address);
            console.log(i,await deviation.toString());
        // })
    }
    // await session0.connect(signers[0]).closeSession();
    // await session0.connect(signers[0]).afterClosingSession(hre.ethers.utils.parseEther("5.69"));
    // console.log("final price", (await session0.finalPrice()).toString());

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });