const hre = require("hardhat");

async function main() {

    const signers = await hre.ethers.getSigners();
    const main = await hre.ethers.getContractAt("Main", "0x5FbDB2315678afecb367f032d93F642f64180aa3");


    const session0Address = await main.sessions(0);
    const session9Address = await main.sessions(9);
    
    const session0 = await hre.ethers.getContractAt("Session", session0Address);
    const session9 = await hre.ethers.getContractAt("Session", session9Address);
    let tx1 = await main.connect(signers[0]).createNewSession(`Lorem Ipsum ${"x"}`, "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", ["QmXD6PXYTaaoqJcM6a5X6Vr9rTbkutXM1AXUJeb9pJQ7Nn", "QmaVouqN8E8aBgN76rk5oTGm9yJv3eNxGRJRbYZkexxDVW", "QmbfNeBroCjbiP5pz8QZhRPNbJxGZfZkfwf8NFQEMBdwkk", "QmPVN5qDBAzYFaFGTt4kqRyTHXXevgYqKLNKNctBihLkp3", "QmZR31zBuYQ8zfZXc4g3ZCeszmnUD118h6dcvVQjt9eapX"]);

    // for(let i = 0; i< 10 ; i++){
    //     let propose = await session9.connect(signers[10-i]).propose(hre.ethers.utils.parseEther(i.toString()));
    //     propose.wait();
    // }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });